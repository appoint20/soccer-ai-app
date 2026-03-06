import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';

interface GlobalHeaderProps {
    title?: string;
    subtitle?: string;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
    title = 'Match Analysis',
    subtitle = 'AI-powered football insights',
}) => {
    let LogoContent: React.ReactNode;
    try {
        const logo = require('../../assets/images/logo.png');
        LogoContent = <Image source={logo} style={styles.logo} resizeMode="contain" />;
    } catch {
        LogoContent = (
            <View style={styles.logoFallback}>
                <Text style={styles.logoFallbackText}>⚽</Text>
            </View>
        );
    }

    return (
        <SafeAreaView edges={['top']} style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.logoBox}>{LogoContent}</View>
                <View style={styles.textBox}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#FFFFFF',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: `${Colors.accent}40`,
    },
    logoBox: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 44,
        height: 44,
        borderRadius: 10,
    },
    logoFallback: {
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: `${Colors.accent}30`,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoFallbackText: { fontSize: 22 },
    textBox: { flex: 1 },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.text,
        letterSpacing: 0.3,
    },
    subtitle: {
        fontSize: 12,
        color: Colors.textMuted,
        marginTop: 1,
    },
});
