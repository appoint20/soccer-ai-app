import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Animated,
    Easing,
    Dimensions,
    Image,
} from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { Colors } from '../../src/constants/colors';
import { useTranslation } from 'react-i18next';
import Svg, { Circle, Path, Ellipse, Rect } from 'react-native-svg';

const { height, width } = Dimensions.get('window');

// ─── Soccer SVG Fallback ─────────────────────────────────────────────────────
function SoccerHeroSVG() {
    return (
        <Svg width={220} height={220} viewBox="0 0 200 200">
            <Ellipse cx="100" cy="188" rx="70" ry="8" fill="#CCE3D8" />
            {/* Ball */}
            <Circle cx="100" cy="168" r="16" fill="#fff" stroke="#1A2E2A" strokeWidth="2" />
            <Path d="M100 152 L93 163 L107 163 Z" fill="#1A2E2A" />
            <Path d="M85 168 L93 163 L93 178 Z" fill="#1A2E2A" />
            <Path d="M115 168 L107 163 L107 178 Z" fill="#1A2E2A" />
            {/* Player 1 - left */}
            <Rect x="55" y="100" width="22" height="34" rx="5" fill="#D52941" />
            <Rect x="55" y="130" width="22" height="18" rx="4" fill="#fff" />
            <Circle cx="66" cy="90" r="13" fill="#F5C496" />
            <Path d="M53 85 Q66 74 79 85 Q76 77 66 75 Q56 77 53 85Z" fill="#1A2E2A" />
            <Rect x="55" y="146" width="9" height="22" rx="3" fill="#F5C496" />
            <Rect x="68" y="148" width="9" height="18" rx="3" fill="#F5C496" transform="rotate(-18 72 148)" />
            <Ellipse cx="59" cy="170" rx="8" ry="4" fill="#A4C3B2" />
            <Ellipse cx="79" cy="163" rx="8" ry="4" fill="#A4C3B2" transform="rotate(-18 79 163)" />
            <Rect x="41" y="103" width="14" height="8" rx="4" fill="#F5C496" transform="rotate(20 41 103)" />
            <Rect x="77" y="103" width="14" height="8" rx="4" fill="#F5C496" transform="rotate(-20 77 103)" />
            {/* Player 2 - right */}
            <Rect x="120" y="96" width="22" height="34" rx="5" fill="#6B9E8A" />
            <Rect x="120" y="126" width="22" height="18" rx="4" fill="#1A2E2A" />
            <Circle cx="131" cy="86" r="13" fill="#F5C496" />
            <Path d="M118 81 Q131 70 144 81 Q141 73 131 71 Q121 73 118 81Z" fill="#374151" />
            <Rect x="120" y="142" width="9" height="24" rx="3" fill="#F5C496" transform="rotate(8 124 142)" />
            <Rect x="133" y="142" width="9" height="22" rx="3" fill="#F5C496" />
            <Ellipse cx="120" cy="168" rx="8" ry="4" fill="#6B9E8A" transform="rotate(8 120 168)" />
            <Ellipse cx="138" cy="168" rx="8" ry="4" fill="#6B9E8A" />
            <Rect x="107" y="99" width="14" height="8" rx="4" fill="#F5C496" transform="rotate(28 107 99)" />
            <Rect x="142" y="99" width="14" height="8" rx="4" fill="#F5C496" transform="rotate(-10 142 99)" />
        </Svg>
    );
}

// ─── Animated Loading Dots ────────────────────────────────────────────────────
function LoadingDots() {
    const dot1 = useRef(new Animated.Value(0)).current;
    const dot2 = useRef(new Animated.Value(0)).current;
    const dot3 = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        const animate = (dot: Animated.Value, delay: number) =>
            Animated.loop(
                Animated.sequence([
                    Animated.delay(delay),
                    Animated.timing(dot, { toValue: -8, duration: 300, easing: Easing.out(Easing.quad), useNativeDriver: true }),
                    Animated.timing(dot, { toValue: 0, duration: 300, easing: Easing.in(Easing.quad), useNativeDriver: true }),
                    Animated.delay(600 - delay),
                ])
            );
        const a1 = animate(dot1, 0);
        const a2 = animate(dot2, 150);
        const a3 = animate(dot3, 300);
        a1.start(); a2.start(); a3.start();
        return () => { a1.stop(); a2.stop(); a3.stop(); };
    }, []);

    return (
        <View style={ls.dotsRow}>
            {[dot1, dot2, dot3].map((dot, i) => (
                <Animated.View key={i} style={[ls.dot, { transform: [{ translateY: dot }] }]} />
            ))}
        </View>
    );
}

const ls = StyleSheet.create({
    dotsRow: { flexDirection: 'row', gap: 6, justifyContent: 'center', alignItems: 'center', height: 28 },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' },
});

// ─── Login Screen ─────────────────────────────────────────────────────────────
export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState(t('connecting', 'Signing you in...'));
    const { login } = useAuth();

    const shakeAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }).start();
    }, []);

    const shakeError = () => {
        Animated.sequence([
            Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 6, duration: 60, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
        ]).start();
    };

    const handleLogin = async () => {
        if (!username.trim()) { setError('Please enter your username.'); shakeError(); return; }
        if (!password) { setError('Please enter your password.'); shakeError(); return; }

        setError('');
        setLoading(true);
        setLoadingMsg(t('connecting', 'Connecting to server...'));

        // Friendly message rotation
        const msgs = [t('verifying', 'Verifying credentials...'), t('almostThere', 'Almost there...')];
        let idx = 0;
        const interval = setInterval(() => {
            setLoadingMsg(msgs[idx % msgs.length]);
            idx++;
        }, 2000);

        try {
            await login(username.trim(), password);
        } catch (err: any) {
            setError(err.message || t('loginFailed', 'Login failed. Please try again.'));
            shakeError();
        } finally {
            clearInterval(interval);
            setLoading(false);
        }
    };

    // Try to load the landing image; fall back to SVG
    let HeroContent: React.ReactNode;
    try {
        const img = require('../../assets/images/landing.png');
        HeroContent = (
            <Image source={img} style={styles.heroImage} resizeMode="contain" />
        );
    } catch {
        HeroContent = <SoccerHeroSVG />;
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={styles.scroll}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <Animated.View style={[styles.inner, { opacity: fadeAnim }]}>
                    {/* Hero */}
                    <View style={styles.heroSection}>{HeroContent}</View>

                    {/* Brand */}
                    <Text style={styles.appName}>SOCCER AI</Text>
                    <Text style={styles.appSubtitle}>{t('subtitle', 'Football insights powered by machine learning')}</Text>

                    {/* Form Card */}
                    <Animated.View style={[styles.formCard, { transform: [{ translateX: shakeAnim }] }]}>
                        {error ? (
                            <Text style={styles.errorText}>{error}</Text>
                        ) : null}

                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder={t('username', 'Username')}
                                placeholderTextColor={Colors.textMuted}
                                value={username}
                                onChangeText={(t) => { setUsername(t); if (error) setError(''); }}
                                autoCapitalize="none"
                                autoCorrect={false}
                                editable={!loading}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder={t('password', 'Password')}
                                placeholderTextColor={Colors.textMuted}
                                value={password}
                                onChangeText={(t) => { setPassword(t); if (error) setError(''); }}
                                secureTextEntry
                                editable={!loading}
                                onSubmitEditing={handleLogin}
                                returnKeyType="done"
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.loginBtn, loading && styles.loginBtnLoading]}
                            onPress={handleLogin}
                            disabled={loading}
                            activeOpacity={0.85}
                        >
                            {loading ? (
                                <View style={styles.loadingContent}>
                                    <LoadingDots />
                                    <Text style={styles.loadingText}>{loadingMsg}</Text>
                                </View>
                            ) : (
                                <Text style={styles.loginBtnText}>{t('signIn', 'Sign In')}</Text>
                            )}
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scroll: {
        flexGrow: 1,
        minHeight: height,
    },
    inner: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 48,
        paddingHorizontal: 28,
    },
    heroSection: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 220,
        marginBottom: 8,
    },
    heroImage: {
        width: 220,
        height: 220,
    },
    appName: {
        fontSize: 26,
        fontWeight: '800',
        letterSpacing: 5,
        color: Colors.textSecondary,
        marginBottom: 6,
    },
    appSubtitle: {
        fontSize: 13,
        color: Colors.textMuted,
        textAlign: 'center',
        marginBottom: 36,
    },
    formCard: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        // Only corner borders via borderColor
        borderWidth: 2,
        borderColor: Colors.accent,
        padding: 24,
        gap: 14,
        shadowColor: Colors.accent,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 4,
    },
    errorText: {
        color: Colors.error,
        fontSize: 13,
        textAlign: 'center',
        fontWeight: '600',
    },
    inputWrapper: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    input: {
        height: 52,
        backgroundColor: `${Colors.accent}30`,
        borderWidth: 1.5,
        borderColor: Colors.accent,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: Colors.text,
    },
    loginBtn: {
        height: 54,
        borderRadius: 14,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 6,
    },
    loginBtnLoading: {
        backgroundColor: Colors.accent,
    },
    loginBtnText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    loadingContent: {
        alignItems: 'center',
        gap: 4,
    },
    loadingText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
    },
});
