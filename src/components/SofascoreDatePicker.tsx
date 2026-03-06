import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Colors } from '../constants/colors';

interface SofascoreDatePickerProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const SofascoreDatePicker: React.FC<SofascoreDatePickerProps> = ({
    selectedDate,
    onDateChange,
}) => {
    const { t } = useTranslation();

    const formatLabel = (date: Date): string => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const dayStr = `${DAY_NAMES[date.getDay()]}, ${date.getDate()} ${MONTH_NAMES[date.getMonth()]}`;

        if (date.toDateString() === today.toDateString()) return `${t('today', 'Today')}, ${date.getDate()} ${MONTH_NAMES[date.getMonth()]}`;
        if (date.toDateString() === tomorrow.toDateString()) return `${t('tomorrow', 'Tomorrow')}, ${date.getDate()} ${MONTH_NAMES[date.getMonth()]}`;
        if (date.toDateString() === yesterday.toDateString()) return `${t('yesterday', 'Yesterday')}, ${date.getDate()} ${MONTH_NAMES[date.getMonth()]}`;

        return dayStr;
    }

    const goBack = () => {
        const d = new Date(selectedDate);
        d.setDate(d.getDate() - 1);
        onDateChange(d);
    };

    const goForward = () => {
        const d = new Date(selectedDate);
        d.setDate(d.getDate() + 1);
        onDateChange(d);
    };

    const label = formatLabel(selectedDate);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goBack} style={styles.arrow} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Ionicons name="chevron-back" size={20} color={Colors.primary} />
            </TouchableOpacity>

            <View style={styles.center}>
                <Ionicons name="calendar-outline" size={15} color={Colors.textMuted} />
                <Text style={styles.dateText}>{label}</Text>
            </View>

            <TouchableOpacity onPress={goForward} style={styles.arrow} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginVertical: 8,
        backgroundColor: Colors.card,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: `${Colors.accent}40`,
    },
    arrow: {
        padding: 4,
    },
    center: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    dateText: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.text,
    },
});
