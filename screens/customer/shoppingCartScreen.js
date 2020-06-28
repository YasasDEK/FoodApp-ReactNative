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
} from 'react-native';
// import {orderList} from './AllFoodScreen';
import {sendCart, cancelOrder, removeFromCart} from '../shopowner/FoodApi';
import {ListItem, Divider} from 'react-native-elements';

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

  onCartReceived = cartList => {
    this.setState(prevState => ({
      cartList: (prevState.cartList = cartList),
    }));
    console.log(cartList);
  };

  componentDidMount() {
    sendCart(this.onCartReceived);
  }

  render() {
    return this.state.cartList.length > 0 ? (
      <SafeAreaView style={styles.container}>
        {/*<View style={styles.button}>
          <Button
            color="#009387"
            title="confirm order"
            onPress={() => {}}
          />
        </View>*/}
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
                {/*<View style={styles.button2}>
                  <Button
                    color="#009387"
                    title="X"
                    onPress={() => {
                      removeFromCart(`${item.price}`, `${item.foodname}`);
                    }}
                  />
                  </View>*/}
              </View>
            );
          }}
        />
        <View style={styles.button}>
          <Button
            color="#009387"
            title="confirm order"
            // onPress={() => {
            // }}
          />
        </View>
        <View style={styles.button}>
          <Button
            color="grey"
            title="cancel order"
            onPress={() => {
              cancelOrder();
            }}
          />
        </View>
      </SafeAreaView>
    ) : (
      <View style={styles.textContainer}>
        <Text style={styles.emptyTitle}>No Foods found</Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  list: {
    // flexDirection: 'row',
  },
});
