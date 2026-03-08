import { useState, useEffect, useMemo } from 'react';
import { fetchBacktestData, BacktestResponse } from '../services/apiClient';

export const usePerformanceStats = () => {
    const [data, setData] = useState<BacktestResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const res = await fetchBacktestData();
                setData(res);
            } catch (err) {
                setError('Failed to load performance stats');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const stats = useMemo(() => {
        if (!data) return null;

        return {
            weeklyData: data.weekly_breakdown.map(w => ({
                week: w.week,
                bets: w.total_bets,
                won: w.bets_won,
                roi: w.roi_percent,
                profit: (w.roi_percent) // Using ROI as profit for now as we don't have a separate absolute profit per week in this specific breakdown
            })),
            leagueAccuracy: data.league_accuracy,
            summary: data.summary,
            totalProfit: data.summary.total_roi, // total_roi is the overall profit %
            totalWon: data.summary.combos_won,
            totalBets: data.summary.combos_total,
            avgROI: data.summary.total_roi,
            winRate: data.summary.win_rate,
            combinationAccuracy: data.summary.combination_accuracy,
            matchAnalysisAccuracy: data.summary.match_analysis_accuracy,
            totalLegs: data.summary.total_legs,
            correctLegs: data.summary.correct_legs
        };
    }, [data]);

    return {
        ...stats,
        loading,
        error,
        // Provide defaults for UI to prevent crashes before data loads
        weeklyData: stats?.weeklyData || [],
        totalProfit: stats?.totalProfit || 0,
        totalWon: stats?.totalWon || 0,
        totalBets: stats?.totalBets || 0,
        avgROI: stats?.avgROI || 0,
        winRate: stats?.winRate || 0,
    };
};
