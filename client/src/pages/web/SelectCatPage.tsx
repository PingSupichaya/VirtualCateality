import { useNavigate } from 'react-router-dom'
import { cats } from '../../mocksdata.ts'
import { CatCard } from '../../components/Components.tsx'

export default function SelectCatPage(){
    const navigate = useNavigate();

    return( <div className="flex flex-col items-center gap-8 py-8">
                <p className="text-2xl font-bold text-center">Select a partner by myself</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                    {cats.map((cat) => (
                        <CatCard
                            key={cat.id}
                            breed={cat.breed}
                            img={cat.img}
                            personality={cat.personality}
                            onClick={() => navigate(`/simulation/${cat.id}`)}
                        />
                    ))}
                </div>
            </div>);
}