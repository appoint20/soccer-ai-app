import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://soccer-ai-api.onrender.com';
const API_KEY = process.env.EXPO_PUBLIC_SOCCER_API_KEY || '';
const TOKEN_KEY = '@soccer_ai_token';

// ─── Cache Setup ──────────────────────────────────────────────────────────────
const CACHE_EXPIRY_MS = 2 * 60 * 60 * 1000; // 2 hours

interface CachePayload<T> {
    timestamp: number;
    data: T;
}

const fetchWithCache = async <T>(cacheKey: string, fetchFn: () => Promise<T>): Promise<T | null> => {
    try {
        const cachedDataStr = await AsyncStorage.getItem(cacheKey);
        if (cachedDataStr) {
            const parsed: CachePayload<T> = JSON.parse(cachedDataStr);
            if (Date.now() - parsed.timestamp < CACHE_EXPIRY_MS) {
                return parsed.data;
            } else {
                await AsyncStorage.removeItem(cacheKey);
            }
        }
    } catch (e) {
        console.warn(`[Cache] Error reading ${cacheKey}:`, e);
    }

    try {
        const freshData = await fetchFn();
        if (freshData) {
            const payload: CachePayload<T> = { timestamp: Date.now(), data: freshData };
            await AsyncStorage.setItem(cacheKey, JSON.stringify(payload));
        }
        return freshData;
    } catch (error) {
        console.error(`[API] Failed to fetch data for ${cacheKey}:`, error);
        return null; // Ensure we always cleanly fail
    }
};

// ─── Helper ───────────────────────────────────────────────────────────────────
async function apiFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const token = await AsyncStorage.getItem(TOKEN_KEY);

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
        ...options.headers as Record<string, string>,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers,
    });

    let body: any = {};
    try {
        const text = await response.text();
        body = text ? JSON.parse(text) : {};
    } catch (e) {
        // If it's not JSON, we'll rely on the status code for error handling
        body = {};
    }

    if (!response.ok) {
        const detail = body?.detail || body?.message;

        if (response.status === 401) {
            // Clear stale session if it's not a login request
            if (!path.includes('/login')) {
                await AsyncStorage.multiRemove([TOKEN_KEY, '@soccer_ai_user']);
            }
            throw new Error(detail || (path.includes('/login') ? 'Invalid username or password.' : 'Session expired. Please log in again.'));
        }

        if (response.status === 403) {
            throw new Error(detail || 'Access denied.');
        }

        if (response.status === 400 || response.status === 422) {
            throw new Error(detail || 'Invalid request parameters.');
        }

        if (response.status >= 500) {
            throw new Error('Something went wrong on our end. Please try again in a moment.');
        }
        throw new Error(detail || `Request failed (${response.status}).`);
    }

    return body as T;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export interface LoginResponse {
    token: string;
}

export const loginUser = async (
    username: string,
    password: string
): Promise<LoginResponse> => {
    try {
        return await apiFetch<LoginResponse>('/api/Auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
    } catch (err: any) {
        // Network-level errors (no response)
        if (err.message?.includes('Network request failed') || err.message?.includes('fetch')) {
            throw new Error('Cannot reach the server. Please check your internet connection.');
        }
        throw err;
    }
};

// ─── Backtest ─────────────────────────────────────────────────────────────────
export interface BacktestSummary {
    total_roi: number;
    total_staked: number;
    total_returned: number;
    combination_accuracy: number;
    win_rate: number;
    combos_total: number;
    combos_won: number;
    match_analysis_accuracy: number;
    total_legs: number;
    correct_legs: number;
}

export interface WeeklyBreakdown {
    week: string;
    total_bets: number;
    bets_won: number;
    roi_percent: number;
}

export interface LeagueAccuracy {
    league: string;
    btts_accuracy: number;
    over25_accuracy: number;
}

export interface BacktestResponse {
    summary: BacktestSummary;
    weekly_breakdown: WeeklyBreakdown[];
    league_accuracy: LeagueAccuracy[];
}

export const fetchBacktestData = async (): Promise<BacktestResponse | null> => {
    const cacheKey = `@cache_backtest_stats`;
    return await fetchWithCache(cacheKey, () => apiFetch<BacktestResponse>('/api/Backtest'));
};

// ─── Matches / Leagues ────────────────────────────────────────────────────────
export const fetchMatchesFromApi = async (date: string, language: string = 'en') => {
    const cacheKey = `@cache_matches_${date}_${language}`;
    return await fetchWithCache(cacheKey, () => apiFetch(`/api/analyze?Date=${date}&Language=${language}`));
};

export const fetchLeaguesFromApi = async () => {
    const cacheKey = `@cache_leagues`;
    const res = await fetchWithCache(cacheKey, () => apiFetch<any[]>('/api/leagues'));
    return res || [];
};

export const fetchCombinationsFromApi = async (dateStr: string, lang: string = 'en') => {
    const cacheKey = `@cache_combinations_${dateStr}_${lang}`;
    return await fetchWithCache(cacheKey, () => apiFetch<any>(`/api/combinations?date=${dateStr}&lang=${lang}`, { method: 'GET' }));
};

export const triggerDailySync = () => {
    return apiFetch<any>('/api/automation/sync-daily', { method: 'POST' });
};
