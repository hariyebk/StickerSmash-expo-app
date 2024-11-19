import { type ImageSource } from "expo-image";
import { Animated } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

interface Props {
    imageSize: number,
    emoji: ImageSource
}

export default function EmojiSticker({imageSize, emoji} : Props){
    // Creating a shared value using the useSharedValue() hook has many advantages. It helps to mutate data and runs animations based on the current value.
    const scaleImage = useSharedValue(imageSize)
    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)
    // listening for a double tab gesture
    const doubleTap = Gesture.Tap().numberOfTaps(2).onStart(() => {
        // manipulating the scaleImage state if the image is not scaled initially
        if(scaleImage.value !== imageSize * 2){
            scaleImage.value = scaleImage.value * 2
        }
        else{
            scaleImage.value = Math.round(scaleImage.value / 2)
        }
    }).onEnd(() => {
        console.log('Double tap detected');
    })
    // listening for a pan gesture
    const drag = Gesture.Pan().onChange(event => {
        // manipulating the translateX and translateY state values
        translateX.value = event.changeX;
        translateY.value = event.changeY;
    })
    const imageStyle = useAnimatedStyle(() => {
        // changing the width and height of the emoji based on the scaleImage state value.
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value)
        }
    })

    const containerStyle = useAnimatedStyle(() => {
        // This will change the emoji's position when the gesture is active
        return {
            transform: [
                {
                    translateX: translateX.value
                },
                {
                    translateY: translateY.value
                }
            ]
        }
    })

    return (
        <GestureDetector gesture={drag}>
            {/* to make a pan gesture work, we need to apply animations to the view component */}
            <Animated.View style={[containerStyle, { top: -370, left: 20}]}>
                <GestureDetector gesture={doubleTap}>
                    {/* to make a double tap gesture work, we need to apply animations */}
                    <Animated.Image source={emoji} resizeMode="contain" style={[imageStyle, {width: imageSize, height: imageSize}]} />
                </GestureDetector>
            </Animated.View> 
        </GestureDetector>
    )
}

