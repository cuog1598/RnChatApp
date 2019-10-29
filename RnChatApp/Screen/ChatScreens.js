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
  Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import User from './User';
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            person : {
                name: props.navigation.getParam('name'),
                phone : props.navigation.getParam('phone'),
            },
            message : '',
            messageList : [],

        }
    }


  static navigationOptions =({navigation}) => {
    return{
        title : navigation.getParam('name', null)
    }
  };


  UNSAFE_componentWillMount () {
    firebase.database().ref('messages').child(User.phone).child(this.state.person.phone)
    .on('child_added', (value) =>{
      this.setState(prevState => {
          return {
              messageList: [...prevState.messageList, value.val()],
          }
        })
    })
  }
  _senmesssage = async () => {
      if(this.state.message.length  > 0)
      {
          let msgId =  firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).push().key;
          let update = {};
          let message = {
            message : this.state.message,
            time : firebase.database.ServerValue.TIMESTAMP,
            from : User.phone,
            name : User.name
          }
          update['messages/'+User.phone+'/'+this.state.person.phone+ '/' + msgId] =message;
          update['messages/'+this.state.person.phone+'/'+User.phone+ '/' + msgId] =message;
          firebase.database().ref().update(update);
          this.setState({message:''});
      }
  } 
 

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
  _renderitem = ({item}) => {
    return (
      <View style={{
          flexDirection:'row',
          width : '60%',
          alignSelf : item.from === User.phone  ? "flex-end" : 'flex-start',
          backgroundColor : item.from === User.phone ? "#00897b" : '#7cb342',
          borderRadius:5,
          marginBottom:10
      }}>
          <Text style={{color:'#fff', padding : 7, fontSize:16}}>{item.message}</Text>
          <Text style={{color:'#eee', padding : 3, fontSize:12}}>{item.time}</Text>
          
      </View>

    )
  }
  handelchange = key =>val  => {
    this.setState ({[key]: val})
  }
  render() {
      let {height, width} =Dimensions.get('window');
    const {navigate} = this.props.navigation;
    return (
      <SafeAreaView>
        <FlatList
        style= {{padding:10, height : height*0.8}}
        data = {this.state.messageList}
        renderItem = {this._renderitem}
        keyExtractor ={(item,index) =>index.toString()}
        />
    
    <View>
   
        <View style={{flexDirection:'row'}}>
        <TextInput 
        style={styles.input} 
        placeholder=""
        value= {this.state.message}
        keyboardType = "email-address"
        onChangeText={this.handelchange('message')}
        />
        <TouchableOpacity
            onPress ={this._senmesssage}
        >
            <Text style={{color:'blue', fontSize:22, padding : 10}}>Send</Text></TouchableOpacity>
        </View>
    </View>
      </SafeAreaView>
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
      paddingLeft: 10,
      marginBottom:10,
      borderWidth: 1,
      borderColor: '#ccc',
      width: '80%',
      borderRadius:12
    },
  });