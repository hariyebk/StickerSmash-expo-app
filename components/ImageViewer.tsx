import { Image, type ImageSource } from "expo-image";
import { StyleSheet } from "react-native";

interface Props {
    src: ImageSource | string
}

export default function ImageViewer({src} : Props){
    return (
        <Image source={src} style={styles.image} />
    )
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
})