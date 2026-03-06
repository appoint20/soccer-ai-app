import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Colors } from '../constants/colors';

interface PastDayStatsProps {
    correctMatches: number;
    totalMatches: number;
    accuracyRate: number;
}

export const PastDayStats: React.FC<PastDayStatsProps> = ({
    correctMatches,
    totalMatches,
    accuracyRate,
}) => {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <View style={styles.iconWrapper}>
                <Ionicons name="stats-chart" size={24} color={Colors.primary} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{t('matchesCorrect', { correct: correctMatches, total: totalMatches })}</Text>
                <Text style={styles.accuracyText}>{t('accuracyRate', { rate: accuracyRate })}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: `${Colors.primary}15`,
        borderRadius: 16,
        marginHorizontal: 16,
        marginVertical: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        borderWidth: 1,
        borderColor: `${Colors.primary}30`,
    },
    iconWrapper: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '800',
        color: Colors.text,
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    accuracyText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.primary,
    },
});
