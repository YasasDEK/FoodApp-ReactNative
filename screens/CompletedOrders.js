import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const CompletedOrders = () => {
  return (
    <View style={styles.container}>
      <Text>Completed Orders</Text>
    </View>
  );
};

export default CompletedOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
