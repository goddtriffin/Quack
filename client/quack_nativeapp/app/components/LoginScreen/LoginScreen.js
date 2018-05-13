import React, { Component } from 'react';
import { View, Image, StatusBar, KeyboardAvoidingView, TouchableOpacity, Text, TextInput, AsyncStorage } from 'react-native';
import styles from './styles';
import LoginForm from './LoginForm';
import { StackNavigator, NavigationActions } from 'react-navigation';

import { ApolloProvider, graphql, withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

class LoginScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        email: '',
    }

    render() {
        loginUser = async() => {
            await this.props.client.mutate({
                mutation: gql`mutation login($email: String!, $password: String!) {
                    login( email: $email, password: $password) {
                        id
                        jwt
                    }
                }`,
                variables: {
                    email: this.state.email,
                    password: this.state.password,
                },
            }).then( data => {
                this.setState({studentID : data.data.login.id.toString()}); 
                this.setState({authToken : data.data.login.jwt.toString()});
            }).catch(function(error) { 
                alert(error.message);
                throw error; 
            });
            
            await AsyncStorage.setItem('studentID', this.state.studentID); 
            await AsyncStorage.setItem('email:key', this.state.email); 
            await AsyncStorage.setItem('auth-token', this.state.authToken); 

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
                            onSubmitEditing = {() => loginUser()}
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

export default withApollo(LoginScreen)