import React, { Component } from 'react';
import { View, Image, StatusBar, Text, Dimensions, TouchableHighlight, TextInput, Alert } from 'react-native';
import styles from './styles';
export default class PastQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = { text: 'Enter text here'}
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    barStyle="dark-content"
                    style={styles.navBar}
                />
                <View style={styles.backgroundContainer}>
                    <Image
                    source={require('../../images/quiz_resources/quiz_backdrop_triple.png')}
                    style={styles.quizBackground}
                    />
                    <Text style={styles.quizText}>
                        Current Quiz
                    </Text>
                    <TouchableHighlight onPress={() => Alert.alert("Answers saved. You can go back now")}>
                    <Image
                    source={require('../../images/quiz_resources/close_quiz_indicator_triple.png')}
                    style={styles.downIndicator}
                    />
                    </TouchableHighlight>
                    <Image
                    source={require('../../images/quiz_resources/dogPic.jpg')}
                    style={styles.pictureView}
                    />
                </View>

                <View style={styles.foregroundContainer}>
                    
                </View>

                <View style={styles.questionButtonContainer}>
                    <Text style={styles.quizBodyText}>
                        Tell me why this isn't a cat
                    </Text>
                </View>
                <TextInput
                    placeholderTextColor='rgba(255,255,255,0.6)'
                    placeholder="Answer"
                    returnKeyType='next'
                 //   autoCapitalize='none'
                    autoCorrect={false}
                    placeholderStyle={styles.input}
                    style={styles.input}
                />
            </View>
        );
    }
}