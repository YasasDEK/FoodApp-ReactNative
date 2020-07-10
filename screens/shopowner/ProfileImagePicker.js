import React, {useState, useEffect} from 'react';
import {View, Button, Image, StyleSheet, Text} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const ProfileImagePick = ({image, onImagePicked}) => {
  const [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    if (image) {
      console.log('useEffect: ' + image);
      setSelectedImage({uri: image});
    }
  }, [image]);

  const pickImageHandler = () => {
    ImagePicker.showImagePicker(
      {title: 'Pick an Image', maxWidth: 800, maxHeight: 600},
      response => {
        if (response.error) {
          console.log('image error');
        } else {
          console.log('Image: ' + response.uri);
          setSelectedImage({uri: response.uri});
          onImagePicked({uri: response.uri});
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text_footer, {marginTop: 35}]}>Update image</Text>
      <View style={styles.imageContainer}>
        <Image source={selectedImage} style={styles.previewImage} />
      </View>
      <View styels={styles.button}>
        <Button title="Pick Image" onPress={pickImageHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150,
  },
  button: {
    margin: 8,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
});

export default ProfileImagePick;
