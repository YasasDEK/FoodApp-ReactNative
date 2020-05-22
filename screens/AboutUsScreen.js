import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const AboutUsScreen = () => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={styles.container}>
      <Text>About us</Text>
    </View>
  );
};

export default AboutUsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
