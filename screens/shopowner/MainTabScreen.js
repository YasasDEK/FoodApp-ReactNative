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
import DetailsScreen from './DetailsScreen';
import HomeScreen from '../HomeScreen';
import ProfileScreen from './ProfileScreen';
import AddFoodScreen from './AddFoodScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import EditFoodScreen from './EditFoodScreen';
import EditProfileScreen from './EditProfileScreen';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const EditFoodStack = createStackNavigator();
const EditProfileStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = ({navigation}) => (
  <Tab.Navigator initialRouteName="Feed" activeColor="#ffffff">
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#009387',
        tabBarIcon: ({color}) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Details"
      component={DetailsStackScreen}
      options={{
        tabBarLabel: 'All Foods',
        tabBarColor: '#009387',
        tabBarIcon: ({color}) => (
          <Icon name="ios-restaurant" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Add Food"
      component={AddFoodScreen}
      options={{
        tabBarLabel: 'Add Food',
        tabBarColor: '#009387',
        tabBarIcon: ({color}) => (
          <Icon name="ios-add-circle" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#009387',
        tabBarIcon: ({color}) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
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
  </HomeStack.Navigator>
);

const DetailsStackScreen = ({navigation}) => (
  <DetailsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <DetailsStack.Screen
      name="Details"
      component={DetailsScreen}
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
  </DetailsStack.Navigator>
);

const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
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
  </ProfileStack.Navigator>
);
