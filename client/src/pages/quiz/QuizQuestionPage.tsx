import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnsBtn, QuizBtn } from '../../components/Components.tsx'
import { quizQuestions, quizStories } from '../../mocksdata.ts'

export type QuizScore = {
    interaction: number;
    aggressive: number;
    shyness: number;
};

export default function QuizQuestionPage(){
    const navigate = useNavigate();
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState<QuizScore>({ interaction: 0, aggressive: 0, shyness: 0 });
    // Track story pages: which story page we're on before the current question
    const [storyIndex, setStoryIndex] = useState(0);
    const [showingStory, setShowingStory] = useState(false);

    const question = quizQuestions[currentQ];
    const stories = quizStories[question.id] || [];

    // Check if we need to show stories before this question
    const hasStories = stories.length > 0 && storyIndex < stories.length;

    function handleAnswer(answerId: string) {
        const answer = question.answers.find(a => a.id === answerId);
        if (!answer) return;

        const newScore = {
            interaction: score.interaction + answer.points.interaction,
            aggressive: score.aggressive + answer.points.aggressive,
            shyness: score.shyness + answer.points.shyness,
        };

        setTimeout(() => {
            if (currentQ < quizQuestions.length - 1) {
                setScore(newScore);
                setCurrentQ(currentQ + 1);
                setStoryIndex(0);
                // Check if next question has stories
                const nextStories = quizStories[quizQuestions[currentQ + 1].id] || [];
                setShowingStory(nextStories.length > 0);
            } else {
                navigate('/quiz/result', { state: newScore });
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
                            style={{ width: `${((currentQ + 1) / quizQuestions.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Story Text */}
                <p className="text-xl sm:text-2xl font-bold text-center max-w-2xl whitespace-pre-line">
                    {currentStory.text}
                </p>

                {/* Story Image (if any) */}
                {currentStory.img && (
                    <img src={currentStory.img} alt="story" className="w-52" />
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
                        style={{ width: `${((currentQ + 1) / quizQuestions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question */}
            <p className="text-xl sm:text-2xl font-bold text-center max-w-2xl">
                {question.question}
            </p>

            {/* Answers */}
            <div className="flex flex-col gap-4 w-full">
                {question.answers.map((ans) => (
                    <AnsBtn
                        key={ans.id}
                        msg={ans.text}
                        onClick={() => handleAnswer(ans.id)}
                    />
                ))}
            </div>
        </div>
    );
}
