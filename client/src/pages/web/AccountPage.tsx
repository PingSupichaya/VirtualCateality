import { useEffect, useState } from 'react'
import { cats } from '../../../mocksdata'
import { useCat } from '../../context/CatContext.tsx'
import { useAuth } from '../../context/AuthContext.tsx'
// import { getUserCatStatuses, getQuizHistory } from '../../services/api'

// Matches cat_status table schema
type CatStatus = {
    catId: number;
    food: number;
    water: number;
    cleanness: number;
    health: number;
    updatedAt: string;
};

// Matches quizHistory table schema
type QuizResult = {
    id: number;
    interactionSum: number;
    aggressiveSum: number;
    shynessSum: number;
    takenAt: string;
};

export default function AccountPage(){
    const { selectedCatId } = useCat();
    const { profile } = useAuth();
    const currentCat = cats.find(c => c.id === selectedCatId);

    // All cat_status records for this user (one per cat they've owned)
    const [allCatStatuses, setAllCatStatuses] = useState<CatStatus[]>([]);
    const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);

    // TODO: Replace with API calls when backend is ready
    // useEffect(() => {
    //     if (profile) {
    //         getUserCatStatuses(token).then(setAllCatStatuses);
    //         getQuizHistory(token).then(setQuizHistory);
    //     }
    // }, [profile]);

    // Mock data for display until backend is connected
    useEffect(() => {
        // Simulate fetching all cat_status rows for this user
        setAllCatStatuses([
            { catId: 1, food: 80, water: 90, cleanness: 70, health: 95, updatedAt: '2026-06-28T10:00:00Z' },
            { catId: 3, food: 60, water: 50, cleanness: 40, health: 30, updatedAt: '2026-06-20T08:00:00Z' },
            { catId: 7, food: 100, water: 100, cleanness: 100, health: 100, updatedAt: '2026-07-01T12:00:00Z' },
        ]);
        setQuizHistory([
            { id: 1, interactionSum: 15, aggressiveSum: 8, shynessSum: 5, takenAt: '2026-07-01T10:00:00Z' },
        ]);
    }, []);

    // Current cat status (the one actively selected)
    const currentCatStatus = allCatStatuses.find(s => s.catId === selectedCatId) || null;

    // History cats (all cats user has owned from cat_status table)
    const historyCats = allCatStatuses.map(status => {
        const catData = cats.find(c => c.id === status.catId);
        return catData ? { ...catData, status } : null;
    }).filter(Boolean) as (typeof cats[number] & { status: CatStatus })[];

    return(
        <div className="p-8">
            <div className="flex flex-col md:flex-row gap-10">
                {/* My Cat Section — current active cat with status */}
                <div className="flex-1">
                    <p className="text-xl font-bold mb-4">My Cat</p>
                    {currentCat && currentCatStatus ? (
                        <div className="flex flex-col items-center gap-4 p-6 border border-(--border) rounded-xl bg-(--selfcard)">
                            <img src={currentCat.img} className="w-40 object-contain" alt={currentCat.breed} />
                            <p className="text-xl font-bold">{currentCat.breed}</p>
                            <div className="w-full flex flex-col gap-2 mt-2">
                                <StatusBar label="Food" value={currentCatStatus.food} />
                                <StatusBar label="Water" value={currentCatStatus.water} />
                                <StatusBar label="Cleanness" value={currentCatStatus.cleanness} />
                                <StatusBar label="Health" value={currentCatStatus.health} />
                            </div>
                            <p className="text-xs opacity-50 mt-2">
                                Last updated: {new Date(currentCatStatus.updatedAt).toLocaleString()}
                            </p>
                        </div>
                    ) : (
                        <p className="text-base font-normal opacity-60">No cat selected yet.</p>
                    )}
                </div>

                {/* Cat History — all cats from cat_status table for this user */}
                <div className="flex-1">
                    <p className="text-xl font-bold mb-4">Selected Cats</p>
                    {historyCats.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {historyCats.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-4 border border-(--border) rounded-xl bg-(--selfcard)">
                                    <img src={item.img} className="w-16 h-16 object-contain" alt={item.breed} />
                                    <div className="flex-1">
                                        <p className="font-bold">{item.breed}</p>
                                        <div className="flex gap-3 text-xs mt-1 opacity-70">
                                            <span>🍔 {item.status.food}</span>
                                            <span>💧 {item.status.water}</span>
                                            <span>✨ {item.status.cleanness}</span>
                                            <span>❤️ {item.status.health}</span>
                                        </div>
                                        <p className="text-xs opacity-50 mt-1">
                                            {new Date(item.status.updatedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-base font-normal opacity-60">No cats adopted yet.</p>
                    )}
                </div>
            </div>
                {/* Quiz History Section — references quizHistory table */}
                {quizHistory.length > 0 && (
                    <div className="flex-1">
                        <p className="text-xl font-bold mb-4">Quiz Result</p>
                        <div className="flex flex-col gap-3">
                            {quizHistory.map((result) => (
                                <div key={result.id} className="p-4 border border-(--border) rounded-xl bg-(--selfcard)">
                                    <p className="text-sm opacity-60">{new Date(result.takenAt).toLocaleDateString()}</p>
                                    <div className="flex gap-4 mt-2 text-sm">
                                        <span>Interaction: {result.interactionSum}</span>
                                        <span>Aggressive: {result.aggressiveSum}</span>
                                        <span>Shyness: {result.shynessSum}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            
        </div>
    );
}

// Status bar component for cat_status values (0-100)
function StatusBar({ label, value }: { label: string; value: number }) {
    return (
        <div className="flex items-center gap-3">
            <span className="text-sm w-20">{label}</span>
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-(--btn-bg) rounded-full transition-all"
                    style={{ width: `${value}%` }}
                />
            </div>
            <span className="text-xs w-8 text-right">{value}</span>
        </div>
    );
}
