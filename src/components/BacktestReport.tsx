import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { usePerformanceStats } from '../hooks/usePerformanceStats';
import { LineChart } from './charts/LineChart';
import { BarChart } from './charts/BarChart';

const { width } = Dimensions.get('window');

export const BacktestReport = () => {
    const { 
        weeklyData, 
        totalProfit, 
        totalWon, 
        totalBets, 
        winRate, 
        combinationAccuracy, 
        matchAnalysisAccuracy, 
        totalLegs, 
        correctLegs,
        leagueAccuracy,
        loading,
        error 
    } = usePerformanceStats();
    
    const chartWidth = width - 64; // Adjusted for padding in settings

    if (loading) {
        return (
            <View style={styles.center}>
                <Text style={styles.text}>Loading report...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={[styles.text, { color: Colors.error }]}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* KPI Cards Row 1 */}
            <View style={styles.kpiRow}>
                {[
                    { icon: 'trending-up', label: 'Total ROI', value: `${totalProfit >= 0 ? '+' : ''}${totalProfit.toFixed(1)}%`, color: totalProfit >= 0 ? Colors.success : Colors.error },
                    { icon: 'checkmark-circle', label: 'Win Rate', value: `${winRate.toFixed(1)}%`, color: Colors.success },
                    { icon: 'list', label: 'Total Bets', value: totalBets.toString(), color: Colors.primary },
                ].map((kpi) => (
                    <View key={kpi.label} style={styles.kpiCard}>
                        <Ionicons name={kpi.icon as any} size={20} color={kpi.color} />
                        <Text style={[styles.kpiValue, { color: kpi.color }]}>{kpi.value}</Text>
                        <Text style={styles.kpiLabel}>{kpi.label}</Text>
                    </View>
                ))}
            </View>

            {/* KPI Cards Row 2 */}
            <View style={[styles.kpiRow, { paddingTop: 0 }]}>
                {[
                    { icon: 'star', label: 'Combo Acc', value: `${combinationAccuracy?.toFixed(1)}%`, color: Colors.warning },
                    { icon: 'analytics', label: 'Match Acc', value: `${matchAnalysisAccuracy?.toFixed(1)}%`, color: Colors.info },
                    { icon: 'football', label: 'Legs', value: `${correctLegs}/${totalLegs}`, color: Colors.primary },
                ].map((kpi) => (
                    <View key={kpi.label} style={styles.kpiCard}>
                        <Ionicons name={kpi.icon as any} size={20} color={kpi.color} />
                        <Text style={[styles.kpiValue, { color: kpi.color }]}>{kpi.value}</Text>
                        <Text style={styles.kpiLabel}>{kpi.label}</Text>
                    </View>
                ))}
            </View>

            {/* Profit Chart */}
            <View style={styles.chartCard}>
                <Text style={styles.chartTitle}>Weekly ROI %</Text>
                <LineChart data={weeklyData.map((w) => w.roi)} labels={weeklyData.map((w) => w.week)} color={Colors.success} width={chartWidth - 32} height={160} />
            </View>

            {/* League Accuracy Table */}
            {leagueAccuracy && leagueAccuracy.length > 0 && (
                <View style={styles.chartCard}>
                    <Text style={styles.chartTitle}>League Accuracy</Text>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderText, { flex: 2 }]}>League</Text>
                        <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'right' }]}>BTTS</Text>
                        <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'right' }]}>O2.5</Text>
                    </View>
                    {leagueAccuracy.map((item, i) => (
                        <View key={i} style={styles.weekRow}>
                            <Text style={[styles.weekLabel, { flex: 2, width: 'auto' }]}>{item.league}</Text>
                            <Text style={[styles.weekProfit, { flex: 1, color: Colors.primary }]}>{item.btts_accuracy.toFixed(1)}%</Text>
                            <Text style={[styles.weekProfit, { flex: 1, color: Colors.success }]}>{item.over25_accuracy.toFixed(1)}%</Text>
                        </View>
                    ))}
                </View>
            )}

            {/* Weekly Table */}
            <View style={styles.chartCard}>
                <Text style={styles.chartTitle}>Weekly Breakdown</Text>
                {weeklyData.map((week, i) => (
                    <View key={i} style={styles.weekRow}>
                        <Text style={styles.weekLabel}>{week.week}</Text>
                        <Text style={styles.weekBets}>{week.bets} b</Text>
                        <Text style={[styles.weekWon, { color: Colors.primary }]}>{week.won} w</Text>
                        <Text style={[styles.weekProfit, { color: week.roi >= 0 ? Colors.success : Colors.error }]}>
                            {week.roi >= 0 ? '+' : ''}{week.roi.toFixed(1)}%
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { width: '100%' },
    center: { padding: 20, alignItems: 'center' },
    text: { fontSize: 14, color: Colors.text },
    kpiRow: { flexDirection: 'row', gap: 6, paddingVertical: 8 },
    kpiCard: { flex: 1, backgroundColor: Colors.card, borderRadius: 12, padding: 8, alignItems: 'center', gap: 2, borderWidth: 1, borderColor: `${Colors.accent}20` },
    kpiValue: { fontSize: 11, fontWeight: '800' },
    kpiLabel: { fontSize: 8, color: Colors.textMuted, textAlign: 'center' },
    chartCard: { marginTop: 12, backgroundColor: Colors.card, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: `${Colors.accent}20` },
    chartTitle: { fontSize: 14, fontWeight: '700', color: Colors.text, marginBottom: 10 },
    weekRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderTopWidth: 1, borderTopColor: `${Colors.accent}10` },
    weekLabel: { width: 32, fontSize: 12, fontWeight: '600', color: Colors.text },
    weekBets: { fontSize: 11, color: Colors.textMuted, width: 40 },
    weekWon: { fontSize: 11, width: 40 },
    weekProfit: { fontSize: 11, fontWeight: '700', width: 44, textAlign: 'right' },
    tableHeader: { flexDirection: 'row', paddingBottom: 6 },
    tableHeaderText: { fontSize: 11, fontWeight: '700', color: Colors.textMuted },
});
