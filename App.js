import React from 'react';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignUpLoginScreen from './screens/SignUpLoginScreen';
import { AppDrawerNavigator } from './components/AppDrawerNavigator'

export default function App() {
  return (
    <AppContainer/>
  );
}


const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: SignUpLoginScreen},
  BottomTab:{screen: AppDrawerNavigator}
})

const AppContainer =  createAppContainer(switchNavigator);
