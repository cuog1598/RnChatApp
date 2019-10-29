/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import HomeScreen from './Screen/Home'
import SignInScreen from './Screen/Login'
import AuthLoadingScreen from './Screen/AuthLoadingScreen'
import ChatScreen from  './Screen/ChatScreens'

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';



const AppStack = createStackNavigator({ Home: HomeScreen,Chat: ChatScreen});
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(
  createStackNavigator(
    {
      App:{
        screen: AppStack, navigationOptions: {
           header : null
        }
    },

      AuthLoading: AuthLoadingScreen,
   
      Auth: AuthStack,
      
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);