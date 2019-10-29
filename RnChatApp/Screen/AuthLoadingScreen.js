import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import User from './User';
import AsyncStorage from '@react-native-community/async-storage';

import  firebase from 'firebase'



export default class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

 UNSAFE_componentWillMount () {
  var firebaseConfig = {
    apiKey: "AIzaSyBMHWpmLrurrTM6YLZj9VjHMDz8A9Xt0Nk",
    authDomain: "rnchatapprentalcar.firebaseapp.com",
    databaseURL: "https://rnchatapprentalcar.firebaseio.com",
    projectId: "rnchatapprentalcar",
    storageBucket: "rnchatapprentalcar.appspot.com",
    messagingSenderId: "970919107663",
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
 }
      // Initialize Firebase
 }
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    User.phone = await AsyncStorage.getItem('UserPhone');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}