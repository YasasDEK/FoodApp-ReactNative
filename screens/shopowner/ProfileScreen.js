/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {
  StyleSheet,
  Button,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  TouchableOpacity,
  IconButton,
  Colors,
  Switch,
} from 'react-native-paper';
import {getShop} from './FoodApi';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../../components/context';
import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {ListItem, Divider} from 'react-native-elements';

class ProfileScreen extends Component {
  state = {
    shopList: [],
    selectedIndex: 0,
  };

  // FunctionToOpenSecondActivity = () => {
  //   this.props.navigation.navigate('EditProfileScreen');
  // };

  onshopsReceived = shopList => {
    this.setState(prevState => ({
      shopList: (prevState.shopList = shopList),
    }));
  };

  componentDidMount() {
    getShop(this.onshopsReceived);
  }

  render() {
    return this.state.shopList.length > 0 ? (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.shopList}
          ItemSeparatorComponent={() => (
            <Divider style={{backgroundColor: 'black'}} />
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View style={styles.userInfoSectiom}>
                <View
                  style={{
                    marginLeft: 10,
                    flexDirection: 'row',
                    marginTop: 25,
                  }}>
                  <ListItem
                    leftAvatar={{
                      size: 100,
                      rounded: true,
                      source: {uri: item.imageuri},
                    }}
                  />
                  <View style={{marginLeft: 15, flexDirection: 'column'}}>
                    <Title style={styles.title}>{item.shopname}</Title>
                    <Caption style={styles.caption}>@yasasdek</Caption>
                    <Caption style={styles.caption}>User type : Shop</Caption>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={styles.title2}>Owner</Text>
                  <Caption style={styles.caption2}>{item.ownername}</Caption>
                </View>
                <View style={styles.row}>
                  <Text style={styles.title2}>Mobile</Text>
                  <Caption style={styles.caption2}>{item.shopmobile}</Caption>
                </View>
                <View style={styles.row}>
                  <Text style={styles.title2}>Email</Text>
                  <Caption style={styles.caption2}>{item.shopemail}</Caption>
                </View>
                <View style={styles.row1}>
                  <IconButton
                    style={styles.iconbutton}
                    icon="account-edit"
                    color="#009387"
                    size={40}
                    onPress={() =>
                      this.props.navigation.navigate('EditProfileScreen')
                    }
                  />
                </View>
              </View>
            );
          }}
        />
      </SafeAreaView>
    ) : (
      <View style={styles.textContainer}>
        <Text style={styles.emptySubtitle}>please wait</Text>
      </View>
    );
  }
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    marginTop: 8,
    marginBottom: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 30,
  },
  subtitleStyle: {
    fontSize: 18,
  },
  emptyTitle: {
    fontSize: 32,
    marginBottom: 16,
  },
  emptySubtitle: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSectiom: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 30,
    fontWeight: 'bold',
  },
  title2: {
    fontSize: 20,
    marginLeft: 30,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  caption2: {
    fontSize: 20,
    marginLeft: 50,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  row1: {
    marginTop: 20,
    flexDirection: 'row',
    marginLeft: 250,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  Paragraph: {
    marginTop: 3,
    fontWeight: 'bold',
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  Preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  data: {
    flex: 4,
    width: '90%',
    marginTop: 30,
  },
  iconbutton: {
    marginTop: 30,
  },
});
