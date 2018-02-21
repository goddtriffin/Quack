import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './app/components/LoginScreen/LoginScreen';
import RegisterScreen from './app/components/LoginScreen/RegisterScreen';
import HomeScreen from './app/components/HomeScreen/HomeScreen';




export default class App extends Component {
  state = {
    loggedIn: false,
  }
  render() {
    if(this.state.loggedIn == false) {
      return (
        <LoginRoute/>
      );
    }else {
      return (
        <HomeRoute />
      );
    }
    
  }
}


const LoginRoute = StackNavigator({
    Login: {
      screen: LoginScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
    Home: {
      screen: HomeScreen,
    }
});

const HomeRoute = StackNavigator({
  Home: {
    screen: HomeScreen,
  }
});



