/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import React from 'react';
import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import FoodImagePicker from './FoodImagePicker';
// import { withFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'react-native-paper';

const AddFoodScreen = (props, { navigation }) => {

  const { colors } = useTheme();

  const [data, setData] = React.useState({
    foodname: '',
    imageuri: '',
    image: '',
    price: '',
    ingredients: '',
    tagname: '',
    check_foodname: false,
    check_ingredients: false,
    check_tagname: false,
    check_price: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const addFoodHandle = (foodname, ingredients, tagname, price) => {
    if (foodname === '' || ingredients === '' || tagname === '' || price === '') {
      Alert.alert('Error in inputs');
    } else if (data.check_price === false) {
      Alert.alert('Error in inputs');
    }
    else if (foodname === '' && ingredients === '' && tagname === '' && price === '') {
      Alert.alert('Error in inputs');
    } else {
      console.log(data.imageuri);
      if (data.imageuri) {
        const fileExtension = data.imageuri.split('.').pop();
        console.log('EXT: ' + fileExtension);
        // var uuid = uuidv4();
        var user = firebase.auth().currentUser;
        const fileName = `${user.uid}.${data.foodname}.${fileExtension}`;
        console.log(fileName);

        var storageRef = firebase.storage().ref(`foods/images/${fileName}`);

        storageRef.putFile(data.imageuri)
          .on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            snapshot => {
              console.log('snapshot: ' + snapshot.state);
              console.log('progress: ' + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

              if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                console.log('Success');
              }
            },
            error => {
              // unsubscribe();
              console.log('image upload error: ' + error.toString());
            },
            () => {
              storageRef.getDownloadURL()
              .then((downloadurl) => {
                console.log('File available at: ' + downloadurl);
                var user = firebase.auth().currentUser;
                console.log(user.email);
                firebase.firestore().collection('foods').add({
                  type: 'shop',
                  price: data.price,
                  foodname: data.foodname,
                  ingredients: data.ingredients,
                  tagname: data.tagname,
                  shopemail: user.email,
                  imageuri: downloadurl
                });
                Alert.alert('New food added successfully');
              });
            }
          );
      } else {
        Alert.alert('You must upload an image of this food');
      }
    }
  };

  const setFoodImage = (image) => {
    setData({
      ...data,
      imageuri: image.uri,
    });
    console.log('image uri = ' + image.uri);
    console.log('data.imageuri = ' + data.imageuri);
  };

  const foodnameInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        foodname: val,
        check_foodname: true
      });
    } else {
      setData({
        ...data,
        foodname: val,
        check_foodname: false
      });
    }
  };

  const ingredientsInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        ingredients: val,
        check_ingredients: true
      });
    } else {
      setData({
        ...data,
        ingredients: val,
        check_ingredients: false
      });
    }
  };

  const priceInputChange = (val) => {
    if (val.length !== 0 && isNaN(val) === false) {
      setData({
        ...data,
        price: val,
        check_price: true
      });
    } else {
      setData({
        ...data,
        price: val,
        check_price: false
      });
    }
  };

  const tagnameInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        tagname: val,
        check_tagname: true
      });
    } else {
      setData({
        ...data,
        tagname: val,
        check_tagname: false
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>ADD A NEW FOOD ITEM!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, {
          backgroundColor: colors.background
        }]}
      >
        <ScrollView>
          <Text style={[styles.text_footer, {
            color: colors.text,
          }]}>Name of the food</Text>
          <View style={styles.action}>
            <FontAwesome
              name="shopping-cart"
              color={colors.text}
              size={20}
            />
            <TextInput
              placeholder="Ex: pizza"
              placeholderTextColor="#666666"
              style={[styles.textInput, {
                color: colors.text
            }]}
              autoCapitalize="none"
              onChangeText={(val) => foodnameInputChange(val)}
            />
            {data.check_foodname ?
              <Animatable.View
                animation="bounceIn"
              >
                <Feather
                  name="check-circle"
                  color="green"
                  size={20}
                />
              </Animatable.View>
              : null}
          </View>

          <Text style={[styles.text_footer, {
            marginTop: 35,
            color: colors.text
          }]}>Ingredients</Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color={colors.text}
              size={20}
            />
            <TextInput
              placeholder="Ex: flour, oil, salt etc "
              placeholderTextColor="#666666"
              style={[styles.textInput, {
                color: colors.text
            }]}
              autoCapitalize="none"
              onChangeText={(val) => ingredientsInputChange(val)}
            />
            {data.check_ingredients ?
              <Animatable.View
                animation="bounceIn"
              >
                <Feather
                  name="check-circle"
                  color={'green'}
                  size={20}
                />
              </Animatable.View>
              : null}
          </View>

          <Text style={[styles.text_footer, {
            color: colors.text,
            marginTop: 35
          }]}>Price (LKR)</Text>
          <View style={styles.action}>
            <FontAwesome
              name="database"
              color={colors.text}
              size={20}
            />
            <TextInput
              placeholder="Ex: flour, oil, salt etc "
              placeholderTextColor="#666666"
              style={[styles.textInput, {
                color: colors.text
            }]}
              autoCapitalize="none"
              onChangeText={(val) => priceInputChange(val)}
            />
            {data.check_price ?
              <Animatable.View
                animation="bounceIn"
              >
                <Feather
                  name="check-circle"
                  color="green"
                  size={20}
                />
              </Animatable.View>
              : null}
          </View>

          <Text style={[styles.text_footer, {
            color: colors.text,
            marginTop: 35
          }]}>Tag name</Text>
          <View style={styles.action}>
            <FontAwesome
              name="mail-reply"
              color={colors.text}
              size={20}
            />
            <TextInput
              placeholder="Ex: pizza"
              placeholderTextColor="#666666"
              style={[styles.textInput, {
                color: colors.text
            }]}
              autoCapitalize="none"
              onChangeText={(val) => tagnameInputChange(val)}
            />
            {data.check_tagname ?
              <Animatable.View
                animation="bounceIn"
              >
                <Feather
                  name="check-circle"
                  color="green"
                  size={20}
                />
              </Animatable.View>
              : null}
          </View>

          <Text style={[styles.text_footer, {
            color: colors.text,
            marginTop: 35
          }]}>Add image</Text>

          {/*for image*/}
          <FoodImagePicker image={data.image} onImagePicked={setFoodImage} />

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => { addFoodHandle(data.foodname, data.ingredients, data.tagname, data.price); }}
            >
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}
              >
                <Text style={[styles.textSign, { color: '#fff' }]}>Add Food</Text>
              </LinearGradient>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default AddFoodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20
  },
  color_textPrivate: {
    color: 'grey'
  }
});


