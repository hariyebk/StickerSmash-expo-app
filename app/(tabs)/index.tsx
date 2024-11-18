import { View,  StyleSheet } from 'react-native';
import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';
import * as ImagePicker from "expo-image-picker"
import { useState } from 'react';

const PlaceholderImage = require('@/assets/images/background-image.png')

export default function Home(){

  const [selectedImage, setSelectedImage] = useState<string>(PlaceholderImage)

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      // When allowsEditing is set to true, the user can crop the image during the selection process on Android and iOS
      allowsEditing: false,
      quality: 1
    })

    if(!result.canceled){
      setSelectedImage(result.assets[0].uri)
    }
    else{
      alert('You did not select any image.')
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
          <ImageViewer src={selectedImage} />
      </View>
      <View style={styles.footerContainer}>
          <Button theme='primary' label='Choose a photo' onPress={pickImageAsync} />
          <Button label='Use this photo' />
      </View>
    </View>
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
});
