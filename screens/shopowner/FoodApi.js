import firebase from '@react-native-firebase/app';
import {Alert} from 'react-native';
// import {onCartReceived} from '../customer/shoppingCartScreen';
// import Modal from 'react-native-modal';
// import React, {useState} from 'react';
// import {Button, Text, View} from 'react-native';
// import {AsyncStorage} from 'react-native';
// import Modal from 'react-native-modal';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import {EditFoodScreen} from './editFoodScreen';
// import {DetailScreen} from './DetailsScreen';
// import AllFoodScreen from '../customer/AllFoodScreen';
// import React, {Component, useState, useEffect} from 'react';
// import { add, exp } from 'react-native-reanimated';
var orderList = [];

export async function getFoods(foodsRetreived) {
  var foodList = [];
  var user = firebase.auth().currentUser;
  await firebase
    .firestore()
    .collection('foods')
    .where('shopemail', '==', user.email)
    .onSnapshot(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        const foodItem = documentSnapshot.data();
        foodItem.id = documentSnapshot.id;
        if (!foodList.includes(foodItem)) {
          foodList.push(foodItem);
        }
      });
      foodsRetreived(foodList);
      foodList = [];
    });
  foodList = [];
}

export async function getShop(shopsRetreived) {
  var shopList = [];
  var user = firebase.auth().currentUser;
  firebase
    .firestore()
    .collection('shops')
    .where('shopemail', '==', user.email)
    .onSnapshot(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        const shopItem = documentSnapshot.data();
        shopItem.id = documentSnapshot.id;
        if (!shopList.includes(shopItem)) {
          shopList.push(shopItem);
        }
      });
      shopsRetreived(shopList);
      shopList = [];
    });
  shopList = [];
}

export async function getFoodsforCustomer(foodsRetreived) {
  var foodList = [];
  var user = firebase.auth().currentUser;
  await firebase
    .firestore()
    .collection('foods')
    .onSnapshot(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        const foodItem = documentSnapshot.data();
        foodItem.id = documentSnapshot.id;
        if (!foodList.includes(foodItem)) {
          foodList.push(foodItem);
        }
      });
      foodsRetreived(foodList);
      foodList = [];
    });
  foodList = [];
}

export var orderList = [];
export var total = 0;
export var count = 0;

export async function addToCart(price, foodname) {
  var details = {foodname: foodname, price: price};
  orderList.push(details);
  for (var i = count; i < orderList.length; i++) {
    total = total + parseFloat(orderList[i].price);
  }
  count = count + 1;
  console.log(total);
  console.log(orderList);
}

export async function sendCart(cartItems) {
  console.log(orderList);
  await cartItems(orderList);
}

export async function cancelOrder() {
  // orderList = [];
  while (orderList > 0) {
    orderList.pop();
  }
  count = 0;
  total = 0;
  console.log(orderList);
}

export async function deletefood(foodid) {
  console.log(foodid);
  firebase
    .firestore()
    .collection('foods')
    .doc(foodid)
    .delete();
}

export async function confirmOrder() {
  var user = firebase.auth().currentUser;
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  console.log(user.phoneNumber);
  if (orderList.length === 0) {
    Alert.alert('Empty cart');
  } else {
    firebase
      .firestore()
      .collection('orders')
      .add({
        order: orderList,
        user: user.phoneNumber,
        total: total,
        date: today,
      });
    total = 0;
    count = 0;
    while (orderList > 0) {
      orderList.pop();
    }
    Alert.alert('Order placed');
  }
}
