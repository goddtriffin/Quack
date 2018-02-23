import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
export default class LoginForm extends Component {
    render() {
        return (
            <View>
            
                <TextInput 
                    placeholderTextColor='rgba(255,255,255,0.6)'
                    placeholder="Username"
                    keyboardType='email-address'
                    returnKeyType='next'
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholderStyle={styles.input}
                    style={styles.input}
                    onSubmitEditing={() => this.passwordInput.focus()}
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
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.textButton}>
                    <Text style={styles.detailText}>Not registered? </Text>
                    <Text style={styles.signupText}>Sign up now</Text>
                </TouchableOpacity>

            </View>
        );
    }
}