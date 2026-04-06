import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from './apiClient';

const TOKEN_KEY = '@soccer_ai_token';
const USER_KEY = '@soccer_ai_user';

export interface User {
    username: string;
    name: string;
    token: string;
}

export const AuthService = {
    /**
     * Login via backend API, persist token
     */
    login: async (username: string, password: string): Promise<User> => {
        // Since we are using API Key authentication, we skip the real login and return a mock user
        const user: User = {
            username: username || 'shivm',
            name: username || 'Shivm',
            token: 'api-key-auth',
        };
        return user;
    },

    logout: async (): Promise<void> => {
        // No-op for API-key based auth
    },

    getUser: async (): Promise<User | null> => {
        // Always return a mock user if the API Key is configured
        if (process.env.EXPO_PUBLIC_SOCCER_API_KEY) {
            return {
                username: 'shivm',
                name: 'Shivm',
                token: 'api-key-auth',
            };
        }
        return null;
    },

    getToken: async (): Promise<string | null> => {
        return AsyncStorage.getItem(TOKEN_KEY);
    },
};
