import React, { Component } from 'react';
import { View, Image, StatusBar, KeyboardAvoidingView, TouchableOpacity, Text, TextInput, Keyboard } from 'react-native';
import styles from './styles';
import { colors } from '../../style/styles';
import { StackNagivator } from 'react-navigation'

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
        password2: '',
    }

    

    render() {

        registerUser = () => {
            console.log("HELLOOOOO");
            this.props.navigation.navigate('Home', this.state.fullName);
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
                                onSubmitEditing={() => this.idInput.focus()}
                                onChangeText={(fullName) => this.setState({email})}
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
                                onChangeText={(fullName) => this.setState({studentID})}
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
                                onSubmitEditing={() => this.passwordInput2.focus()}
                                ref={(input) => this.passwordInput = input}
                                onChangeText={(fullName) => this.setState({password})}
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
                                onSubmitEditing={Keyboard.dismiss}
                                ref={(input) => this.passwordInput2 = input}
                                onChangeText={(fullName) => this.setState({password2})}
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

export default RegisterScreen;