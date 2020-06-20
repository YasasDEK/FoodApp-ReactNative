import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export async function getFoods(foodsRetreived) {
  var foodList = [];
  var user = firebase.auth().currentUser;
  var snapshot = await firebase
    .firestore()
    .collection('foods')
    .where('shopemail', '==', user.email)
    .get();
  console.log(snapshot);
  snapshot.forEach(doc => {
    const foodItem = doc.data();
    foodItem.id = doc.id;
    foodList.push(foodItem);
  });
  console.log(foodList);
  foodsRetreived(foodList);
}

export async function getShop(shopsRetreived) {
  var shopList = [];
  var user = firebase.auth().currentUser;
  var snapshot = await firebase
    .firestore()
    .collection('shops')
    .where('shopemail', '==', user.email)
    .get();

  snapshot.forEach(doc => {
    const shopItem = doc.data();
    shopItem.id = doc.id;
    shopList.push(shopItem);
  });

  shopsRetreived(shopList);
}
