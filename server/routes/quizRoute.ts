import express from "express"
import { pool } from "../db.js"

export const quizRoute = express.Router();

type AxisScores = {
    interaction: number;
    aggressive: number;
    shyness: number;
};

// GET /api/quiz/questions — questions + answers (no scores) + any story pages shown before each
quizRoute.get("/questions", async (req, res, next) => {
    try {
        const questions = await pool.query(
            `select questionid as "questionId", questiontext as "questionText"
             from questions
             order by questionid`,
        );

        const answers = await pool.query(
            `select answerid as "answerId", questionid as "questionId", answertext as "answerText"
             from answers
             order by answerid`,
        );

        const stories = await pool.query(
            `select storyid as "storyId", questionid as "questionId", pageorder as "pageOrder",
                    storytext as "storyText", imgpath as "imgPath"
             from stories
             order by questionid, pageorder`,
        );

        const result = questions.rows.map((q) => ({
            questionId: q.questionId,
            questionText: q.questionText,
            answers: answers.rows.filter((a) => a.questionId === q.questionId)
                .map((a) => ({ answerId: a.answerId, answerText: a.answerText })),
            stories: stories.rows.filter((s) => s.questionId === q.questionId)
                .map((s) => ({ pageOrder: s.pageOrder, storyText: s.storyText, imgPath: s.imgPath })),
        }));

        res.json({ questions: result });
    } catch (err) {
        next(err);
    }
});

// Compute, per axis, the max single-answer score available for each question, summed across
// all questions. Used as the normalization denominator for the quiz result percentages.
async function getMaxAxisScores(): Promise<AxisScores> {
    const result = await pool.query(
        `select max(interactionscore) as "maxInteraction",
                max(aggressivescore) as "maxAggressive",
                max(shynessscore) as "maxShyness"
         from answers
         group by questionid`,
    );

    return result.rows.reduce<AxisScores>(
        (totals, row) => ({
            interaction: totals.interaction + Number(row.maxInteraction),
            aggressive: totals.aggressive + Number(row.maxAggressive),
            shyness: totals.shyness + Number(row.maxShyness),
        }),
        { interaction: 0, aggressive: 0, shyness: 0 },
    );
}

function determineCluster(pct: AxisScores): number {
    if (pct.aggressive > 0.6) return 4;
    if (pct.interaction > 0.55 && pct.shyness > 0.55) return 3;
    if (pct.interaction < 0.4 && pct.aggressive < 0.4 && pct.shyness < 0.4) return 2;
    return 1;
}

// Continuous "how well does the user's score fit this cluster" measure, reusing the same
// metrics as determineCluster() but as a 0..1 score instead of a boolean. Used only to rank
// the fallback clusters when the primary cluster doesn't have enough cats.
function clusterFitScore(cluster: number, pct: AxisScores): number {
    switch (cluster) {
        case 4: return pct.aggressive;
        case 3: return Math.min(pct.interaction, pct.shyness);
        case 2: return 1 - Math.max(pct.interaction, pct.aggressive, pct.shyness);
        default: {
            const others = [
                pct.aggressive,
                Math.min(pct.interaction, pct.shyness),
                1 - Math.max(pct.interaction, pct.aggressive, pct.shyness),
            ];
            return 1 - Math.max(...others);
        }
    }
}

// Ordered list of every cluster, primary first, then the rest ranked by how closely the
// user's pct fits each one — used to fill remaining seats when the primary cluster is short on cats.
function buildClusterFallbackOrder(primaryCluster: number, pct: AxisScores): number[] {
    const allClusters = [1, 2, 3, 4];
    const rest = allClusters
        .filter((c) => c !== primaryCluster)
        .sort((a, b) => clusterFitScore(b, pct) - clusterFitScore(a, pct));
    return [primaryCluster, ...rest];
}

// POST /api/quiz/result — body: { answerIds: number[] }, one answer id per question
quizRoute.post("/result", async (req, res, next) => {
    try {
        const answerIds = req.body?.answerIds;
        if (!Array.isArray(answerIds) || answerIds.length === 0 || !answerIds.every((id) => Number.isInteger(id))) {
            return res.status(400).json({ message: "answerIds must be a non-empty array of integers" });
        }

        const selected = await pool.query(
            `select answerid as "answerId", questionid as "questionId",
                    interactionscore as "interactionScore",
                    aggressivescore as "aggressiveScore",
                    shynessscore as "shynessScore"
             from answers
             where answerid = any($1::int[])`,
            [answerIds],
        );

        if (selected.rowCount !== answerIds.length) {
            return res.status(400).json({ message: "One or more answerIds are invalid" });
        }

        // Guard against submitting two answers for the same question.
        const distinctQuestions = new Set(selected.rows.map((r) => r.questionId));
        if (distinctQuestions.size !== selected.rows.length) {
            return res.status(400).json({ message: "Only one answer per question is allowed" });
        }

        const userScore = selected.rows.reduce<AxisScores>(
            (totals, row) => ({
                interaction: totals.interaction + Number(row.interactionScore),
                aggressive: totals.aggressive + Number(row.aggressiveScore),
                shyness: totals.shyness + Number(row.shynessScore),
            }),
            { interaction: 0, aggressive: 0, shyness: 0 },
        );

        const maxScores = await getMaxAxisScores();
        const pct: AxisScores = {
            interaction: maxScores.interaction > 0 ? userScore.interaction / maxScores.interaction : 0,
            aggressive: maxScores.aggressive > 0 ? userScore.aggressive / maxScores.aggressive : 0,
            shyness: maxScores.shyness > 0 ? userScore.shyness / maxScores.shyness : 0,
        };

        const cluster = determineCluster(pct);
        const TARGET_CAT_COUNT = 3;

        // Always try to return TARGET_CAT_COUNT cats. If the user's primary cluster doesn't
        // have enough, fill the remaining slots from the next-best-fitting clusters, in order.
        const fallbackOrder = buildClusterFallbackOrder(cluster, pct);
        const matchedCats: { catId: number; breed: string; personality: string[]; cluster: number }[] = [];

        for (const c of fallbackOrder) {
            if (matchedCats.length >= TARGET_CAT_COUNT) break;

            const remaining = TARGET_CAT_COUNT - matchedCats.length;
            const result = await pool.query(
                `select catid as "catId", breed, personality, cluster
                 from cats
                 where cluster = $1
                 order by catid
                 limit $2`,
                [c, remaining],
            );
            matchedCats.push(...result.rows);
        }

        res.json({
            cluster,
            score: userScore,
            pct,
            cats: matchedCats,
        });
    } catch (err) {
        next(err);
    }
});
