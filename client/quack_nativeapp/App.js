import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './app/components/LoginScreen/LoginScreen';
import RegisterScreen from './app/components/LoginScreen/RegisterScreen'




// export default class App extends Component {
//   render() {
    
//     return (
//       //Going straight to login right now for testing
//       <LoginScreen />
//     );
//   }
// }



export default StackNavigator({
    Login: {
      screen: LoginScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
