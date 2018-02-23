import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './app/components/LoginScreen/LoginScreen';
import Quiz from './app/components/Quiz/Quiz';
import Grades from './app/components/Grades/Grades';
import RegisterScreen from './app/components/LoginScreen/RegisterScreen';
import HomeScreen from './app/components/HomeScreen/HomeScreen';
import Roster from './app/components/Roster/Roster';

export default class App extends Component {
  state = {
    loggedIn: false,
    user: {
      firstName: '',
      lastName: '',
      email: ''
    }
  }

  render() {

    if(this.state.loggedIn == false) {
      return (
        <LoginRoute screenProps={this.state.user.firstName}/>
        //<Roster/>
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
    },
    Grades: {
      screen: Grades,
    },
    Quiz: {
      screen: Quiz,
    }
});

const HomeRoute = StackNavigator({
  Home: {
    screen: HomeScreen,
  }
});






