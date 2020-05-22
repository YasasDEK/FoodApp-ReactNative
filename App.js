/* eslint-disable no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './screens/DrawerContent';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import CompletedOrders from './screens/CompletedOrders';
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={MainTabScreen} />
        <Drawer.Screen name="SupportScreen" component={SupportScreen} />
        <Drawer.Screen name="AboutUsScreen" component={AboutUsScreen} />
        <Drawer.Screen name="CompletedOrders" component={CompletedOrders} />
        {/*<Drawer.Screen name="Details" component={DetailsStackScreen} />*/}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
