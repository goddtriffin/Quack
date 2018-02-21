import React, { Component } from 'react';
import { View, Image, StatusBar, KeyboardAvoidingView, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import LoginForm from './LoginForm';
import { StackNavigator } from 'react-navigation';

export default class LoginScreen extends Component {
    static navigationOptions = {
        header: null,
    };

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

                    <TouchableOpacity style={styles.textButton} onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={styles.detailText}>Not registered? </Text>
                        <Text style={styles.signupText}>Sign up now</Text>
                    </TouchableOpacity>

                </View>
                


            </KeyboardAvoidingView>
        );
    }
}