import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ButtonProps {
    title: string
}

function Button(props: ButtonProps) {
    return (
        <TouchableOpacity>
            <Text>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}

export default function App() {
    return (
        <View style={styles.container}>
            <Text>
                Hello React Native!
            </Text>

            <Button title='Send1' />

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
