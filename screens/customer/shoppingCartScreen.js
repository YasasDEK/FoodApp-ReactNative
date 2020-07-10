import React, {Component} from 'react';
import {
  StyleSheet,
  Button,
  FlatList,
  SafeAreaView,
  Text,
  View,
  Image,
  IconButton,
  Alert,
} from 'react-native';
// import {orderList} from './AllFoodScreen';
import {
  sendCart,
  cancelOrder,
  removeFromCart,
  total,
  confirmOrder,
} from '../shopowner/FoodApi';
import {ListItem, Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
// import {AsyncStorage} from 'react-native';

export default class shoppingCartScreen extends Component {
  coshoppingCartScreennstructor(props) {
    // super(props);
    // console.log(this.props);
    console.log('hello');
  }

  state = {
    cartList: [],
    selectedIndex: 0,
    total: 0,
  };

  onCartReceived = orderList => {
    this.setState(prevState => ({
      cartList: (prevState.cartList = orderList),
    }));
  };

  UNSAFE_componentWillMount() {
    sendCart(this.onCartReceived);
  }

  render() {
    return this.state.cartList.length > 0 ? (
      <SafeAreaView style={styles.container}>
        <Icon.Button
          name="ios-arrow-back"
          size={25}
          backgroundColor="#009387"
          onPress={() => this.props.navigation.navigate('CustomerHomeDrawer')}
        />
        <Text style={styles.emptyTitle2}>CART ITEMS</Text>
        <FlatList
          data={this.state.cartList}
          ItemSeparatorComponent={() => (
            <Divider style={{backgroundColor: 'white'}} />
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View>
                <ListItem
                  style={styles.list}
                  containerStyle={styles.listItem}
                  title={item.foodname}
                  subtitle={`price: Rs.${item.price}/=`}
                  titleStyle={styles.titleStyle}
                  subtitleStyle={styles.subtitleStyle}
                />
              </View>
            );
          }}
        />
        <View style={styles.button}>
          <View style={styles.price2}>
            <Text>Total: Rs.{total}/=</Text>
          </View>
          <Button
            color="#009387"
            title="confirm order"
            onPress={() => {
              confirmOrder();
              while (this.state.cartList.length > 0) {
                this.state.cartList.pop();
              }
              this.props.navigation.navigate('CustomerHomeDrawer');
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            color="grey"
            title="cancel order"
            onPress={() => {
              cancelOrder();
              while (this.state.cartList.length > 0) {
                this.state.cartList.pop();
              }
              console.log(this.state.cartList);
              Alert.alert('Order cancelled');
              this.props.navigation.navigate('CustomerHomeDrawer');
            }}
          />
        </View>
      </SafeAreaView>
    ) : (
      <View>
        <View>
          <Icon.Button
            name="ios-arrow-back"
            size={25}
            backgroundColor="#009387"
            onPress={() => this.props.navigation.navigate('CustomerHomeDrawer')}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.emptyTitle}>No Food items</Text>
          <Text style={styles.emptyTitle}>added to the cart yet</Text>
          <Icon.Button name="ios-cart" size={50} backgroundColor="#009387" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    marginTop: 1,
    marginBottom: 1,
  },
  textContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  titleStyle: {
    fontSize: 20,
  },
  subtitleStyle: {
    fontSize: 15,
  },
  emptyTitle: {
    fontSize: 32,
    marginBottom: 16,
  },
  emptyTitle2: {
    fontSize: 32,
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 10,
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
  button2: {
    marginLeft: 350,
    marginRight: 20,
    marginBottom: 10,
  },
  price: {
    marginLeft: 260,
    marginBottom: 10,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  price2: {
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 10,
  },
  list: {
    // flexDirection: 'row',
  },
});
