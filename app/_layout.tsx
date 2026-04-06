import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import 'react-native-reanimated';
import '../src/i18n';

import { useColorScheme } from '../src/hooks/useColorScheme';
import { ThemeProvider as AppThemeProvider } from '../src/context/ThemeContext';
import { AuthProvider, useAuth } from '../src/context/AuthContext';

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
    const { user, isLoading: authLoading } = useAuth();
    const segments = useSegments();
    const router = useRouter();
    const colorScheme = useColorScheme();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!authLoading) {
            setIsReady(true);
            SplashScreen.hideAsync();
        }
    }, [authLoading]);

    useEffect(() => {
        if (!isReady) return;

        const inAuthGroup = segments[0] === '(auth)';

        if (inAuthGroup) {
            // Already logged in (via API key), redirect away from login if needed
            router.replace('/(tabs)');
        }
    }, [user, isReady, segments]);

    if (!isReady) {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{ headerShown: false, animation: 'default', gestureEnabled: true, fullScreenGestureEnabled: true }}>
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="match/[id]" options={{ presentation: 'card' }} />
                <Stack.Screen name="+not-found" />
            </Stack>
        </ThemeProvider>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <AppThemeProvider>
                <RootLayoutNav />
            </AppThemeProvider>
        </AuthProvider>
    );
}
