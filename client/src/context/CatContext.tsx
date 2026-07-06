import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { saveSelectedCat, getSelectedCat } from '../services/api';
import { useAuth } from './AuthContext';

type CatContextType = {
    selectedCatId: number | null;
    selectCat: (catId: number) => void;
    clearCat: () => void;
};

const CatContext = createContext<CatContextType | undefined>(undefined);

export function CatProvider({ children }: { children: ReactNode }) {
    const [selectedCatId, setSelectedCatId] = useState<number | null>(null);
    const { isLoggedIn, isAnonymous } = useAuth();

    // Fetch the user's previously saved cat on login (Google users only —
    // anonymous sessions have nothing to fetch, since they're never persisted).
    useEffect(() => {
        if (isLoggedIn && !isAnonymous) {
            getSelectedCat()
                .then((data) => setSelectedCatId(data.catId))
                .catch((error) => console.error('Failed to load selected cat', error));
        }
    }, [isLoggedIn, isAnonymous]);

    const selectCat = (catId: number) => {
        setSelectedCatId(catId);

        if (isLoggedIn && !isAnonymous) {
            saveSelectedCat(catId).catch((error) => console.error('Failed to save selected cat', error));
        }
    };

    const clearCat = () => {
        setSelectedCatId(null);
    };

    return (
        <CatContext.Provider value={{ selectedCatId, selectCat, clearCat }}>
            {children}
        </CatContext.Provider>
    );
}

export function useCat() {
    const context = useContext(CatContext);
    if (!context) {
        throw new Error("useCat must be used within a CatProvider");
    }
    return context;
}
