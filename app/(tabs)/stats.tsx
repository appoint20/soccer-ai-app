import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../src/constants/colors';
import { ScreenHeader } from '../../src/components/ScreenHeader';
import { BacktestReport } from '../../src/components/BacktestReport';

export default function StatsScreen() {
    return (
        <View style={styles.container}>
            <ScreenHeader
                title="Performance"
                subtitle="Track your ROI and win rates"
            />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                <View style={styles.reportWrapper}>
                    <BacktestReport />
                </View>
                <View style={{ height: 130 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    content: { paddingTop: 4, paddingHorizontal: 12 },
    reportWrapper: { marginTop: 8 },
});
