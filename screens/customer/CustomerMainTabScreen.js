/* eslint-disable no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {View, Text, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AllFoodScreen from './AllFoodScreen';
import shoppingCartScreen from './shoppingCartScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const AllFoodStack = createStackNavigator();
const shoppingCartStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const CustomerMainTabScreen = ({navigation}) => (
  <AllFoodStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <AllFoodStack.Screen
      name="All foods"
      component={AllFoodScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#009387"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </AllFoodStack.Navigator>
);

export default CustomerMainTabScreen;

// const AllFoodStackScreen = ({navigation}) => (
//   <AllFoodStack.Navigator
//     screenOptions={{
//       headerStyle: {
//         backgroundColor: '#009387',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     }}>
//     <AllFoodStack.Screen
//       name="All foods"
//       component={AllFoodScreen}
//       options={{
//         headerLeft: () => (
//           <Icon.Button
//             name="ios-menu"
//             size={25}
//             backgroundColor="#009387"
//             onPress={() => navigation.openDrawer()}
//           />
//         ),
//       }}
//     />
//   </AllFoodStack.Navigator>
// );

// const shoppingCartStackScreen = ({navigation}) => (
//   <shoppingCartStack.Navigator
//     screenOptions={{
//       headerStyle: {
//         backgroundColor: '#009387',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     }}>
//     <shoppingCartStack.Screen
//       name="Cart"
//       component={shoppingCartScreen}
//       options={{
//         headerLeft: () => (
//           <Icon.Button
//             name="ios-menu"
//             size={25}
//             backgroundColor="#009387"
//             onPress={() => navigation.openDrawer()}
//           />
//         ),
//       }}
//     />
//   </shoppingCartStack.Navigator>
// );
