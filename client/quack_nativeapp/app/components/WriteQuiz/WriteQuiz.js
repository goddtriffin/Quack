import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid"
import { View, Image, StatusBar, Text, Dimensions, TouchableHighlight, TextInput, Alert } from 'react-native';
import styles from './styles';
export default class PastQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = { text: 'Enter text here'}
    }
    render() {
        return (
        <Grid>
           
            <Row size={2}>
                    <Image
                    source={require('../../images/quiz_resources/quiz_backdrop_triple.png')}
                    style={styles.quizBackground}
                    />
                    <Text style={styles.quizText}>
                        Quiz 1
                    </Text>
                    <TouchableHighlight onPress={() => Alert.alert("Answers saved. You can go back now")}>
                    <Image
                    source={require('../../images/quiz_resources/close_quiz_indicator_triple.png')}
                    style={styles.downIndicator}
                    />
            
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => Alert.alert("Next question")}>
                    <Image
                    source={require('../../images/quiz_resources/next_button.png')}
                    style={styles.nextButton}
                    />
            
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => Alert.alert("Previous question")}>
                    <Image
                    source={require('../../images/quiz_resources/previous_button.png')}
                    style={styles.prevButton}
                    />
            
                    </TouchableHighlight>
            </Row>
            <Row size = {48}>
                    <Image
                    source={require('../../images/quiz_resources/dogPic.jpg')}
                    style={styles.pictureView}
                    />
            </Row>
            <Row size = {50}>

            </Row>    
        </Grid>
        );
    }
}