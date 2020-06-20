/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import React from 'react';
import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { AsyncStorage } from '@react-native-community/async-storage';

import { useTheme } from 'react-native-paper';

import { AuthContext } from '../components/context';

import Users from '../model/users';

const MobileVeryScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        mobile: '',
        verificationCode: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidCode: true,
        confirmResult: '',
    });

    const { colors } = useTheme();

    const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if (val.length === 12) {
            setData({
                ...data,
                mobile: val,
                check_textInputChange: true,
                isValidUser: true,
            });
        } else {
            setData({
                ...data,
                mobile: val,
                check_textInputChange: false,
                isValidUser: false,
            });
        }
    };

    const codeInputchange = (val) => {
        if (val.length > 0  ) {
            setData({
                ...data,
                verificationCode: val,
            });
        }
    };

    const handleValidUser = (val) => {
        if (val.trim().length === 12) {
            setData({
                ...data,
                isValidUser: true,
            });
        } else {
            setData({
                ...data,
                isValidUser: false,
            });
        }
    };

    const loginHandle = (mobile) => {
        if (mobile.length === 12) {
            firebase.auth().signInWithPhoneNumber(mobile).then(confirmResult => {
                setData({
                    ...data,
                    confirmResult: confirmResult,
                });
                console.log(confirmResult);
                Alert.alert('Confirmation code sent');
            })
                .catch(error => {
                    Alert.alert(error.message);
                    console.log(error);
                });
        } else {
            Alert.alert('Invalid mobile number');
        }
    };

    const codeHandle = (code) => {
        if (code.length === 6) {
            data.confirmResult.confirm(data.verificationCode).then((result) => {
                var user1 = firebase.auth().currentUser;
                user1.updateProfile({displayName: 'customer'});
                console.log('1 : ' + user1.displayName);
                console.log('1 : ' + user1.phoneNumber);
                firebase.firestore().collection('customers').add({
                    type: 'customer',
                    uid: user1.uid,
                    mobile: user1.phoneNumber,
                });
                const foundUser = user1.phoneNumber;
                signIn(foundUser);
                console.log('done');
            }).catch((error) => {
                Alert.alert(error.message);
            });

        } else {
            Alert.alert('Invalid code');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Verify your mobile number!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <ScrollView>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Mobile number</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            placeholder="Ex: +94772145088"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                        />
                        {data.check_textInputChange ?
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
                    {data.isValidUser ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Mobile number must be 12 characters long.</Text>
                        </Animatable.View>
                    }
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => { loginHandle(data.mobile); }}
                        >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, { color: '#fff' }]}>Send verification Code</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Verification code</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            placeholder="Enter verification code"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => codeInputchange(val)}
                        />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => { codeHandle(data.verificationCode); }}
                        >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, { color: '#fff' }]}>Verify mobile number</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default MobileVeryScreen;

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
    space: {
        marginTop: 10,
    },
    footer: {
        flex: 3,
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
        fontSize: 18,
        marginTop: 40,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 20
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
    }
});
