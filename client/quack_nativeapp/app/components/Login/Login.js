import React, { Component } from 'react';
import { View, Image, StatusBar, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import LoginForm from './LoginForm';
export default class Login extends Component {
    render() {
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
                    <LoginForm/>

                </View>


            </KeyboardAvoidingView>
        );
    }
}