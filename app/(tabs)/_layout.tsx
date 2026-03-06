import { Slot } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomBottomNavBar } from '../../src/components/CustomBottomNavBar';

export default function TabsLayout() {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <Slot />
            <CustomBottomNavBar />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});
