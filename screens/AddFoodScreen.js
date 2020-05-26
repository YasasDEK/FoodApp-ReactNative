/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import React from 'react';
import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
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

const SignInScreen = ({ navigation }) => {

  const [data, setData] = React.useState({
    foodname: '',
    ingredients: '',
    tagname: '',
    check_foodname: false,
    check_ingredients: false,
    check_tagname: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const addFoodHandle = (foodname, ingredients, tagname) => {
        var user = firebase.auth().currentUser;
        console.log(user);
        firebase.firestore().collection('foods').add({
          type: 'shop',
          foodname: data.foodname,
          ingredients: data.ingredients,
          tagname: data.tagname,
          shopemail: user,
        });
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
        style={styles.footer}
      >
        <ScrollView>
          <Text style={styles.text_footer}>Name of the food</Text>
          <View style={styles.action}>
            <FontAwesome
              name="shopping-cart"
              color="#05375a"
              size={20}
            />
            <TextInput
              placeholder="Ex: pizza"
              style={styles.textInput}
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
            marginTop: 35
          }]}>Ingredients</Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#05375a"
              size={20}
            />
            <TextInput
              placeholder="Ex: flour, oil, salt etc "
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => ingredientsInputChange(val)}
            />
            {data.check_ingredients ?
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
            marginTop: 35
          }]}>Tag name</Text>
          <View style={styles.action}>
            <FontAwesome
              name="mail-reply"
              color="#05375a"
              size={20}
            />
            <TextInput
              placeholder="Ex: pizza"
              style={styles.textInput}
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
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => { addFoodHandle(data.foodname, data.ingredients, data.tagname); }}
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

export default SignInScreen;

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
