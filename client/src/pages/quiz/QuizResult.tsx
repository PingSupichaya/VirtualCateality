import { useLocation, useNavigate } from 'react-router-dom'
import { getTop3Cats } from '../../../mocksdata'
import { CatCard } from '../../components/Components';

export default function QuizResult(){
    const navigate = useNavigate();
    const location = useLocation();
    const score = location.state; // { interaction, aggressive, shyness }
    const top3 = getTop3Cats(score);
    // top3[0] = best match, top3[1] = 2nd, top3[2] = 3rd

    return( <div className="flex flex-col items-center px-6 py-15">
                <p className="text-2xl sm:text-4xl font-bold ">Select Your Cat Partner</p>
                <p className="text-sm sm:text-base mt-2">Looks like you've caught these cats' attention.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                    {top3.map((cat) => (
                        <CatCard 
                            key={cat.id}
                            breed={cat.breed}
                            img={cat.img}
                            personality={cat.personality}
                            onClick={() => navigate(`/simulation/${cat.id}`)}/>
                    ))}
                </div>
            </div>
    );
}