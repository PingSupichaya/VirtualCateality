// Maps a cat's breed (as stored in the database) to its bundled image asset.
// The backend only returns cat data (breed, personality, cluster) — images stay client-side.
import Bengal from '../assets/BengalCat.png'
import BritishShorthair from '../assets/BritishCat.png'
import MaineCoon from '../assets/MaineCoon.png'
import Persian from '../assets/PersianCat.png'
import Ragdoll from '../assets/RagdollCat.png'
import RussianBlue from '../assets/RussianBlueCat.png'
import Siamese from '../assets/Siamese.png'
import TurkishVan from '../assets/TurkishVan.png'
import fallback from '../assets/catfootprint.svg'

const catImagesByBreed: Record<string, string> = {
    'Bengal': Bengal,
    'British Shorthair': BritishShorthair,
    'Maine Coon': MaineCoon,
    'Persian': Persian,
    'Ragdoll': Ragdoll,
    'Russian Blue': RussianBlue,
    'Siamese': Siamese,
    'Turkish Van and Angora': TurkishVan,
};

export function getCatImage(breed: string): string {
    return catImagesByBreed[breed] ?? fallback;
}
