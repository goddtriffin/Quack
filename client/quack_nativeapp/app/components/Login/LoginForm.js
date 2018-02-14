import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import styles from './styles';
export default class LoginForm extends Component {
    render() {
        return (
            <View>
            
                <TextInput style={styles.input}/>
                <TextInput style={styles.input}/>

            </View>
        );
    }
}