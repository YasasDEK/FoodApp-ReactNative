/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import {DrawerContent} from './screens/shopowner/DrawerContent';

import MainTabScreen from './screens/shopowner/MainTabScreen';
import CustomerMainTabScreen from './screens/customer/CustomerMainTabScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import CompletedOrders from './screens/shopowner/CompletedOrders';
import SupportScreen from './screens/shopowner/SupportScreen';
import AllFoodScreenc from './screens/customer/AllFoodScreen';
import AllShopScreen from './screens/customer/AllShopScreen';
import EditProfileScreen from './screens/shopowner/EditProfileScreen';
import {CustomerDrawerContent} from './screens/customer/CustomerDrawerContent';
import MyOrders from './screens/customer/MyOrders';
import {AuthContext} from './components/context';
import RootStackScreen from './screens/RootStackScreen';
import AsyncStorage from '@react-native-community/async-storage';

const Drawer = createDrawerNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      // case 'CUSTOMERLOGIN':
      //   return {
      //     ...prevState,
      //     userName: action.id,
      //     userToken: action.token,
      //     isLoading: false,
      //   };
      // case 'CUSTOMERLOGOUT':
      //   return {
      //     ...prevState,
      //     userName: null,
      //     userToken: null,
      //     isLoading: false,
      //   };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async foundUser => {
        // setUserToken('fgkj');
        // setIsLoading(false);
        const userToken = String(foundUser);
        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
        console.log('user token: ', userToken);
        // var user = firebase.auth().currentUser;
        // console.log('displayname : ' + user.displayName);
        dispatch({type: 'LOGIN', token: userToken});
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {
        // setUserToken('fgkj');
        // setIsLoading(false);
      },
      // signInCustomer: async foundUser => {
      //   // setUserToken('fgkj');
      //   // setIsLoading(false);
      //   const userToken = String(foundUser);

      //   try {
      //     await AsyncStorage.setItem('userToken', userToken);
      //   } catch (e) {
      //     console.log(e);
      //   }
      //   console.log('user token: ', userToken);
      //   dispatch({type: 'CUSTOMERLOGIN', token: userToken});
      // },
      // signOutCustomer: async () => {
      //   // setUserToken(null);
      //   // setIsLoading(false);
      //   try {
      //     await AsyncStorage.removeItem('userToken');
      //   } catch (e) {
      //     console.log(e);
      //   }
      //   dispatch({type: 'CUSTOMERLOGOUT'});
      // },
      toggleTheme: () => {
        setIsDarkTheme(isDarkTheme => !isDarkTheme);
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  var user = firebase.auth().currentUser;
  console.log('displayname : ' + user.displayName);
  if (user.displayName === 'shop') {
    return (
      <PaperProvider theme={theme}>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer theme={theme}>
            {loginState.userToken !== null ? (
              <Drawer.Navigator
                drawerContent={props => <DrawerContent {...props} />}>
                <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
                <Drawer.Screen name="SupportScreen" component={SupportScreen} />
                <Drawer.Screen name="AboutUsScreen" component={AboutUsScreen} />
                <Drawer.Screen
                  name="EditProfileScreen"
                  component={EditProfileScreen}
                />
                <Drawer.Screen
                  name="CompletedOrders"
                  component={CompletedOrders}
                />
              </Drawer.Navigator>
            ) : (
              <RootStackScreen />
            )}
          </NavigationContainer>
        </AuthContext.Provider>
      </PaperProvider>
    );
  } else {
    return (
      <PaperProvider theme={theme}>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer theme={theme}>
            {loginState.userToken !== null ? (
              <Drawer.Navigator
                drawerContent={props => <CustomerDrawerContent {...props} />}>
                <Drawer.Screen
                  name="CustomerHomeDrawer"
                  component={CustomerMainTabScreen}
                />
                <Drawer.Screen name="MyOrders" component={MyOrders} />
                <Drawer.Screen name="AboutUsScreen" component={AboutUsScreen} />
              </Drawer.Navigator>
            ) : (
              <RootStackScreen />
            )}
          </NavigationContainer>
        </AuthContext.Provider>
      </PaperProvider>
    );
  }
};

export default App;
