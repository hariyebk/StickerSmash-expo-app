import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function NotFoundScreen() {
    return (
        <View style={styles.container}>
            <Link href='/(tabs)' style={styles.button}> Go back to Home screen! </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        fontSize: 20,
        color: 'blue',
    },
});
