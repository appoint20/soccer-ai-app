import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

interface NavTab {
    name: string;
    label: string;
    icon: string;
    activeIcon: string;
    route: string;
}

const TABS: NavTab[] = [
    { name: 'home', label: 'Home', icon: 'home-outline', activeIcon: 'home', route: '/(tabs)/' },
    { name: 'combos', label: 'Combos', icon: 'layers-outline', activeIcon: 'layers', route: '/(tabs)/combinations' },
    { name: 'stats', label: 'Stats', icon: 'stats-chart-outline', activeIcon: 'stats-chart', route: '/(tabs)/stats' },
    { name: 'settings', label: 'Settings', icon: 'settings-outline', activeIcon: 'settings', route: '/(tabs)/settings' },
];

export const CustomBottomNavBar: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (tab: NavTab) => {
        if (tab.name === 'home') return pathname === '/' || pathname === '/(tabs)' || pathname === '/(tabs)/';
        return pathname.includes(tab.name) || pathname.includes(tab.route.split('/').pop()!);
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.navBar}>
                {TABS.map((tab) => {
                    const active = isActive(tab);
                    return (
                        <TouchableOpacity
                            key={tab.name}
                            style={styles.tab}
                            onPress={() => router.push(tab.route as any)}
                            activeOpacity={0.7}
                        >
                            <Ionicons
                                name={(active ? tab.activeIcon : tab.icon) as any}
                                size={22}
                                color={active ? Colors.navActive : Colors.navInactive}
                            />
                            <Text style={[styles.label, { color: active ? Colors.navActive : Colors.navInactive }]}>
                                {tab.label}
                            </Text>
                            {active && <View style={styles.activeDot} />}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 50,
        left: 24,
        right: 24,
        zIndex: 999,
    },
    navBar: {
        flexDirection: 'row',
        backgroundColor: Colors.navBackground,
        borderRadius: 28,
        paddingVertical: 8,
        paddingHorizontal: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
        elevation: 12,
        borderWidth: 1,
        borderColor: `${Colors.accent}40`,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
        gap: 2,
        position: 'relative',
    },
    label: {
        fontSize: 10,
        fontWeight: '600',
    },
    activeDot: {
        position: 'absolute',
        bottom: -4,
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: Colors.navActive,
    },
});
