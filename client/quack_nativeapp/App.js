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
import PastQuiz from './app/components/PastQuiz/PastQuiz';
import WriteQuiz from './app/components/WriteQuiz/WriteQuiz';

import { ApolloClient, createNetworkInterface ,ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:4000/graphql'}),
})

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
    

    console.disableYellowBox = true;

    if(this.state.loggedIn == false) {
      return (
        <ApolloProvider client={client}>
          <LoginRoute screenProps={this.state.user.firstName}/>
        </ApolloProvider>
      );
    }else {
      return (
        <ApolloProvider client={client}>
          <HomeRoute />
        </ApolloProvider>
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
    },
    PastQuiz: {
      screen: PastQuiz
    },
    WriteQuiz: {
      screen: WriteQuiz
    },
    Roster: {
      screen: Roster,
    }
});

const HomeRoute = StackNavigator({
  Home: {
    screen: HomeScreen,
  }
});






