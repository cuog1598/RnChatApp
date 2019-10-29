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
import firebase from 'firebase';
import User from './User'
export default class App extends React.Component {
  state = {
    phone: '',
    name: '',
  };

  handelchange = key =>val  => {
    this.setState ({[key]: val})
  }

  static navigationOptions = {
    header : null
  };
 
  submit = async () => {
    if(this.state.name.length <3 )
    {
      Alert.alert ("error" , " wrong name")
    }
    else if(this.state.phone.length <3 )
    {
      Alert.alert ("error","wrong phone")
    }
    else 
    {
      await AsyncStorage.setItem("UserPhone", this.state.phone);
      await AsyncStorage.setItem("UserName", this.state.name);
      User.name = this.state.name;
      User.phone = this.state.phone;
      firebase.database().ref('users/'+User.phone).set({name:this.state.name});
      this.props.navigation.navigate('App');

    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput 
        style={styles.input} 
        placeholder="Enter phone"
        value= {this.state.phone}
        keyboardType = "phone-pad"
        onChangeText={this.handelchange('phone')}
        />
        <TextInput style={styles.input} placeholder="Enter name"
         value= {this.state.name}
         onChangeText={this.handelchange('name')}
        />

        <TouchableOpacity onPress = {this.submit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    marginBottom:10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '90%',
  },
});
