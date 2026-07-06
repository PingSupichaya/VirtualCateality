import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCats } from '../../services/api'
import { getCatImage } from '../../lib/catImages'
import { useCat } from '../../context/CatContext'
import type { Cat } from '../../services/types'
import { CatCard } from '../../components/Components.tsx'

export default function SelectCatPage(){
    const navigate = useNavigate();
    const { selectCat } = useCat();
    const [cats, setCats] = useState<Cat[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getCats()
            .then(setCats)
            .catch((err) => setError(err.message));
    }, []);

    const handleSelect = (catId: number) => {
        selectCat(catId);
        navigate(`/simulation/${catId}`);
    };

    return( <div className="flex flex-col items-center gap-8 py-8">
                <p className="text-2xl font-bold text-center">Select a partner by myself</p>
                {error && <p className="text-red-600">{error}</p>}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                    {cats.map((cat) => (
                        <CatCard
                            key={cat.catId}
                            breed={cat.breed}
                            img={getCatImage(cat.breed)}
                            personality={cat.personality}
                            onClick={() => handleSelect(cat.catId)}
                        />
                    ))}
                </div>
            </div>);
}
