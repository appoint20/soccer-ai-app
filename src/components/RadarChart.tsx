import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Polygon, Line, Text as SvgText } from 'react-native-svg';

interface RadarData {
    winProb: number;
    btts: number;
    goals23: number;
    lowScore: number;
    over25: number;
}

interface RadarChartProps {
    data: RadarData;
    size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ data, size = 200 }) => {
    const center = size / 2;
    const radius = center - 30; // Leave room for labels
    const angleStep = (Math.PI * 2) / 5;

    // Ordered axis matching the mockup:
    // Top: OVER 2.5
    // Top Right: BTTS
    // Bottom Right: 2-3 GOALS
    // Bottom Left: LOW SCORE
    // Top Left: WIN PROB
    const labels = ["OVER 2.5", "BTTS", "2-3 GOALS", "LOW SCORE", "WIN PROB"];

    // Values mapped 0-100 to 0-1 multiplier
    const values = [
        data.over25 / 100,
        data.btts / 100,
        data.goals23 / 100,
        data.lowScore / 100,
        data.winProb / 100
    ];

    // Helper to calc coordinates
    const getPoint = (value: number, index: number) => {
        // -Math.PI / 2 starts it at exactly top 12 o'clock
        const angle = -Math.PI / 2 + index * angleStep;
        return {
            x: center + radius * value * Math.cos(angle),
            y: center + radius * value * Math.sin(angle)
        };
    };

    // Construct the polygon string for the data fill
    const dataPoints = values.map((val, i) => getPoint(val, i));
    const polygonPointsString = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

    // Draw background concentric grid polygons (e.g. 3 rings)
    const gridLevels = [0.33, 0.66, 1.0];

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Svg width={size} height={size}>
                {/* Draw Grid Webs */}
                {gridLevels.map((level, levelIdx) => {
                    const levelPoints = labels.map((_, i) => getPoint(level, i));
                    const pointsStr = levelPoints.map(p => `${p.x},${p.y}`).join(' ');
                    return (
                        <Polygon
                            key={`grid-${levelIdx}`}
                            points={pointsStr}
                            fill="none"
                            stroke="#E5E7EB"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Draw Axis Lines extending from center to edges */}
                {labels.map((_, i) => {
                    const outerPoint = getPoint(1, i);
                    return (
                        <Line
                            key={`axis-${i}`}
                            x1={center}
                            y1={center}
                            x2={outerPoint.x}
                            y2={outerPoint.y}
                            stroke="#E5E7EB"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Draw Data Shape Polygon */}
                <Polygon
                    points={polygonPointsString}
                    fill="rgba(59, 130, 246, 0.2)" // Light blue fill
                    stroke="#3B82F6"             // Solid thick blue border
                    strokeWidth="2"
                    strokeLinejoin="round"
                />

                {/* Draw Axis Labels */}
                {labels.map((label, i) => {
                    // Push labels slightly further out than the 1.0 radius ring
                    const labelPoint = getPoint(1.2, i);
                    return (
                        <SvgText
                            key={`label-${i}`}
                            x={labelPoint.x}
                            y={labelPoint.y}
                            fill="#9CA3AF"
                            fontSize="9"
                            fontWeight="600"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                        >
                            {label}
                        </SvgText>
                    );
                })}
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
