import { createContext, useContext, useState, type ReactNode } from "react";
// import { saveSelectedCat, getSelectedCat } from '../services/api';
// import { useAuth } from './AuthContext';

type CatContextType = {
    selectedCatId: number | null;
    selectCat: (catId: number) => void;
    clearCat: () => void;
};

const CatContext = createContext<CatContextType | undefined>(undefined);

export function CatProvider({ children }: { children: ReactNode }) {
    const [selectedCatId, setSelectedCatId] = useState<number | null>(null);
    // const { isLoggedIn, isAnonymous } = useAuth();

    // TODO: When backend is ready, fetch user's saved cat on login
    // useEffect(() => {
    //     if (isLoggedIn && !isAnonymous) {
    //         getSelectedCat(token).then(data => setSelectedCatId(data.catId));
    //     }
    // }, [isLoggedIn]);

    const selectCat = (catId: number) => {
        setSelectedCatId(catId);

        // TODO: When backend is ready, save to database
        // if (isLoggedIn && !isAnonymous) {
        //     saveSelectedCat(token, catId);
        // }
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
