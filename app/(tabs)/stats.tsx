import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/constants/colors';
import { ScreenHeader } from '../../src/components/ScreenHeader';
import { usePerformanceStats } from '../../src/hooks/usePerformanceStats';
import { LineChart } from '../../src/components/charts/LineChart';
import { BarChart } from '../../src/components/charts/BarChart';

const { width } = Dimensions.get('window');

export default function StatsScreen() {
    const { weeklyData, totalProfit, totalWon, totalBets, avgROI, winRate } = usePerformanceStats();
    const chartWidth = width - 32;

    return (
        <View style={styles.container}>
            <ScreenHeader
                title="Performance"
                subtitle="Track your ROI and win rates"
            />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                {/* KPI Cards */}
                <View style={styles.kpiRow}>
                    {[
                        { icon: 'trending-up', label: 'Total Profit', value: `${totalProfit >= 0 ? '+' : ''}${totalProfit.toFixed(1)}%`, color: totalProfit >= 0 ? Colors.success : Colors.error },
                        { icon: 'analytics', label: 'Avg ROI', value: `${avgROI.toFixed(1)}%`, color: Colors.primary },
                        { icon: 'checkmark-circle', label: 'Win Rate', value: `${winRate.toFixed(1)}%`, color: Colors.success },
                    ].map((kpi) => (
                        <View key={kpi.label} style={styles.kpiCard}>
                            <Ionicons name={kpi.icon as any} size={22} color={kpi.color} />
                            <Text style={[styles.kpiValue, { color: kpi.color }]}>{kpi.value}</Text>
                            <Text style={styles.kpiLabel}>{kpi.label}</Text>
                        </View>
                    ))}
                </View>

                {/* ROI Chart */}
                <View style={styles.chartCard}>
                    <View style={styles.chartRow}>
                        <Text style={styles.chartTitle}>ROI Trend</Text>
                        <View style={styles.badgeGreen}><Text style={styles.badgeGreenText}>+{avgROI.toFixed(1)}% avg</Text></View>
                    </View>
                    <LineChart data={weeklyData.map((w) => w.roi)} labels={weeklyData.map((w) => w.week)} color={Colors.primary} width={chartWidth - 32} height={180} />
                </View>

                {/* Profit Chart */}
                <View style={styles.chartCard}>
                    <Text style={styles.chartTitle}>Weekly Profit</Text>
                    <LineChart data={weeklyData.map((w) => w.profit)} labels={weeklyData.map((w) => w.week)} color={Colors.success} width={chartWidth - 32} height={180} />
                </View>

                {/* Bets Bar Chart */}
                <View style={styles.chartCard}>
                    <View style={styles.chartRow}>
                        <Text style={styles.chartTitle}>Bets Won</Text>
                        <View style={styles.badgeBlue}><Text style={styles.badgeBlueText}>{totalWon} / {totalBets}</Text></View>
                    </View>
                    <BarChart data={weeklyData.map((w) => ({ label: w.week, value: w.won }))} color={Colors.primary} width={chartWidth - 32} height={160} />
                </View>

                {/* Weekly Table */}
                <View style={styles.chartCard}>
                    <Text style={styles.chartTitle}>Weekly Breakdown</Text>
                    {weeklyData.map((week, i) => (
                        <View key={i} style={styles.weekRow}>
                            <Text style={styles.weekLabel}>{week.week}</Text>
                            <Text style={styles.weekBets}>{week.bets} bets</Text>
                            <Text style={[styles.weekWon, { color: Colors.primary }]}>{week.won} won</Text>
                            <Text style={[styles.weekProfit, { color: week.profit >= 0 ? Colors.success : Colors.error }]}>
                                {week.profit >= 0 ? '+' : ''}{week.profit.toFixed(1)}%
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={{ height: 130 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    content: { paddingTop: 4, paddingHorizontal: 4 },
    kpiRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 12, paddingVertical: 12 },
    kpiCard: { flex: 1, backgroundColor: Colors.card, borderRadius: 14, padding: 12, alignItems: 'center', gap: 4, borderWidth: 1, borderColor: `${Colors.accent}30` },
    kpiValue: { fontSize: 16, fontWeight: '800' },
    kpiLabel: { fontSize: 10, color: Colors.textMuted, textAlign: 'center' },
    chartCard: { marginHorizontal: 12, marginBottom: 12, backgroundColor: Colors.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: `${Colors.accent}30` },
    chartRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    chartTitle: { fontSize: 15, fontWeight: '700', color: Colors.text, marginBottom: 12 },
    badgeGreen: { backgroundColor: `${Colors.success}20`, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    badgeGreenText: { fontSize: 11, color: Colors.success, fontWeight: '700' },
    badgeBlue: { backgroundColor: `${Colors.primary}20`, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    badgeBlueText: { fontSize: 11, color: Colors.primary, fontWeight: '700' },
    weekRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderTopWidth: 1, borderTopColor: `${Colors.accent}20` },
    weekLabel: { width: 36, fontSize: 13, fontWeight: '600', color: Colors.text },
    weekBets: { fontSize: 12, color: Colors.textMuted, width: 52 },
    weekWon: { fontSize: 12, width: 52 },
    weekProfit: { fontSize: 12, fontWeight: '700', width: 48, textAlign: 'right' },
});
