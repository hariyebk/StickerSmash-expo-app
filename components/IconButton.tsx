import { MaterialIcons } from '@expo/vector-icons'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface Props {
    icon: keyof typeof MaterialIcons.glyphMap,
    label: string,
    onPress: () => void
}

export default function IconButton({icon, label, onPress} : Props) {
    return (
        <Pressable onPress={onPress} style={style.iconButton}> 
            <MaterialIcons name={icon} size={30} color='#fff' />
            <Text style={style.label}> {label} </Text>
        </Pressable>
    )
}

const style = StyleSheet.create({
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        color: '#fff',
        marginTop: 12,
    }
})