/* eslint-disable no-unused-vars */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';

const SplashScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('../images/logo.jpg')}
          style={styles.logo}
          resizeMode="stretch"
        />
        <Text style={styles.title}>LAVA FOODS</Text>
      </View>
      <Animatable.View
        style={[styles.footer, {backgroundColor: '#fff'}]}
        animation="fadeInUpBig">
        <View style={styles.views}>
          <View style={styles.views2}>
            <Text style={styles.title2}>Eat & Sell</Text>
            <Text style={styles.text}>Sign in with account</Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => navigation.navigate('NavScreen')}>
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}>
                <Text style={styles.textSign}>Get Started</Text>
                <MaterialIcons name="navigate-next" color="#fff" size={20} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  title2: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
    fontSize: 20,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    marginLeft: 20,
    // marginBottom: 2000,
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
  views: {
    flexDirection: 'row',
    marginTop: 40,
  },
  views2: {
    flexDirection: 'column',
    marginTop: 20,
  },
});
