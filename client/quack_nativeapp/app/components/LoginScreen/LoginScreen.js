import React, { Component } from 'react';
import { View, Image, StatusBar, KeyboardAvoidingView, TouchableOpacity, Text, TextInput, AsyncStorage } from 'react-native';
import styles from './styles';
import LoginForm from './LoginForm';
import { StackNavigator, NavigationActions } from 'react-navigation';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

export default class LoginScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        email: '',
        password: '',
        studentID: ''
    }

    render() {
        
        loginUser = async() => {

            await client.query({ query: gql`
                query user($email: String!) {
                    user( email: $email ) {
                        id
                    }
                }
              `,
              variables: {
                email: this.state.email
               }}).then( data => {
               this.setState({studentID : data.data.user.id.toString()});
              console.log(this.state.studentID);
            }).catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                 // ADD THIS THROW error
                throw error;
            });
            
            await AsyncStorage.setItem('studentID', this.state.studentID);
            await AsyncStorage.setItem('email:key', this.state.email);
            await AsyncStorage.setItem('password', this.state.password);

            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [ NavigationActions.navigate({ routeName: 'Home' })]
              });
              this.props.navigation.dispatch(resetAction);
        }

        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar
                barStyle="light-content"
            />
                <View style={styles.logoContainer}>
                    <Image
                    style={styles.logo} 
                    source={require('../../images/logos_white/quack_logo_xxhdpi.png')}
                    />
                </View>
                
                <View style={styles.formContainer}>
                <View>
            
                    <TextInput 
                        placeholderTextColor='rgba(255,255,255,0.6)'
                        placeholder="Email"
                        keyboardType='email-address'
                        returnKeyType='next'
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholderStyle={styles.input}
                        style={styles.input}
                        onSubmitEditing={() => this.passwordInput.focus()}
                        onChangeText={(email) => this.setState({email})}
                    />
                    <TextInput 
                        secureTextEntry={true}
                        placeholderStyle={styles.input}
                        placeholderTextColor='rgba(255,255,255,0.6)'
                        placeholder="Password"
                        returnKeyType='next'
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={styles.input}
                        ref={(input) => this.passwordInput = input}
                        onChangeText={(password) => this.setState({password})}
                    />

                    <TouchableOpacity style={styles.button} onPress ={() => loginUser()}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                
                
                </View>

                    <TouchableOpacity style={styles.textButton} onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={styles.detailText}>Not registered? </Text>
                        <Text style={styles.signupText}>Sign up now</Text>
                    </TouchableOpacity>

                </View>
                


            </KeyboardAvoidingView>
        );
    }
}

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache()
});