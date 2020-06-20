import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const MyOrders = () => {
  return (
    <View style={styles.container}>
      <Text>MY Orders</Text>
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
