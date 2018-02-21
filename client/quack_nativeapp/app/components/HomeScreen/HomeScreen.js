import React, { Component } from 'react';
import { View, Image, StatusBar, KeyboardAvoidingView, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { StackNavigator } from 'react-navigation';

const user = {
    firstName: '',
    lastName: '',
    ID: '',
}

class HomeScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    render() {

        const fullName  = this.props.navigation.state.params;

        

        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="default"
                />

                <View style={styles.header}>
                    <Text style={styles.bigTitle}>Hi, {fullName}</Text>
                    <Text>Hello {fullName}</Text>
                </View>



            </View>
        );
    }
}
export default HomeScreen;