import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './app/components/LoginScreen/LoginScreen';
import Quiz from './app/components/Quiz/Quiz';
import Grades from './app/components/Grades/Grades';
import RegisterScreen from './app/components/LoginScreen/RegisterScreen';
import HomeScreen from './app/components/HomeScreen/HomeScreen';
import Roster from './app/components/Roster/Roster';
import PastQuiz from './app/components/PastQuiz/PastQuiz';
import WriteQuiz from './app/components/WriteQuiz/WriteQuiz';
import CourseDetails from './app/components/CourseDetails/CourseDetails';
import LoginForm from './app/components/LoginScreen/LoginForm';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AsyncStorage } from 'react-native';
import gql from 'graphql-tag';


const httpLink = createHttpLink({
  uri: 'http://endor-vm2.cs.purdue.edu:4000/graphql',
});


/*const middlewareLink = new ApolloLink((operation, forward) => {
    console.log(this.state.authToken);
    if (this.state.authToken) {
    operation.setContext({
      headers: {
        authorization: this.state.authToken
      }
    });
  }
  console.log(operation.getContext());
  return forward(operation);
})*/
let token;

const withToken = setContext(operation => 
  AsyncStorage.getItem('auth-token').then(userToken => {
    return { 
      headers: {
        authorization : userToken || null
      },
    };
  })
);

const client = new ApolloClient({
  link: withToken.concat(httpLink),
  cache: new InMemoryCache()
});

export default class App extends Component {
  state = {
    authToken: '',
    loggedIn: false,
    user: {
      firstName: '',
      lastName: '',
      email: '',
    }
  }
  

  render() {
    
    console.disableYellowBox = true;

    /*
    return (
      <Grades/>
    )
    */

    
    if(!this.state.authToken) {
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
      navigationOptions: {
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#07A386'
        }
      }
    },
    Quiz: {
      screen: Quiz,
    },
    PastQuiz: {
      screen: PastQuiz,
    },
    WriteQuiz: {
      screen: WriteQuiz,
    },
    CourseDetails: {
      screen: CourseDetails,
    },
});

const HomeRoute = StackNavigator({
  Home: {
    screen: HomeScreen,
  }
});