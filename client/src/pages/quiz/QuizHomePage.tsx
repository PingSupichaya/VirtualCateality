import { useNavigate } from 'react-router-dom'
import catImg from '../../assets/BengalCat.png'
import { QuizBtn } from '../../components/Components.tsx'

export default function QuizHomePage(){
    const navigate = useNavigate();
    return( <div className="flex flex-col gap-18 items-center px-6 py-15">
                <p className="text-3xl sm:text-4xl font-bold">Partnersonality Quiz</p>
                <img src={catImg} alt="cat" className="w-116"/>
                <div>
                    <p className="text-center mb-2 sm:mb-1 text-sm sm:text-base">Everyone deserves a companion. Find the cat who will light up your darkest days.</p>
                    <p className="text-center text-(--text) text-xs sm:text-sm">Just a fun quiz. Don't take it too seriously.</p>
                </div>
                <QuizBtn msg="Let's Find!" onClick={() => navigate(`/quiz-question`)}/>
            </div>);
}