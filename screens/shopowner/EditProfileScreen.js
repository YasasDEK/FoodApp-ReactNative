/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import React from 'react';
import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ProfileImagePicker from './ProfileImagePicker';
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

const EditProfileScreen = (props, { navigation }) => {

  const { colors } = useTheme();

  const [data, setData] = React.useState({
    ownername: '',
    shopname: '',
    shopmobile: '',
    imageuri: '',
    check_ownername: false,
    check_shopname: false,
    check_shopmobile: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const editFoodHandle = (shopowner, shopname, shopmobile) => {
    var user = firebase.auth().currentUser;
    console.log(user);
    console.log('name : ' + user.displayName + 'email : ' + user.email + 'uid : ' + user.uid);
    if (shopowner !== '') {
      firestore().collection('shops').doc(user.uid).update({ ownername: shopowner });
      Alert.alert('update done');
      console.log('done');
    }
    if (shopname !== '') {
      firestore().collection('shops').doc(user.uid).update({ shopname: shopname });
      Alert.alert('update done');
      console.log('done');
    }
    if (shopmobile !== '') {
      firestore().collection('shops').doc(user.uid).update({ shopmobile: shopmobile });
      Alert.alert('update done');
      console.log('done');
    }
    if (shopmobile === '' && shopname === '' && shopowner === '' && data.imageuri === ''){
      Alert.alert('Nothing to update');
    }
    if (data.imageuri) {
      const fileExtension = data.imageuri.split('.').pop();
      console.log('EXT: ' + fileExtension);
      // var uuid = uuidv4();

      const fileName = `${user.uid}.${fileExtension}`;
      console.log(fileName);

      var storageRef = firebase.storage().ref(`shops/images/${fileName}`);

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
            console.log('image upload error: ' + error.toString());
          },
          () => {
            storageRef.getDownloadURL()
              .then((downloadurl) => {
                console.log('File available at: ' + downloadurl);
                firebase.firestore().collection('shops').doc(user.uid).update({ imageuri: downloadurl });
                Alert.alert('New image added successfully');
              });
          }
        );
    }
    // else {
    //   Alert.alert('You must upload an image of this food shop');
    // }
  };

  const setProfileImage = (image) => {
    setData({
      ...data,
      imageuri: image.uri,
    });
    console.log('image uri = ' + image.uri);
    console.log('data.imageuri = ' + data.imageuri);
  };

  const shopnameInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        shopname: val,
        check_shopname: true
      });
    } else {
      setData({
        ...data,
        shopname: val,
        check_shopname: false
      });
    }
  };

  const ownernameInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        ownername: val,
        check_ownername: true
      });
    } else {
      setData({
        ...data,
        ownername: val,
        check_ownername: false
      });
    }
  };

  const mobileInputChange = (val) => {
    if (val.length === 10 && isNaN(val) === false) {
      setData({
        ...data,
        shopmobile: val,
        check_shopmobile: true
      });
    } else {
      setData({
        ...data,
        shopmobile: val,
        check_shopmobile: false
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
        <Icon.Button
          name="ios-menu"
          size={25}
          backgroundColor="#009387"
          // onPress={}
        />
        <Text style={styles.text_header}>
          EDIT USER PROFILE!</Text>
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
          }]}>Change shop name</Text>
          <View style={styles.action}>
            <FontAwesome
              name="shopping-cart"
              color={colors.text}
              size={20}
            />
            <TextInput
              placeholder="shop name"
              placeholderTextColor="#666666"
              style={[styles.textInput, {
                color: colors.text
              }]}
              autoCapitalize="none"
              onChangeText={(val) => shopnameInputChange(val)}
            />
            {data.check_shopname ?
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
          }]}>Change owner name</Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color={colors.text}
              size={20}
            />
            <TextInput
              placeholder="owner name"
              placeholderTextColor="#666666"
              style={[styles.textInput, {
                color: colors.text
              }]}
              autoCapitalize="none"
              onChangeText={(val) => ownernameInputChange(val)}
            />
            {data.check_ownername ?
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
          }]}>Change mobile number</Text>
          <View style={styles.action}>
            <FontAwesome
              name="mobile"
              color={colors.text}
              size={20}
            />
            <TextInput
              placeholder="mobile number"
              placeholderTextColor="#666666"
              style={[styles.textInput, {
                color: colors.text
              }]}
              autoCapitalize="none"
              onChangeText={(val) => mobileInputChange(val)}
            />
            {data.check_shopmobile ?
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
          }]}>Update image</Text>

          {/*for image*/}
          <ProfileImagePicker image={data.image} onImagePicked={setProfileImage} />

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => { editFoodHandle(data.ownername, data.shopname, data.shopmobile); }}
            >
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}
              >
                <Text style={[styles.textSign, { color: '#fff' }]}>Update Profile</Text>
              </LinearGradient>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default EditProfileScreen;

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


