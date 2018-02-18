import React, { Component } from 'react';
import { View, Image, StatusBar, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
export default class Quiz extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.backgroundContainer}>
                    <Image
                    source={require('../../images/quiz_resources/quiz_backdrop_triple.png')}
                    style={styles.quizBackground}
                    />
                </View>
                <View></View> 
            </View>
        );
    }
}