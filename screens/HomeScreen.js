import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={styles.container}>
      <Text>Home screen</Text>
      <Button
        title="Go to DetailsScreen"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
