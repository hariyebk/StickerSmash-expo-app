import { Image, type ImageSource } from "expo-image";
import { View } from "react-native";

interface Props {
    imageSize: number,
    emoji: ImageSource
}

export default function EmojiSticker({imageSize, emoji} : Props) {
    return (
        <View style={{ top: -370, left: 20}}>
            <Image source={emoji} style={{width: imageSize, height: imageSize}} />
        </View> 
    )
}

