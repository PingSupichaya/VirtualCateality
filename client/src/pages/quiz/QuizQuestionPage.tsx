import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnsBtn, QuizBtn } from '../../components/Components.tsx'
import { getQuizQuestions, submitQuizResult } from '../../services/api'
import type { QuizQuestion } from '../../services/types'

export default function QuizQuestionPage(){
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [currentQ, setCurrentQ] = useState(0);
    const [answerIds, setAnswerIds] = useState<number[]>([]);
    // Track story pages: which story page we're on before the current question
    const [storyIndex, setStoryIndex] = useState(0);
    const [showingStory, setShowingStory] = useState(false);

    useEffect(() => {
        getQuizQuestions()
            .then((data) => {
                setQuestions(data.questions);
                setShowingStory((data.questions[0]?.stories.length ?? 0) > 0);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const question = questions[currentQ];
    const stories = question?.stories ?? [];

    // Check if we need to show stories before this question
    const hasStories = stories.length > 0 && storyIndex < stories.length;

    async function handleAnswer(answerId: number) {
        const newAnswerIds = [...answerIds, answerId];

        setTimeout(async () => {
            if (currentQ < questions.length - 1) {
                setAnswerIds(newAnswerIds);
                setCurrentQ(currentQ + 1);
                setStoryIndex(0);
                // Check if next question has stories
                const nextStories = questions[currentQ + 1]?.stories ?? [];
                setShowingStory(nextStories.length > 0);
            } else {
                try {
                    const result = await submitQuizResult(newAnswerIds);
                    navigate('/quiz/result', { state: result });
                } catch (err) {
                    setError(err instanceof Error ? err.message : 'Failed to submit quiz');
                }
            }
        }, 400);
    }

    function handleNextStory() {
        if (storyIndex < stories.length - 1) {
            setStoryIndex(storyIndex + 1);
        } else {
            // Done with stories, show the question
            setShowingStory(false);
        }
    }

    if (loading) {
        return <div className="flex justify-center py-15">Loading quiz...</div>;
    }

    if (error) {
        return <div className="flex justify-center py-15 text-red-600">{error}</div>;
    }

    if (!question) {
        return <div className="flex justify-center py-15">No quiz questions available.</div>;
    }

    // Show story page
    if (showingStory && hasStories) {
        const currentStory = stories[storyIndex];
        return (
            <div className="flex flex-col gap-12 items-center px-6 py-15 w-full max-w-xl mx-auto">
                {/* Progress Bar */}
                <div className="w-full">
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-(--btn-bg) rounded-full transition-all duration-400"
                            style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Story Text */}
                <p className="text-xl sm:text-2xl font-bold text-center max-w-2xl whitespace-pre-line">
                    {currentStory.storyText}
                </p>

                {/* Story Image (if any) */}
                {currentStory.imgPath && (
                    <img src={currentStory.imgPath} alt="story" className="w-52" />
                )}

                {/* Next Button */}
                <QuizBtn msg="Next" onClick={handleNextStory} />
            </div>
        );
    }

    // Show question page
    return(
        <div className="flex flex-col gap-12 items-center px-6 py-15 w-full max-w-xl mx-auto">
            {/* Progress Bar */}
            <div className="w-full">
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-(--btn-bg) rounded-full transition-all duration-400"
                        style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question */}
            <p className="text-xl sm:text-2xl font-bold text-center max-w-2xl">
                {question.questionText}
            </p>

            {/* Answers */}
            <div className="flex flex-col gap-4 w-full">
                {question.answers.map((ans) => (
                    <AnsBtn
                        key={ans.answerId}
                        msg={ans.answerText}
                        onClick={() => handleAnswer(ans.answerId)}
                    />
                ))}
            </div>
        </div>
    );
}
