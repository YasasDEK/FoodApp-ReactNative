import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const CompletedOrders = () => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
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
