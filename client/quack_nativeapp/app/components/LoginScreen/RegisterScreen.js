import React, { Component } from 'react';
import { View, Image, StatusBar, KeyboardAvoidingView, TouchableOpacity, Text, TextInput, Keyboard, SegmentedControlIOS, AsyncStorage } from 'react-native';
import styles from './styles';
import { colors } from '../../style/styles';
import { StackNagivator } from 'react-navigation'

import { ApolloProvider } from 'react-apollo';
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
        instructor: '',
    }
    

    render() {

        registerUser = async() => {
            client.mutate({ mutation: gql`
                mutation userCreate($input: UserInput) {
                  userCreate(input: $input) {
                    id
                  }
                }
              `,
              variables: {
                input : {
                    firstName: this.state.fullName.split(" ")[0],
                    lastName: this.state.fullName.split(" ")[1],
                    email: this.state.email
                }
               }}).then( data => {
               this.state.studentID = data.data.userCreate.id;
            }).catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                 // ADD THIS THROW error
                throw error;
            });


            await AsyncStorage.setItem('email:key', this.state.email);
            await AsyncStorage.setItem('password', this.state.password);
            await AsyncStorage.setItem('studentID', this.state.studentID);
            await AsyncStorage.setItem('fullName', this.state.fullName);
            await AsyncStorage.setItem('instructor', this.state.selectedIndex.toString());

            this.props.navigation.navigate('Home');
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
                        
                        <Text style={styles.bigText}>I am a...</Text>

                        <View style={styles.HELLO}>
                            <SegmentedControlIOS
                                values={['Student', 'Instructor']}
                                selectedIndex={this.state.selectedIndex}
                                onChange={(event) => {
                                    this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
                                }}
                                tintColor='white'
                            />
                        </View>
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
                                onSubmitEditing={() => this.idInput.focus()}
                                onChangeText={(email) => this.setState({email})}
                            />
                            <TextInput 
                                placeholderTextColor='rgba(255,255,255,0.6)'
                                placeholder="Student ID"
                                returnKeyType='next'
                                autoCapitalize='none'
                                autoCorrect={false}
                                placeholderStyle={styles.input}
                                style={styles.input}
                                ref={(input) => this.idInput = input}
                                onSubmitEditing={() => this.passwordInput.focus()}
                                onChangeText={(studentID) => this.setState({studentID})}
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
                                onSubmitEditing={Keyboard.dismiss}
                                ref={(input) => this.passwordInput = input}
                                onChangeText={(password) => this.setState({password})}
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

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache()
});

export default RegisterScreen;