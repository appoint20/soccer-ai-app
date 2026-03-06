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
        const { token } = await loginUser(username, password);

        const user: User = {
            username,
            name: username,
            token,
        };

        await AsyncStorage.multiSet([
            [TOKEN_KEY, token],
            [USER_KEY, JSON.stringify(user)],
        ]);

        return user;
    },

    logout: async (): Promise<void> => {
        await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
    },

    getUser: async (): Promise<User | null> => {
        const userData = await AsyncStorage.getItem(USER_KEY);
        return userData ? JSON.parse(userData) : null;
    },

    getToken: async (): Promise<string | null> => {
        return AsyncStorage.getItem(TOKEN_KEY);
    },
};
