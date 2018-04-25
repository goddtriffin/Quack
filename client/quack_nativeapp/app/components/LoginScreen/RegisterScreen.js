import React, { Component } from 'react';
import { View, Image, StatusBar, KeyboardAvoidingView, TouchableOpacity, Text, TextInput, Keyboard, SegmentedControlIOS, AsyncStorage, Platform } from 'react-native';
import styles from './styles';
import { colors } from '../../style/styles';
import { StackNagivator } from 'react-navigation'

import { ApolloProvider, createNetworkInterface} from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

class RegisterScreen extends Component {    

    static navigationOptions = {
        headerStyle: { backgroundColor: colors.qDarkGreen },
        title: 'Register',
        headerTitleStyle: {fontFamily: 'Fira Sans',
        fontWeight: '700',
        fontSize: 20,
        color: 'white',
        textAlign: 'left'},
        headerTintColor: 'white',
        headerBackTitle: 'Back',
    };

    state = {
        fullName: '',
        email: '',
        studentID: '',
        password: '',
        passwordConfirmed: '',
        authToken: '',
    }
    

    render() {

        registerUser = async() => {

            if(this.state.fullName != '' && this.state.email != '' && this.state.password == this.state.passwordConfirmed) {
                client.mutate({ mutation: gql`
                mutation userCreate($input: UserInput, $password: String!) {
                  userCreate(input: $input, password: $password) {
                    id
                    jwt
                  }
                }
              `,
              variables: {
                input : {
                    firstName: this.state.fullName.split(" ")[0],
                    lastName: this.state.fullName.split(" ")[1],
                    email: this.state.email,
                },
                password: this.state.password,
               }}).then( data => {
               this.state.studentID = data.data.userCreate.id;
               this.state.authToken = data.data.userCreate.jwt;
            }).catch(function(error) {
                alert(error.message);
                throw error;
            });


            await AsyncStorage.setItem('email:key', this.state.email);
            await AsyncStorage.setItem('password', this.state.password);
            await AsyncStorage.setItem('passwordConfirmed', this.state.passwordConfirmed);
            await AsyncStorage.setItem('fullName', this.state.fullName);
            await AsyncStorage.setItem('authToken', this.state.authToken);
            console.log(this.state.fullName.split(" ")[0])
            console.log(this.state.fullName.split(" ")[1])
            console.log(this.state.email)
            console.log(this.state.password)

            
            this.props.navigation.navigate('Home');

            }else if (this.state.password != this.state.passwordConfirmed){
                alert("Passwords do not match.")
            }
            else{
                alert("Please enter something in every field.");
            }
            
        }

        return (
            <View style={styles.container}>
                <KeyboardAvoidingView behavior='height' style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                />
                    <View style={styles.header}>
                        <Text style={styles.bigHeaderText}>Create an account</Text>    
                    </View>

                    
                    
                    <View style={styles.formContainer}>
                        <View>
                            <TextInput 
                                placeholderTextColor='rgba(255,255,255,0.6)'
                                placeholder="Full Name"
                                returnKeyType='next'
                                autoCapitalize='none'
                                autoCorrect={false}
                                placeholderStyle={styles.input}
                                style={styles.input}
                                ref={(input) => this.fullNameInput = input}
                                onSubmitEditing={() => this.emailInput.focus()}
                                onChangeText={(fullName) => this.setState({fullName})}
                                
                            />
                            <TextInput 
                                placeholderTextColor='rgba(255,255,255,0.6)'
                                placeholder="Email"
                                keyboardType='email-address'
                                returnKeyType='next'
                                autoCapitalize='none'
                                autoCorrect={false}
                                placeholderStyle={styles.input}
                                style={styles.input}
                                ref={(input) => this.emailInput = input}
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
                                onSubmitEditing={() => this.passwordConfirmedInput.focus()}
                                onChangeText={(password) => this.setState({password})}
                            />
                            <TextInput 
                                secureTextEntry={true}
                                placeholderStyle={styles.input}
                                placeholderTextColor='rgba(255,255,255,0.6)'
                                placeholder="Confirm Password"
                                returnKeyType='next'
                                autoCapitalize='none'
                                autoCorrect={false}
                                style={styles.input}
                                onSubmitEditing={Keyboard.dismiss}
                                ref={(input) => this.passwordConfirmedInput = input}
                                onChangeText={(passwordConfirmed) => this.setState({passwordConfirmed})}
                            />
                            
                        </View>

                    </View>
                </KeyboardAvoidingView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress ={() => registerUser()}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

          </View>      
        );
    }
}

//const link = new HttpLink({ uri: 'https://quack.localtunnel.me/graphql' });
const client = new ApolloClient({
   link: new HttpLink({ uri: 'https://quack.localtunnel.me/graphql' }),
   cache: new InMemoryCache()
});

export default RegisterScreen;