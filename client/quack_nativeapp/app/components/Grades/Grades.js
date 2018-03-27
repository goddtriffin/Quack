import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid"
import { View, Image, StatusBar, Text, Dimensions, SectionList, TouchableHighlight, Alert, TouchableOpacity } from 'react-native';
import styles from './styles';
export default class Quiz extends Component {

    state = {
        authToken: '',
        email: '',
        course: '',
    }

    render() {
        return (
            <Grid>
                <Row size={25}>
                    <Col size={50}>
                        { <Image onPress={() => this.props.navigation.navigate("Dashboard")}
                        source={require('../../images/navigation_resources/back_button.png')}
                        style={styles.navigationButton}
                        />}                        
                        <Text style = {styles.classHeaderText}>
                        {this.state.course}
                        </Text>
                        <Text style = {styles.classReminderText}>
                        Next class       @ 
                        </Text>
                        <Text style = {styles.currentGrade}>
                        Current Grade: 
                        </Text>

                    </Col>
                    <Col style={{alignItems: 'flex-end'}}>
                        <TouchableHighlight onPress={() => Alert.alert("Professor Quack's email is\nquack@quackers.edu")}>
                            <Text style={styles.liveQuizReminder}>
                            Contact Instructor
                            </Text>
                        </TouchableHighlight>
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
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('PastQuiz')}>
                        <Text style={styles.scoreDescription}>
                        Score: 1/1
                        </Text>
                        </TouchableOpacity>
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
                        Score Hidden
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
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('Quiz')}>
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