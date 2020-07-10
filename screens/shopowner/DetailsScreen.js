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
import {getFoods} from './FoodApi';
import {ListItem, Divider} from 'react-native-elements';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {deletefood} from './FoodApi';
// import ActionButton from 'react-native-action-button';

class DetailsScreen extends Component {
  state = {
    foodList: [],
    selectedIndex: 0,
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
    getFoods(this.onFoodsReceived);
  }

  render() {
    return this.state.foodList.length > 0 ? (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.foodList}
          ItemSeparatorComponent={() => (
            <Divider style={{backgroundColor: 'black'}} />
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View>
                <ListItem
                  containerStyle={styles.listItem}
                  title={item.foodname}
                  subtitle={`ingredients: ${item.ingredients}`}
                  titleStyle={styles.titleStyle}
                  subtitleStyle={styles.subtitleStyle}
                  leftAvatar={{
                    size: 'large',
                    rounded: false,
                    source: {uri: item.imageuri},
                  }}
                />
                <View style={styles.buttonfield}>
                  <View style={styles.button}>
                    <Button
                      color="#009387"
                      title="  Edit food  "
                      onPress={() =>
                        this.props.navigation.navigate('EditFoodScreen', {
                          foodid: item.foodid,
                        })
                      }
                    />
                  </View>
                  <View style={styles.buttons}>
                    <Button
                      color="#d42828"
                      title="Delete food"
                      onPress={() => {
                        deletefood(`${item.foodid}`);
                      }}
                    />
                  </View>
                </View>
              </View>
            );
          }}
        />
      </SafeAreaView>
    ) : (
      <View style={styles.textContainer}>
        <Text style={styles.emptyTitle}>No Foods found</Text>
        <Text style={styles.emptySubtitle}>
          Add a new food using the + button below
        </Text>
      </View>
    );
  }
}

export default DetailsScreen;

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
  button: {
    marginLeft: 180,
    // marginRight: 50,
    marginBottom: 10,
  },
  buttons: {
    marginLeft: 20,
    marginRight: 100,
    marginBottom: 10,
  },
  buttonfield: {
    flexDirection: 'row',
  },
});
