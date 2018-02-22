import React, { Component } from 'react';
import { View, Image, StatusBar, KeyboardAvoidingView, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { StackNavigator } from 'react-navigation';


export default class HomeScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="default"
                />

                <View style={styles.header}>
                    <Text style={styles.bigTitle}>Classes</Text>
                </View>



            </View>
        );
    }
}