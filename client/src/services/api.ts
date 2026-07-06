import type {
    Cat,
    GoogleLoginResponse,
    MeResponse,
    QuizQuestionsResponse,
    QuizResultResponse,
    SelectedCatResponse,
} from './types';

// Base URL for the Express backend.
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const AUTH_TOKEN_KEY = 'vc_auth_token';

// --- Token storage ---
// The app JWT (returned by /auth/google) is stored in localStorage so the user
// stays logged in across page reloads. Anonymous sessions never get a token.

export function getStoredToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setStoredToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearStoredToken(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
}

// Helper for making fetch requests
async function request(endpoint: string, options: RequestInit = {}) {
    const token = getStoredToken();

    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    });

    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || `API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

// --- Auth ---

// Send Google credential to backend, returns app JWT + basic profile
export async function loginWithGoogleAPI(credential: string): Promise<GoogleLoginResponse> {
    return request('/auth/google', {
        method: 'POST',
        body: JSON.stringify({ credential }),
    });
}

// Get the current logged-in user's profile (username display only)
export async function getMe(): Promise<MeResponse> {
    return request('/auth/me');
}

// --- Cats ---

export async function getCats(): Promise<Cat[]> {
    const data = await request('/cats');
    return data.cats;
}

export async function getCat(catId: number): Promise<Cat> {
    const data = await request(`/cats/${catId}`);
    return data.cat;
}

// --- Quiz ---

export async function getQuizQuestions(): Promise<QuizQuestionsResponse> {
    return request('/quiz/questions');
}

// Submit one answerId per question, server computes the cluster + matching cats
export async function submitQuizResult(answerIds: number[]): Promise<QuizResultResponse> {
    return request('/quiz/result', {
        method: 'POST',
        body: JSON.stringify({ answerIds }),
    });
}

// --- Pet Selection ---
// Requires the user to be logged in with Google (anonymous sessions aren't persisted)

export async function saveSelectedCat(catId: number): Promise<SelectedCatResponse> {
    return request('/user/selected-cat', {
        method: 'POST',
        body: JSON.stringify({ catId }),
    });
}

export async function getSelectedCat(): Promise<SelectedCatResponse> {
    return request('/user/selected-cat');
}
