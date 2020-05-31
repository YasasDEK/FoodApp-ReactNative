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
// import ActionButton from 'react-native-action-button';

class DetailsScreen extends Component {
  state = {
    foodList: [],
    selectedIndex: 0,
  };

  // onFoodAdded = food => {
  //   this.setState(prevState => ({
  //     foodList: [...prevState.foodList, food],
  //   }));
  //   this.props.navigation.popToTop();
  // };

  // onFoodDeleted = () => {
  //   var newFoodList = [...this.state.foodList];
  //   newFoodList.splice(this.state.selectedIndex, 1);

  //   this.setState(prevState => ({
  //     foodList: (prevState.foodList = newFoodList),
  //   }));

  //   this.props.navigation.popToTop();
  // };

  onFoodsReceived = foodList => {
    this.setState(prevState => ({
      foodList: (prevState.foodList = foodList),
    }));
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
                // onPress={() => {
                //   this.setState(prevState => ({
                //     selectedIndex: (prevState.selectedIndex = index),
                //   }));
                //   this.props.navigation.navigate('FoodDetail', {
                //     food: item,
                //     foodDeletedCallback: this.onFoodDeleted,
                //   });
                // }}
              />
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
});
