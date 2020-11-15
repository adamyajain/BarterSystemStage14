import React, { Component } from 'react';
import {CreateDrawerNavigator} from 'react-navigation-drawer';
import NotificationScreen from '../screens/NotificationScreen';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';

export const AppDrawerNavigator = CreateDrawerNavigator({
    Home : {
        screen : AppTabNavigator
    },
    Notifications : {
        screen : NotificationScreen
    }
},
{
    contentComponent : CustomSideBarMenu
},
{
    initialRouteNmae : 'Home'
})