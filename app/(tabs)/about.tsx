import { StyleSheet, Text, View } from "react-native";

export default function About(){
    return (
        <View style={style.container}>
            <Text style={style.text}> About Screen </Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white'
    },
    button: {
        fontSize: 20,
        color: 'blue'
    }
})