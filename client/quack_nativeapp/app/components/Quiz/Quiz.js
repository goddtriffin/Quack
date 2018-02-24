import React, { Component } from 'react';
import { View, Image, StatusBar, Text, Dimensions, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
export default class Quiz extends Component {
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
                    <Image
                    source={require('../../images/quiz_resources/close_quiz_indicator_triple.png')}
                    style={styles.downIndicator}
                    />
                    <Image
                    source={require('../../images/quiz_resources/tempPhoto.jpg')}
                    style={styles.pictureView}
                    />
                </View>

                <View style={styles.foregroundContainer}>
                    <Text style={styles.quizQuestionText}>
                        a.) 100 ft
                    </Text>
                    <Text style={styles.quizQuestionText}>
                        b.) 69 ft
                    </Text>
                </View>

                <View style={styles.questionButtonContainer}>
                    <Text style={styles.quizBodyText}>
                        How tall is the Empire State Building?
                    </Text>
                    <TouchableOpacity onPress={() => Alert.alert("You selected A!")}>
                        <Image
                        source={require('../../images/quiz_resources/A_button.png')}
                        style={styles.abQuestionButtons}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Alert.alert("You selected B!")}>
                        <Image
                        source={require('../../images/quiz_resources/B_button.png')}
                        style={styles.abQuestionButtons}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('WriteQuiz')}>
                        <Text style={styles.nextButton}>
                        Next Question
                        </Text>
                    </TouchableOpacity>
                
                </View>
            </View>
        );
    }
}