import Bengal from './src/assets/Bengal.png'
import BritishShorthair from './src/assets/BritishShorthair.png'
import MaineCoon from './src/assets/MaineCoon.png'
import Persian from './src/assets/Persian.png'
import Ragdoll from './src/assets/Ragdoll.png'
import RussianBlue from './src/assets/RussianBlue.png'
import Siamese from './src/assets/Siamese.png'
import TurkishVan from './src/assets/TurkishVan.png'

export type Cat = {
    id: number;
    breed: string;
    personality: string[];
    description: string;
    img: string;
};

export const cats: Cat[] = [
    {
        id: 1,
        breed: "Bengal",
        personality: ["energetic", "affectionate", "adventurous"],
        description: "",
        img: Bengal
    },
    {
        id: 2,
        breed: "British Shorthair",
        personality: ["calm", "devoted", "easy-going"],
        description: "",
        img: BritishShorthair
    },
    {
        id: 3,
        breed: "Maine Coon",
        personality: ["playful", "friendly", "adaptable"],
        description: "",
        img: MaineCoon
    },
    {
        id: 4,
        breed: "Persian",
        personality: ["sweet", "quiet", "gentle"],
        description: "Prefers a calm environment and lots of naps. A true lap cat.",
        img: Persian
    },
    {
        id: 5,
        breed: "Ragdoll",
        personality: ["sweet", "laid-back", "loving"],
        description: "",
        img: Ragdoll
    },
    {
        id: 6,
        breed: "Russian Blue",
        personality: ["playful", "loyal", "independent"],
        description: "",
        img: RussianBlue
    },
    {
        id: 7,
        breed: "Siamese",
        personality: ["vocal", "loving", "entertaining"],
        description: "",
        img: Siamese
    },
    {
        id: 8,
        breed: "Turkish Van and Angora",
        personality: ["friendly", "playful", "intelligent"],
        description: "",
        img: TurkishVan
    },
];

export type Answer = {
    id: string;
    text: string;
    points: {
        interaction: number;
        aggressive: number;
        shyness: number;
    };
};

export type Question = {
    id: number;
    question: string;
    answers: Answer[];
};

export const quizQuestions: Question[] = [
    {
        id: 1,
        question: "How do you usually spend your free time?",
        answers: [
            { id: "1a", text: "Outdoor adventures and sports", points: { interaction: 2, aggressive: 3, shyness: 0 } },
            { id: "1b", text: "Reading or watching movies at home", points: { interaction: 0, aggressive: 0, shyness: 3 } },
            { id: "1c", text: "Hanging out with friends", points: { interaction: 3, aggressive: 1, shyness: 0 } },
            { id: "1d", text: "Working on creative projects alone", points: { interaction: 0, aggressive: 1, shyness: 2 } },
        ]
    },
    {
        id: 2,
        question: "What's your ideal weekend morning?",
        answers: [
            { id: "2a", text: "Wake up early for a jog or hike", points: { interaction: 1, aggressive: 3, shyness: 0 } },
            { id: "2b", text: "Sleep in and have a lazy brunch", points: { interaction: 0, aggressive: 0, shyness: 3 } },
            { id: "2c", text: "Call a friend and make spontaneous plans", points: { interaction: 3, aggressive: 2, shyness: 0 } },
            { id: "2d", text: "Quietly enjoy coffee and my own routine", points: { interaction: 0, aggressive: 0, shyness: 2 } },
        ]
    },
    {
        id: 3,
        question: "How do you handle stress?",
        answers: [
            { id: "3a", text: "Burn it off with exercise", points: { interaction: 1, aggressive: 3, shyness: 0 } },
            { id: "3b", text: "Curl up somewhere cozy and rest", points: { interaction: 0, aggressive: 0, shyness: 3 } },
            { id: "3c", text: "Talk it out with someone I trust", points: { interaction: 3, aggressive: 1, shyness: 0 } },
            { id: "3d", text: "Spend time alone until I feel better", points: { interaction: 0, aggressive: 0, shyness: 2 } },
        ]
    },
    {
        id: 4,
        question: "What quality do you value most in a companion?",
        answers: [
            { id: "4a", text: "Energy and enthusiasm", points: { interaction: 2, aggressive: 3, shyness: 0 } },
            { id: "4b", text: "Calmness and patience", points: { interaction: 1, aggressive: 0, shyness: 3 } },
            { id: "4c", text: "Loyalty and affection", points: { interaction: 3, aggressive: 0, shyness: 1 } },
            { id: "4d", text: "Intelligence and independence", points: { interaction: 0, aggressive: 2, shyness: 2 } },
        ]
    },
    {
        id: 5,
        question: "How would your friends describe you?",
        answers: [
            { id: "5a", text: "The adventurous one who's always up for anything", points: { interaction: 2, aggressive: 3, shyness: 0 } },
            { id: "5b", text: "The calm and reliable one", points: { interaction: 1, aggressive: 0, shyness: 2 } },
            { id: "5c", text: "The social butterfly who keeps the group together", points: { interaction: 3, aggressive: 1, shyness: 0 } },
            { id: "5d", text: "The quiet thinker with deep thoughts", points: { interaction: 0, aggressive: 0, shyness: 3 } },
        ]
    },
    {
        id: 6,
        question: "What kind of living space do you prefer?",
        answers: [
            { id: "6a", text: "A big house with a yard to explore", points: { interaction: 2, aggressive: 3, shyness: 0 } },
            { id: "6b", text: "A cozy small apartment", points: { interaction: 0, aggressive: 0, shyness: 3 } },
            { id: "6c", text: "Somewhere lively with lots of activity", points: { interaction: 3, aggressive: 2, shyness: 0 } },
            { id: "6d", text: "A quiet, well-organized space", points: { interaction: 0, aggressive: 0, shyness: 2 } },
        ]
    },
    {
        id: 7,
        question: "How do you show love to someone you care about?",
        answers: [
            { id: "7a", text: "Plan fun activities together", points: { interaction: 3, aggressive: 2, shyness: 0 } },
            { id: "7b", text: "Just being there quietly by their side", points: { interaction: 1, aggressive: 0, shyness: 3 } },
            { id: "7c", text: "Lots of hugs and verbal affection", points: { interaction: 3, aggressive: 1, shyness: 0 } },
            { id: "7d", text: "Small thoughtful gestures and gifts", points: { interaction: 1, aggressive: 0, shyness: 2 } },
        ]
    },
];

export type StoryPage = {
    text: string;
    img?: string; // optional image import
};

// Stories to show BEFORE each question (keyed by question id)
// A question can have 0 or many story pages before it
export const quizStories: Record<number, StoryPage[]> = {
    // Before question 1: no story (quiz starts directly)
    1: [],
    // Before question 2: 1 story page
    2: [
        {
            text: "Cause you look like trouble, but it could be good.\nI've been the same, kind of misunderstood.\nWhatever you've done, trust, it ain't nothing new.\nYou know by now we've seen it all",
        },
    ],
    // Before question 3: no story
    3: [],
    // Before question 4: 2 story pages
    4: [
        {
            text: "The night is young, the stars are out.\nAnd somewhere a cat is waiting for you.",
        },
        {
            text: "You feel a soft purr in the distance...\nSomething tells you this is meant to be.",
        },
    ],
    // Before question 5: no story
    5: [],
    // Before question 6: 1 story page
    6: [
        {
            text: "The journey continues.\nEvery answer brings you closer to your feline soulmate.",
        },
    ],
    // Before question 7: no story
    7: [],
};

// Each cat's ideal score profile for matching with quiz results
// Higher value = that cat thrives more in that trait
export type CatScoreProfile = {
    catId: number;
    interaction: number;
    aggressive: number;
    shyness: number;
};

export const catScoreProfiles: CatScoreProfile[] = [
    { catId: 1, interaction: 12, aggressive: 18, shyness: 2 },  // Bengal — high energy, bold
    { catId: 2, interaction: 8, aggressive: 4, shyness: 14 },   // British Shorthair — calm, independent
    { catId: 3, interaction: 16, aggressive: 10, shyness: 4 },  // Maine Coon — social, playful
    { catId: 4, interaction: 4, aggressive: 2, shyness: 18 },   // Persian — quiet, gentle
    { catId: 5, interaction: 14, aggressive: 3, shyness: 12 },  // Ragdoll — loving, laid-back
    { catId: 6, interaction: 6, aggressive: 8, shyness: 16 },   // Russian Blue — loyal but shy
    { catId: 7, interaction: 18, aggressive: 12, shyness: 3 },  // Siamese — very social, vocal
    { catId: 8, interaction: 14, aggressive: 16, shyness: 4 },  // Turkish Van — active, friendly
];

// Utility: get top 3 cats based on user's quiz score
export function getTop3Cats(userScore: { interaction: number; aggressive: number; shyness: number }) {
    const scored = catScoreProfiles.map(profile => {
        // Calculate similarity using inverse of distance (closer = better match)
        const distance = Math.sqrt(
            Math.pow(userScore.interaction - profile.interaction, 2) +
            Math.pow(userScore.aggressive - profile.aggressive, 2) +
            Math.pow(userScore.shyness - profile.shyness, 2)
        );
        return { catId: profile.catId, distance };
    });

    // Sort by smallest distance (best match first)
    scored.sort((a, b) => a.distance - b.distance);

    // Return top 3 cat ids matched with full cat data
    return scored.slice(0, 3).map(s => ({
        ...cats.find(c => c.id === s.catId)!,
        matchDistance: s.distance,
    }));
}
