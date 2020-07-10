/* eslint-disable no-unused-vars */
import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  Button,
  FlatList,
  SafeAreaView,
  Text,
  View,
  Image,
  IconButton,
} from 'react-native';
import {getFoodsforCustomer, addToCart, sendCart} from '../shopowner/FoodApi';
// import {ModalTester} from './cartScreen';
import {ListItem, Divider} from 'react-native-elements';
import {SearchBar} from 'react-native-elements';
import {add} from 'react-native-reanimated';
// import SwipeUpDown from 'react-native-swipe-up-down';
// import ActionButton from 'react-native-action-button';
// export var orederList = [];
export var count = 0;

class AllFoodScreen extends Component {
  constructor(props, context) {
    super(props, context);
    // ...
  }
  _handlePress() {
    console.log('Pressed!');
  }

  state = {
    foodList: [],
    selectedIndex: 0,
    search: '',
    total: 0,
  };

  updateSearch = search => {
    this.setState({search});
  };

  onFoodAdded = food => {
    this.setState(prevState => ({
      foodList: [...prevState.foodList, food],
    }));
    this.props.navigation.popToTop();
  };

  onFoodsReceived = foodList => {
    this.setState(prevState => ({
      foodList: (prevState.foodList = foodList),
    }));
    console.log('detail');
    console.log(foodList);
  };

  componentDidMount() {
    getFoodsforCustomer(this.onFoodsReceived);
  }

  render() {
    const {search} = this.state;
    return this.state.foodList.length > 0 /*&& search === ''*/ ? (
      <SafeAreaView style={styles.container}>
        {/*<SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />*/}
        <FlatList
          data={this.state.foodList}
          ItemSeparatorComponent={() => (
            <Divider style={{backgroundColor: '#009387'}} />
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View>
                <ListItem
                  style={styles.list}
                  containerStyle={styles.listItem}
                  title={item.foodname}
                  subtitle={`ingredients: ${item.ingredients}`}
                  titleStyle={styles.titleStyle}
                  subtitleStyle={styles.subtitleStyle}
                  leftAvatar={{
                    size: 100,
                    rounded: false,
                    source: {uri: item.imageuri},
                  }}
                />
                <View style={styles.price}>
                  <Text>Price: Rs.{item.price}/=</Text>
                </View>
                <View style={styles.button}>
                  <Button
                    color="#009387"
                    title="Add to Cart"
                    onPress={() => {
                      addToCart(`${item.price}`, `${item.foodname}`);
                    }}
                  />
                </View>
                {/*<IconButton icon="account-edit" color="#009387" size={40} />*/}
              </View>
            );
          }}
        />
        <View style={styles.button1}>
          <Button
            color="#009387"
            title="confirm order"
            onPress={() => {
              // sendCart();
              // ModalTester();
              console.log('test');
              this.props.navigation.navigate('shoppingCartScreen', 'test');
            }}
          />
        </View>
      </SafeAreaView>
    ) : (
      <View>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
        <View style={styles.textContainer}>
          <Text style={styles.emptyTitle}>No Foods found</Text>
        </View>
      </View>
    );
  }
}

export default AllFoodScreen;

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
    marginTop: 300,
  },
  emptySubtitle: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  button: {
    marginLeft: 200,
    marginRight: 20,
    marginBottom: 10,
  },
  button1: {
    // marginLeft: 250,
    // marginRight: 50,
    // marginBottom: 10,
    marginTop: 10,
  },
  price: {
    marginLeft: 250,
    marginRight: 30,
    marginBottom: 10,
  },
  iconbutton: {
    marginTop: 30,
  },
});
