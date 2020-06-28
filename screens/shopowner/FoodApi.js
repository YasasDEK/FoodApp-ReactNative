import firebase from '@react-native-firebase/app';
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

export async function addToCart(price, foodname) {
  var details = {foodname: foodname, price: price};
  orderList.push(details);
  console.log(orderList);
}

export async function sendCart(cartItems) {
  cartItems(orderList);
}

export async function sendCart2() {
  console.log('hel');
}

export async function cancelOrder() {
  orderList = [];
}

export async function removeFromCart() {
  orderList.splice(x, 1);
}
