import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid"
import { View, Image, StatusBar, Text, Dimensions, SectionList, TouchableHighlight, Alert } from 'react-native';
import styles from './styles';
export default class Quiz extends Component {
    dummyData = {
        numbers: [
            {'numbers': 'Quiz 1', 'id': 1},
            {'numbers': 'Quiz 2', 'id': 2},
            {'numbers': 'Quiz 3', 'id': 3},
            {'numbers': 'Quiz 4', 'id': 4},
            {'numbers': 'Quiz 5', 'id': 5},
            {'numbers': 'Quiz 6', 'id': 6},
            {'numbers': 'Quiz 7', 'id': 7},
            {'numbers': 'Quiz 8', 'id': 8},
        ]
    }

    onPress = () => {
        Alert.alert("Lets go to the quiz!");
    }
    render() {
        return (
            <Grid>
                <Row size={25}>
                    <Col size={50}>
                        <Image
                        source={require('../../images/navigation_resources/back_button.png')}
                        style={styles.navigationButton}
                        />
                        
                        <Text style = {styles.classHeaderText}>
                        CS 307
                        </Text>
                        
                        <Text style = {styles.classReminderText}>
                        Next class today @ 11:30am
                        </Text>
                        <Text style = {styles.currentGrade}>
                        Current Grade:  69%
                        </Text>

                    </Col>
                    <Col style={{alignItems: 'flex-end'}}>
                        <Text style={styles.liveQuizReminder}>
                        Live Quiz
                        </Text>
                    </Col>
                </Row>
                <Row size={50}>
                    <Col size={50}>
                        <Text style={styles.gradeTitle}>
                        Grades
                        </Text>
                        <Text style={styles.gradeQuizTitle}>
                        Quiz 1
                        </Text>
                        <Text style={styles.scoreDescription}>
                        Score: 3/5
                        </Text>
                        <Text style={styles.gradeQuizTitle}>
                        Quiz 2
                        </Text>
                        <Text style={styles.scoreDescription}>
                        No Score
                        </Text>
                        <Text style={styles.gradeQuizTitle}>
                        Quiz 3
                        </Text>
                        <Text style={styles.scoreDescription}>
                        Score: 6/9 points
                        </Text> 
                        <Image
                        source={require('../../images/quiz_resources/quiz_backdrop_triple.png')}
                        style={styles.quizBackground}
                        />
                        <Text style={styles.beginQuizText}>
                        Begin Quiz
                        </Text>
                    </Col>
                    <Col size={40}>
                        <Text style={styles.firstgradeDate}>
                        1/29
                        </Text>
                        <Text style={styles.gradeDates}>
                        1/31
                        </Text>
                        <Text style={styles.gradeDates}>
                        2/11
                        </Text>
                        <TouchableHighlight onPress={this.onPress}>
                            <Image
                                source={require('../../images/navigation_resources/quiz_up.png')}
                                style={styles.letsGoToQuiz}
                            />
                        </TouchableHighlight>     
                    </Col>
                </Row>
            </Grid>
            
        
        
        );
    }
}