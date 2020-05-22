/* eslint-disable no-unused-vars */
import React from 'react';
import {View, Text, Button} from 'react-native';

const AddFoodScreen = ({navigation}) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>AddFood screen</Text>
      <Button
        title="Go to AddFoodScreen again"
        onPress={() => navigation.push('AddFood')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Button title="Go to Top" onPress={() => navigation.popToTop()} />
    </View>
  );
};

export default AddFoodScreen;
