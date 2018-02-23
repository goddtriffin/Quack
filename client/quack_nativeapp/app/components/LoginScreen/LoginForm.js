import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { StackNavigator, NavigationActions } from 'react-navigation'
export default class LoginForm extends Component {


    state = {
        email: '',
        password: ''
    }


    render() {
        loginUser = () => {
            const resetAction = NavigationActions.reset({
                index: 1,
                actions: [
                  NavigationActions.navigate({ routeName: 'LoginRoute' }),
                  NavigationActions.navigate({ routeName: 'HomeRoute' })
                ]
              });
              this.props.navigation.dispatch(resetAction);
        }
        

        return (
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
        );
    }
}