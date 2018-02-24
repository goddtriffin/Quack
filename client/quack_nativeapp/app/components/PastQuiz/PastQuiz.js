import React, { Component } from 'react';
import { View, Image, StatusBar, Text, Dimensions, TouchableHighlight } from 'react-native';
import styles from './styles';
export default class PastQuiz extends Component {
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
                        Past Quiz
                    </Text>
                    <Image
                    source={require('../../images/quiz_resources/close_quiz_indicator_triple.png')}
                    style={styles.downIndicator}
                    />
                    <Image
                    source={require('../../images/quiz_resources/dogPic.jpg')}
                    style={styles.pictureView}
                    />
                </View>

                <View style={styles.foregroundContainer}>
                    <Text style={styles.quizQuestionText}>
                        a.) True
                    </Text>
                    <Text style={styles.quizQuestionText}>
                        b.) False
                    </Text>
                </View>

                <View style={styles.questionButtonContainer}>
                    <Text style={styles.quizBodyText}>
                        Is this a dog?
                    </Text>
                    <Image
                    source={require('../../images/quiz_resources/A_button.png')}
                    style={styles.abQuestionButtons}
                    />
                    <Image
                    source={require('../../images/quiz_resources/B_button.png')}
                    style={styles.abQuestionButtons}
                    />
                
                </View>
            </View>
        );
    }
}