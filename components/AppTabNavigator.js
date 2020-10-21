import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ExchangeScreen from '../screens/ExchangeScreen';
import HomeScreen from '../screens/HomeScreen'



export const AppTabNavigator = createBottomTabNavigator({
  HomeScreen : {
    screen: BookDonateScreen,
    navigationOptions :{
      tabBarLabel : "Home Screen",
    }
  },
  ExchangeScreen: {
    screen: BookRequestScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/request-book.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Exchange Items",
    }
  }
});