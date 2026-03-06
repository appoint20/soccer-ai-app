import { useState } from 'react';

// Mock combination data (moved from component)
// Replace with actual CombinationData export
export const mockCombinations = [
    {
        id: 1,
        type: '✨ LOW',
        score: 0.23,
        date: 'Di. 27. Jan.',
        confidence: 72,
        matches: [
            { id: 101, home: 'Notts County', away: 'Swindon', pick: 'BTTS Yes', league: 'League Two', time: '00:00', odds: 1.85, confidence: 59 },
            { id: 102, home: 'Lincoln', away: 'Bradford', pick: 'BTTS Yes', league: 'League One', time: '00:00', odds: 1.87, confidence: 59 },
        ],
    },
    {
        id: 2,
        type: '✨ MID',
        score: 0.45,
        date: 'Mi. 28. Jan.',
        confidence: 65,
        matches: [
            { id: 3, home: 'Barcelona', away: 'Real Madrid', pick: 'Over 2.5', league: 'La Liga', time: '20:00', odds: 1.75, confidence: 60 },
            { id: 4, home: 'PSG', away: 'Lyon', pick: 'BTTS Yes', league: 'Ligue 1', time: '21:00', odds: 1.82, confidence: 70 },
            { id: 5, home: 'Inter', away: 'Milan', pick: 'Over 2.5', league: 'Serie A', time: '18:00', odds: 1.64, confidence: 55 },
        ],
    },
    {
        id: 3,
        type: '✨ HIGH',
        score: 0.82,
        date: 'Do. 29. Jan.',
        confidence: 68,
        matches: [
            { id: 6, home: 'Liverpool', away: 'Chelsea', pick: 'BTTS Yes', league: 'Premier League', time: '16:30', odds: 1.90, confidence: 80 },
            { id: 7, home: 'Juventus', away: 'Roma', pick: 'Over 2.5', league: 'Serie A', time: '20:45', odds: 2.17, confidence: 85 },
        ],
    }
];

export const useCombinations = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [savedCombinations, setSavedCombinations] = useState<number[]>([]);
    const [skippedCombinations, setSkippedCombinations] = useState<number[]>([]);

    const currentCombo = mockCombinations[currentIndex];

    const handleSwipeLeft = () => {
        setSkippedCombinations([...skippedCombinations, currentCombo?.id || 0]);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % mockCombinations.length);
    };

    const handleSwipeRight = () => {
        setSavedCombinations([...savedCombinations, currentCombo?.id || 0]);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % mockCombinations.length);
    };

    const resetCards = () => {
        setCurrentIndex(0);
        setSavedCombinations([]);
        setSkippedCombinations([]);
    };

    return {
        currentCombo,
        currentIndex,
        totalCount: mockCombinations.length,
        savedCount: savedCombinations.length,
        skippedCount: skippedCombinations.length,
        handleSwipeLeft,
        handleSwipeRight,
        resetCards,
        isFinished: false, // Infinite loop means it never finishes
    };
};
