// Shared shapes returned by the backend API. Keep these in sync with server/routes/*.

export type Cat = {
    catId: number;
    breed: string;
    personality: string[];
    cluster: number;
};

export type GoogleLoginResponse = {
    token: string;
    user: {
        name: string | null;
        email: string | null;
        picture: string | null;
    };
};

export type MeResponse = {
    user: {
        name: string | null;
        email: string | null;
        picture: string | null;
    };
};

export type QuizAnswer = {
    answerId: number;
    answerText: string;
};

export type QuizStoryPage = {
    pageOrder: number;
    storyText: string;
    imgPath: string | null;
};

export type QuizQuestion = {
    questionId: number;
    questionText: string;
    answers: QuizAnswer[];
    stories: QuizStoryPage[];
};

export type QuizQuestionsResponse = {
    questions: QuizQuestion[];
};

export type QuizAxisScore = {
    interaction: number;
    aggressive: number;
    shyness: number;
};

export type QuizResultResponse = {
    cluster: number;
    score: QuizAxisScore;
    pct: QuizAxisScore;
    cats: Cat[];
};

export type SelectedCatResponse = {
    catId: number | null;
};
