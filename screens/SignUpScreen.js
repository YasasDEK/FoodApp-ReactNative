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
import { useTheme } from 'react-native-paper';

const SignInScreen = ({ navigation }) => {

    const { colors } = useTheme();

    const [data, setData] = React.useState({
        email: '',
        password: '',
        mobile: '',
        shopname: '',
        ownername: '',
        confirm_password: '',
        check_password: false,
        check_textInputChange: false,
        check_mobileInputChange: false,
        check_owenernameInputChange: false,
        check_shopnameInputChage: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const signupHandle = (email, password) => {
        if (email === '' && password === '') {
            console.log(email, password);
            Alert.alert('Empty input!');
        } else if (email === '' || password === '') {
            Alert.alert('Empty input!');
        } else if (data.check_mobileInputChange === false) {
            Alert.alert('Error in inputs');
        } else if (data.password !== data.confirm_password) {
            Alert.alert('Password and the confim password does not match!');
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
                console.log('asd ' + result.user.uid);
                var user = firebase.auth().currentUser;

                result.user.updateProfile({displayName: 'shop'});

                firebase.firestore().collection('shops').doc(result.user.uid).set({
                    type: 'shop',
                    shopname: data.shopname,
                    ownername: data.ownername,
                    shopmobile: data.mobile,
                    shopemail: data.email,
                    uid: result.user.uid,
                });
                console.log(user.uid);
                // console.log()

                user.sendEmailVerification().then(() => {
                    Alert.alert('Verification Email sent. Please verify your email!');
                    navigation.goBack();
                }).catch((error) => {
                    Alert.alert(error.message);
                });
            }).catch((error) => {
                Alert.alert(error.message);
            });
        }
    };

    const textInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            });
        }
    };

    const ownernameInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                ownername: val,
                check_owenernameInputChange: true
            });
        } else {
            setData({
                ...data,
                ownername: val,
                check_owenernameInputChange: false
            });
        }
    };

    const mobileInputChange = (val) => {
        if (val.length === 10 && isNaN(val) === false) {
            setData({
                ...data,
                mobile: val,
                check_mobileInputChange: true
            });
        } else {
            setData({
                ...data,
                mobile: val,
                check_mobileInputChange: false
            });
        }
    };

    const shopnameInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                shopname: val,
                check_shopnameInputChage: true
            });
        } else {
            setData({
                ...data,
                shopname: val,
                check_shopnameInputChage: false
            });
        }
    };

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    };

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val,
        });
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
                name="ios-arrow-back"
                size={25}
                backgroundColor="#009387"
                onPress={() => navigation.navigate('SignInScreen')}
            />
                <Text style={styles.text_header}>Register Now!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                <Text style={styles.text_footer}>Shop's name</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="shopping-cart"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Your shop's name"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => shopnameInputChange(val)}
                    />
                    {data.check_shopnameInputChage ?
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
                }]}>Owner's name</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Owner's name"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => ownernameInputChange(val)}
                        />
                        {data.check_owenernameInputChange ?
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
                }]}>Email</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="mail-reply"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your email"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
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

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Mobile number</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="mobile"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your mobile number"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => mobileInputChange(val)}
                        />
                        {data.check_mobileInputChange ?
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
                    }]}>Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Password"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)}
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Confirm Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Confirm Your Password"
                            secureTextEntry={data.confirm_secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleConfirmPasswordChange(val)}
                        />
                        <TouchableOpacity
                            onPress={updateConfirmSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                            By signing up you agree to our
                </Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{' '}Terms of service</Text>
                        <Text style={styles.color_textPrivate}>{' '}and</Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{' '}Privacy policy</Text>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => { signupHandle(data.email, data.password); }}
                        >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, { color: '#fff' }]}>Sign Up</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[styles.signIn, { borderColor: '#009387', borderWidth: 1, marginTop: 15 }]}>
                            <Text style={[styles.textSign, { color: '#009387' }]}>Sign In</Text>
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
