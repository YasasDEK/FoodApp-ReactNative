import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
  const {colors} = useTheme();

  const theme = useTheme();

  return (
    <ImageBackground
      source={require('../images/test.jpg')}
      style={styles.image}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
