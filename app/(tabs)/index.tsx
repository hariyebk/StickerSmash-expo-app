import { View,  StyleSheet, Text } from 'react-native';
import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';
import * as ImagePicker from "expo-image-picker"
import { useState, useRef } from 'react';
import CircleButton from '@/components/CircleButton';
import IconButton from '@/components/IconButton';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiList from '@/components/EmojiList';
import EmojiSticker from '@/components/EmojiSticker';
import { type ImageSource } from 'expo-image';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from "expo-media-library"
import { captureRef } from 'react-native-view-shot';
import { Platform } from 'react-native';
import domtoimage from 'dom-to-image';

const PlaceholderImage = require('@/assets/images/background-image.png')

export default function Home(){

  const [selectedImage, setSelectedImage] = useState<string>(PlaceholderImage)
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined)
  const [status, requestPermission] = MediaLibrary.usePermissions()
  const imageRef = useRef<View>(null)

  if(status === null){
    requestPermission()
  }

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      // When allowsEditing is set to true, the user can crop the image during the selection process on Android and iOS
      allowsEditing: true,
      quality: 1
    })

    if(!result.canceled){
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true)
    }
    else{
      alert('You did not select any image.')
    }
  }

  const onReset = () => {
    setShowAppOptions(false)
    setSelectedImage(PlaceholderImage)
  };

  const onAddSticker = () => {
    // display the modal
    setIsModalVisible(true)
  };

  const onSaveImageAsync = async () => {
    if(Platform.OS !== "web"){
      try{
        // we are taking a screenshot here
        const localURI = await captureRef(imageRef, {
          height: 440,
          quality: 1
        })
        await MediaLibrary.saveToLibraryAsync(localURI);
        if(localURI){
          alert('Saved!')
        }
      }
      catch(e){
        console.log(e)
      }
    }
    else{
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUrl;
        link.click();
      }
      catch (e) {
        console.log(e);
      }
    }
  };

  const onModalClose = () => {
    setIsModalVisible(false)
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer src={selectedImage} />
          {pickedEmoji && <EmojiSticker imageSize={40} emoji={pickedEmoji} />}
        </View>
      </View>
      {showAppOptions ? <View style={styles.optionsContainer}> 
          <View style={styles.optionsRow}>
            <IconButton icon='refresh' label='Reset' onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon='save-alt' label='Save' onPress={onSaveImageAsync} />
          </View>
      </View> : 
      <View style={styles.footerContainer}>
          <Button theme='primary' label='Choose a photo' onPress={pickImageAsync} />
          <Button label='Use this photo' onPress={() => setShowAppOptions((show) => !show)} />
      </View>
      }
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row'
  }
});
