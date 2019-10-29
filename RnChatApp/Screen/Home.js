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
  Alert,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import User from './User';
export default class HomeScreen extends React.Component {
  state = {
    users: [],
  };

  static navigationOptions = {
    header: null,
  };

  UNSAFE_componentWillMount() {
    let dbref = firebase.database().ref('messages').child(User.phone);
    dbref.on('child_added', val => {
      let person = val.val();
      person.phone = val.key;
      if(person.phone === User.phone)
      {
        User.phone = person.phone
      }
      else {
      this.setState(prevState => {
        return {
          users: [...prevState.users, person],
        };
      });
    }
    });
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
  _renderitem = ({item}) => {
    return (
      <TouchableOpacity style= {{maring:10, borderBottomColor:'gray', borderBottomWidth:1, height:40, justifyContent:'center'}}
      onPress = {() =>{
        this.props.navigation.navigate('Chat',item)
      }}
      >
        <Text style ={{fontSize:20}}>{item.phone}</Text>
      </TouchableOpacity>
    )
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <SafeAreaView>
        <FlatList
          data ={this.state.users}
          renderItem = {this._renderitem}
          keyExtractor ={(item) =>item.phone}
        />

        <TouchableOpacity onPress={this._signOutAsync} style={{justifyContent:'flex-end', paddingTop:200}}>
          <Text>Log out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
