import { useLocation, useNavigate } from 'react-router-dom'
import { getCatImage } from '../../lib/catImages'
import { useCat } from '../../context/CatContext'
import type { QuizResultResponse } from '../../services/types'
import { CatCard } from '../../components/Components';

export default function QuizResult(){
    const navigate = useNavigate();
    const location = useLocation();
    const { selectCat } = useCat();
    const result = location.state as QuizResultResponse | null;

    if (!result) {
        return (
            <div className="flex flex-col items-center px-6 py-15">
                <p className="text-lg">No quiz result found. Please take the quiz first.</p>
            </div>
        );
    }

    const handleSelect = (catId: number) => {
        selectCat(catId);
        navigate(`/simulation/${catId}`);
    };

    return( <div className="flex flex-col items-center px-6 py-15">
                <p className="text-2xl sm:text-4xl font-bold ">Select Your Cat Partner</p>
                <p className="text-sm sm:text-base mt-2">Looks like you've caught these cats' attention.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                    {result.cats.map((cat) => (
                        <CatCard
                            key={cat.catId}
                            breed={cat.breed}
                            img={getCatImage(cat.breed)}
                            personality={cat.personality}
                            onClick={() => handleSelect(cat.catId)}/>
                    ))}
                </div>
            </div>
    );
}
