import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScreenHeader } from '../../src/components/ScreenHeader';
import { Colors } from '../../src/constants/colors';
import { RadarChart } from '../../src/components/RadarChart';

// Team Form Block helper
const FormBlock = ({ result }: { result: string }) => {
    let bgColor = '#D1D5DB'; // Gray fallback
    if (result === 'W') bgColor = '#34D399';
    if (result === 'D') bgColor = '#FBBF24';
    if (result === 'L') bgColor = '#EF4444';

    return (
        <View style={[styles.formBlock, { backgroundColor: bgColor }]}>
            <Text style={styles.formBlockText}>{result}</Text>
        </View>
    );
};

// Progress Line helper
const ProgressLine = ({ value, label, color }: { value: number, label: string, color: string }) => (
    <View style={styles.progressRow}>
        <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>{label}</Text>
            <Text style={[styles.progressValue, { color }]}>{value}%</Text>
        </View>
        <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${value}%`, backgroundColor: color }]} />
        </View>
    </View>
);

export default function MatchDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    // Scaffold Data mimicking screenshots
    const matchData = {
        league: "Championship",
        date: "Di., Feb. 24 • 20:45:00",
        home: { name: "Watford", rank: 9, points: 48, winRate: 14, avgScored: 0.86, avgConceded: 1.00, recentScored: 40, recentConceded: 60, cleanSheet: 28, form: ['W', 'D', 'L', 'D', 'L'] },
        away: { name: "Ipswich", rank: 4, points: 54, winRate: 57, avgScored: 2.00, avgConceded: 1.57, recentScored: 80, recentConceded: 0, cleanSheet: 28, form: ['L', 'W', 'D', 'L', 'W'] }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Nav Back Header (Safe Area Buffer) */}
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={20} color={Colors.primary} />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
            </View>

            {/* Native Screen Header */}
            <ScreenHeader
                title="Match Details"
                subtitle="Deep Dive & Analysis"
                showWarning
            />

            {/* League & Time Row */}
            <View style={styles.leagueRow}>
                <View style={styles.leagueBadge}>
                    <Text style={styles.leagueText}>{matchData.league}</Text>
                </View>
                <Text style={styles.dateText}>{matchData.date}</Text>
            </View>

            {/* Section: Team Statistics */}
            <View style={styles.sectionHeader}>
                <View style={styles.shLine} />
                <Text style={styles.sectionTitle}>Team Statistics</Text>
            </View>

            <View style={styles.statsGrid}>
                {/* HOME CARD */}
                <View style={styles.teamCard}>
                    <Text style={[styles.teamRank, { color: '#3B82F6' }]}>#{matchData.home.rank}</Text>
                    <Text style={styles.teamName}>{matchData.home.name}</Text>

                    <View style={styles.formRow}>
                        <View style={[styles.circlePlaceholder, { borderColor: '#EF4444', borderLeftColor: '#E5E7EB' }]} />
                        <View>
                            <Text style={styles.formLabel}>Form</Text>
                            <View style={styles.formBlocks}>
                                {matchData.home.form.map((res, i) => <FormBlock key={i} result={res} />)}
                            </View>
                        </View>
                    </View>

                    <View style={styles.dataRow}>
                        <View style={styles.dataCol}>
                            <Text style={styles.dataLabel}>Points</Text>
                            <Text style={styles.dataValue}>{matchData.home.points}</Text>
                        </View>
                        <View style={styles.dataCol}>
                            <Text style={styles.dataLabel}>Win Rate</Text>
                            <Text style={styles.dataValue}>{matchData.home.winRate}%</Text>
                        </View>
                    </View>

                    <View style={styles.dataRow}>
                        <View style={styles.dataCol}>
                            <Text style={styles.dataLabel}>Avg Scored</Text>
                            <Text style={styles.dataValue}>{matchData.home.avgScored.toFixed(2)}</Text>
                        </View>
                        <View style={styles.dataCol}>
                            <Text style={styles.dataLabel}>Avg Conceded</Text>
                            <Text style={styles.dataValue}>{matchData.home.avgConceded.toFixed(2)}</Text>
                        </View>
                    </View>

                    <ProgressLine value={matchData.home.recentScored} label="Recent Scored (Last 3)" color="#34D399" />
                    <ProgressLine value={matchData.home.recentConceded} label="Recent Conceded (Last 3)" color="#FBBF24" />
                    <ProgressLine value={matchData.home.cleanSheet} label="Clean Sheet Rate" color="#3B82F6" />
                </View>

                {/* AWAY CARD */}
                <View style={styles.teamCard}>
                    <Text style={[styles.teamRank, { color: '#B91C1C' }]}>#{matchData.away.rank}</Text>
                    <Text style={styles.teamName}>{matchData.away.name}</Text>

                    <View style={styles.formRow}>
                        <View style={[styles.circlePlaceholder, { borderColor: '#EF4444', borderRightColor: '#E5E7EB' }]} />
                        <View>
                            <Text style={styles.formLabel}>Form</Text>
                            <View style={styles.formBlocks}>
                                {matchData.away.form.map((res, i) => <FormBlock key={i} result={res} />)}
                            </View>
                        </View>
                    </View>

                    <View style={styles.dataRow}>
                        <View style={styles.dataCol}>
                            <Text style={styles.dataLabel}>Points</Text>
                            <Text style={styles.dataValue}>{matchData.away.points}</Text>
                        </View>
                        <View style={styles.dataCol}>
                            <Text style={styles.dataLabel}>Win Rate</Text>
                            <Text style={styles.dataValue}>{matchData.away.winRate}%</Text>
                        </View>
                    </View>

                    <View style={styles.dataRow}>
                        <View style={styles.dataCol}>
                            <Text style={styles.dataLabel}>Avg Scored</Text>
                            <Text style={styles.dataValue}>{matchData.away.avgScored.toFixed(2)}</Text>
                        </View>
                        <View style={styles.dataCol}>
                            <Text style={styles.dataLabel}>Avg Conceded</Text>
                            <Text style={styles.dataValue}>{matchData.away.avgConceded.toFixed(2)}</Text>
                        </View>
                    </View>

                    <ProgressLine value={matchData.away.recentScored} label="Recent Scored (Last 3)" color="#34D399" />
                    <ProgressLine value={matchData.away.recentConceded} label="Recent Conceded (Last 3)" color="#FBBF24" />
                    <ProgressLine value={matchData.away.cleanSheet} label="Clean Sheet Rate" color="#3B82F6" />
                </View>
            </View>

            {/* Section: Deep Analysis */}
            <View style={styles.sectionHeader}>
                <View style={styles.shLine} />
                <Text style={styles.sectionTitle}>Deep Analysis</Text>
            </View>

            <View style={styles.analysisCard}>
                <View style={styles.analysisTop}>
                    <View style={styles.aiBadge}>
                        <Ionicons name="sparkles" size={16} color="#3B82F6" />
                    </View>
                    <View style={styles.aiTitles}>
                        <Text style={styles.aiTitle}>AI Analysis</Text>
                        <Text style={styles.aiSubtitle}>Deep reasoning & trap detection</Text>
                    </View>
                    <View style={styles.confidenceBlock}>
                        <Text style={styles.confValue}>66%</Text>
                        <Text style={styles.confLabel}>CONFIDENCE</Text>
                    </View>
                </View>

                <View style={styles.recommendationBlock}>
                    <Text style={styles.recLabel}>RECOMMENDATION</Text>
                    <View style={styles.recRow}>
                        <Ionicons name="trending-up" size={24} color="#3B82F6" />
                        <Text style={styles.recValue}>BTTS</Text>
                    </View>
                    <View style={styles.recTrack}>
                        <View style={[styles.recFill, { width: '66%' }]} />
                    </View>
                </View>

                {/* Trap Box */}
                <View style={styles.trapBox}>
                    <Ionicons name="warning" size={20} color="#F59E0B" />
                    <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={styles.trapTitle}>TRAP DETECTED</Text>
                        <Text style={styles.trapBody}>AI has identified potential misleading signals in this match. Exercise caution.</Text>
                    </View>
                </View>

                <View style={styles.textBlock}>
                    <Text style={styles.textHeading}>REASONING</Text>
                    <Text style={styles.textContent}>Ipswich is a chaos team: scoring 2.00 and conceding 1.57. Watford is weak (0.86 scored) but Ipswich's defense allows chances.</Text>
                </View>

                <View style={styles.textBlock}>
                    <Text style={styles.textHeading}>FULL ANALYSIS</Text>
                    <Text style={[styles.textContent, { color: '#9CA3AF' }]}>Ipswich is the driving force here, averaging 2.00 goals scored and 1.57 conceded. They play open, attacking football. Watford's attack is poor (0.86), but against a defense conceding 1.57, they will get chances. The trap here is the model favoring Watford to win; statistically, Ipswich is the more dangerous side. However, rather than guessing the winner in a trap game, the goal markets are clearer. Ipswich's leaky defense combined with their potent attack screams BTTS.</Text>
                </View>
            </View>

            {/* Section: Head to Head */}
            <View style={styles.sectionHeader}>
                <View style={styles.shLine} />
                <Text style={styles.sectionTitle}>Head to Head</Text>
            </View>

            <View style={styles.h2hCard}>
                <View style={styles.h2hTop}>
                    <View style={styles.h2hLogBox}>
                        <Ionicons name="time-outline" size={20} color="#3B82F6" />
                        <Text style={styles.h2hTitle}>Head to Head</Text>
                    </View>
                    <View style={styles.matchesBadge}>
                        <Text style={styles.matchesText}>3 Matches</Text>
                    </View>
                </View>

                {/* 1x2 split bar */}
                <View style={styles.splitLineTrack}>
                    <View style={[styles.splitHome, { width: '0%' }]} />
                    <View style={[styles.splitDraw, { width: '67%' }]} />
                    <View style={[styles.splitAway, { width: '33%' }]} />
                </View>
                <View style={styles.splitLabels}>
                    <View style={{ alignItems: 'flex-start' }}>
                        <Text style={styles.slTitle}>Home</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <View style={[styles.slDot, { backgroundColor: '#34D399' }]} />
                            <Text style={[styles.slValue, { color: '#34D399' }]}>0%</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.slTitle}>Draw</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <View style={[styles.slDot, { backgroundColor: '#818CF8' }]} />
                            <Text style={[styles.slValue, { color: '#818CF8' }]}>67%</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.slTitle}>Away</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <View style={[styles.slDot, { backgroundColor: '#EF4444' }]} />
                            <Text style={[styles.slValue, { color: '#EF4444' }]}>33%</Text>
                        </View>
                    </View>
                </View>

                <ProgressLine value={67} label="BTTS" color="#818CF8" />
                <ProgressLine value={33} label="Over 2.5" color="#FBBF24" />
                <View style={styles.progressRow}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressLabel}>Avg Goals/Match</Text>
                        <Text style={[styles.progressValue, { color: '#0EA5E9' }]}>1.7</Text>
                    </View>
                    <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: `60%`, backgroundColor: '#0EA5E9' }]} />
                    </View>
                </View>
            </View>

            {/* Section: System Predictions */}
            <View style={styles.sectionHeader}>
                <View style={styles.shLine} />
                <Text style={styles.sectionTitle}>System Predictions</Text>
            </View>

            <View style={styles.spiderCard}>
                <RadarChart
                    size={280}
                    data={{
                        over25: 53,
                        btts: 66,
                        goals23: 45,
                        lowScore: 47,
                        winProb: 38
                    }}
                />

                <View style={styles.picksHeader}>
                    <Ionicons name="checkmark-circle-outline" size={16} color="#34D399" />
                    <Text style={[styles.picksTitle, { color: '#34D399' }]}>QUALIFIED PICKS</Text>
                </View>

                <View style={[styles.pickBox, { borderColor: '#A7F3D0', backgroundColor: '#F0FDF4' }]}>
                    <View style={styles.pickBoxTop}>
                        <Ionicons name="checkmark-circle-outline" size={20} color="#34D399" />
                        <Text style={styles.pickBoxTitle}>Over 2.5 Goals</Text>
                        <Text style={[styles.pickBoxPct, { color: '#34D399' }]}>53%</Text>
                    </View>
                    <Text style={styles.pickBoxDesc}>Ipswich's games average over 3.5 goals total, favoring the Over.</Text>
                </View>

                <View style={[styles.pickBox, { borderColor: '#A7F3D0', backgroundColor: '#F0FDF4' }]}>
                    <View style={styles.pickBoxTop}>
                        <Ionicons name="checkmark-circle-outline" size={20} color="#34D399" />
                        <Text style={styles.pickBoxTitle}>Both Teams to Score</Text>
                        <Text style={[styles.pickBoxPct, { color: '#34D399' }]}>66%</Text>
                    </View>
                    <Text style={styles.pickBoxDesc}>Ipswich scores and concedes in equal measure, making BTTS a solid pick.</Text>
                </View>

                <View style={[styles.picksHeader, { marginTop: 16 }]}>
                    <Ionicons name="close-circle-outline" size={16} color="#9CA3AF" />
                    <Text style={[styles.picksTitle, { color: '#9CA3AF' }]}>NOT QUALIFIED</Text>
                </View>

                <View style={[styles.pickBox, { borderColor: '#F3F4F6', backgroundColor: '#FFFFFF', paddingBottom: 0 }]}>
                    <View style={styles.pickBoxTop}>
                        <Ionicons name="close-circle-outline" size={20} color="#9CA3AF" />
                        <Text style={[styles.pickBoxTitle, { color: '#6B7280' }]}>2-3 Goals</Text>
                        <Text style={[styles.pickBoxPct, { color: '#4B5563' }]}>45%</Text>
                    </View>
                    <Text style={styles.pickBoxDesc}>Low confidence (45 % {'<'} 60%)</Text>
                </View>

                <View style={[styles.pickBox, { borderColor: '#F3F4F6', backgroundColor: '#FFFFFF', paddingBottom: 0 }]}>
                    <View style={styles.pickBoxTop}>
                        <Ionicons name="close-circle-outline" size={20} color="#9CA3AF" />
                        <Text style={[styles.pickBoxTitle, { color: '#6B7280' }]}>Low Scoring</Text>
                        <Text style={[styles.pickBoxPct, { color: '#4B5563' }]}>47%</Text>
                    </View>
                    <Text style={styles.pickBoxDesc}>Very unlikely given Ipswich's defensive record.</Text>
                </View>

                <View style={[styles.pickBox, { borderColor: '#F3F4F6', backgroundColor: '#FFFFFF' }]}>
                    <View style={styles.pickBoxTop}>
                        <Ionicons name="close-circle-outline" size={20} color="#9CA3AF" />
                        <Text style={[styles.pickBoxTitle, { color: '#6B7280' }]}>Match Winner: Watford</Text>
                        <Text style={[styles.pickBoxPct, { color: '#4B5563' }]}>38%</Text>
                    </View>
                    <Text style={styles.pickBoxDesc}>Model favors Watford, but their attack is statistically too weak to trust.</Text>
                </View>

            </View>

            <View style={{ height: 100 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    content: { paddingTop: 10, paddingBottom: 40 },
    navBar: { paddingHorizontal: 16, paddingTop: 60, paddingBottom: 4 },
    backButton: { flexDirection: 'row', alignItems: 'center' },
    backText: { fontSize: 16, color: Colors.primary, marginLeft: 4, fontWeight: '600' },
    leagueRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 16 },
    leagueBadge: { backgroundColor: '#57845E', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
    leagueText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
    dateText: { color: '#6B7280', fontSize: 12, fontWeight: '500' },

    sectionHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 24, marginBottom: 16 },
    shLine: { width: 4, height: 18, backgroundColor: '#2563EB', marginRight: 8, borderRadius: 2 },
    sectionTitle: { fontSize: 16, fontWeight: '800', color: '#111827' },

    statsGrid: { flexDirection: 'row', paddingHorizontal: 16, gap: 12 },
    teamCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
    teamRank: { fontSize: 16, fontWeight: '900' },
    teamName: { fontSize: 16, fontWeight: '800', color: '#111827', marginBottom: 16 },

    formRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
    circlePlaceholder: { width: 48, height: 48, borderRadius: 24, borderWidth: 4 },
    formLabel: { fontSize: 10, color: '#9CA3AF', marginBottom: 4, fontWeight: '600' },
    formBlocks: { flexDirection: 'row', gap: 4 },
    formBlock: { width: 14, height: 14, borderRadius: 3, justifyContent: 'center', alignItems: 'center' },
    formBlockText: { color: '#FFF', fontSize: 8, fontWeight: 'bold' },

    dataRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    dataCol: { flex: 1 },
    dataLabel: { fontSize: 10, color: '#9CA3AF', fontWeight: '500', marginBottom: 2 },
    dataValue: { fontSize: 15, fontWeight: '900', color: '#111827' },

    progressRow: { marginBottom: 10 },
    progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    progressLabel: { fontSize: 10, color: '#6B7280', fontWeight: '600' },
    progressValue: { fontSize: 10, fontWeight: '800' },
    progressTrack: { height: 4, backgroundColor: '#F3F4F6', borderRadius: 2, overflow: 'hidden' },
    progressFill: { height: '100%', borderRadius: 2 },

    analysisCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, marginHorizontal: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
    analysisTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
    aiBadge: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    aiTitles: { flex: 1 },
    aiTitle: { fontSize: 16, fontWeight: '800', color: '#111827' },
    aiSubtitle: { fontSize: 12, color: '#6B7280' },
    confidenceBlock: { alignItems: 'flex-end' },
    confValue: { fontSize: 22, fontWeight: '900', color: '#3B82F6' },
    confLabel: { fontSize: 8, fontWeight: '800', color: '#6B7280', letterSpacing: 1 },

    recommendationBlock: { marginBottom: 24 },
    recLabel: { fontSize: 10, fontWeight: '700', color: '#9CA3AF', letterSpacing: 1, marginBottom: 8 },
    recRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
    recValue: { fontSize: 24, fontWeight: '900', color: '#111827' },
    recTrack: { height: 6, backgroundColor: '#F3F4F6', borderRadius: 3, overflow: 'hidden' },
    recFill: { height: '100%', backgroundColor: '#2563EB', borderRadius: 3 },

    trapBox: { backgroundColor: '#FFF7ED', borderColor: '#FFEDD5', borderWidth: 1, borderRadius: 12, padding: 16, flexDirection: 'row', marginBottom: 24 },
    trapTitle: { fontSize: 13, fontWeight: '800', color: '#D97706', marginBottom: 4 },
    trapBody: { fontSize: 13, color: '#9CA3AF', lineHeight: 20 },

    textBlock: { marginBottom: 20 },
    textHeading: { fontSize: 10, fontWeight: '700', color: '#9CA3AF', letterSpacing: 1, marginBottom: 6 },
    textContent: { fontSize: 14, color: '#374151', lineHeight: 22 },

    h2hCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, marginHorizontal: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
    h2hTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    h2hLogBox: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    h2hTitle: { fontSize: 16, fontWeight: '800', color: '#111827' },
    matchesBadge: { backgroundColor: '#CCFBF1', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
    matchesText: { color: '#0D9488', fontSize: 11, fontWeight: '800' },
    splitLineTrack: { height: 10, flexDirection: 'row', borderRadius: 5, overflow: 'hidden', marginBottom: 8 },
    splitHome: { backgroundColor: '#34D399' },
    splitDraw: { backgroundColor: '#818CF8' },
    splitAway: { backgroundColor: '#EF4444' },
    splitLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
    slTitle: { fontSize: 10, color: '#9CA3AF', marginBottom: 2 },
    slDot: { width: 4, height: 4, borderRadius: 2 },
    slValue: { fontSize: 14, fontWeight: '900' },

    spiderCard: { backgroundColor: '#FFFFFF', borderRadius: 20, paddingTop: 30, paddingHorizontal: 20, paddingBottom: 20, marginHorizontal: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
    picksHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16, marginTop: 10 },
    picksTitle: { fontSize: 11, fontWeight: '800', letterSpacing: 1 },
    pickBox: { borderWidth: 1, borderRadius: 12, padding: 16, marginBottom: 12 },
    pickBoxTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    pickBoxTitle: { flex: 1, fontSize: 14, fontWeight: '800', color: '#111827', marginLeft: 8 },
    pickBoxPct: { fontSize: 14, fontWeight: '900' },
    pickBoxDesc: { fontSize: 13, color: '#9CA3AF', lineHeight: 20 },
});
