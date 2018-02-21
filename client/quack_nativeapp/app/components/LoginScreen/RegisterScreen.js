import React, { Component } from 'react';
import { View, Image, StatusBar, KeyboardAvoidingView, TouchableOpacity, Text, TextInput } from 'react-native';
import styles from './styles';
import { colors } from '../../style/styles';
import { StackNagivator } from 'react-navigation'
export default class RegisterScreen extends Component {

    static navigationOptions = {
        headerStyle: { backgroundColor: colors.qDarkGreen },
        title: 'Register',
        headerTitleStyle: {fontFamily: 'Fira Sans',
        fontWeight: '700',
        fontSize: 20,
        color: 'white',
        textAlign: 'left'},
        headerTintColor: 'white',
    };

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar
                barStyle="light-content"
            />
                {/* <View style={styles.header}> */}
                    
                {/* </View> */}
                
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
                        />
                        <TextInput 
                            placeholderTextColor='rgba(255,255,255,0.6)'
                            placeholder="Student ID"
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

                        <TextInput 
                            secureTextEntry={true}
                            placeholderStyle={styles.input}
                            placeholderTextColor='rgba(255,255,255,0.6)'
                            placeholder="Retype Password"
                            returnKeyType='next'
                            autoCapitalize='none'
                            autoCorrect={false}
                            style={styles.input}
                            ref={(input) => this.passwordInput = input}
                        />

                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                
            </KeyboardAvoidingView>
        );
    }
}