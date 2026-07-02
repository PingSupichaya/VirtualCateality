// Base URL for your Express backend — update when backend is ready
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Helper for making fetch requests
async function request(endpoint: string, options: RequestInit = {}) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });

    if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

// --- Auth ---

// Send Google credential to backend, returns user data + token
export async function loginWithGoogleAPI(credential: string) {
    return request('/auth/google', {
        method: 'POST',
        body: JSON.stringify({ credential }),
    });
}

// --- User ---

// Get current user profile
export async function getUserProfile(token: string) {
    return request('/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
    });
}

// --- Pet Selection ---

// Save selected cat for a user
export async function saveSelectedCat(token: string, catId: number) {
    return request('/user/selected-cat', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ catId }),
    });
}

// Get user's previously selected cat
export async function getSelectedCat(token: string) {
    return request('/user/selected-cat', {
        headers: { Authorization: `Bearer ${token}` },
    });
}
