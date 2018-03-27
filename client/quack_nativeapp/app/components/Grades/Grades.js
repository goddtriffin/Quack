import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid"
import { View, Image, Text, Dimensions, TouchableHighlight, Alert, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
export default class Quiz extends Component {

    state = {
        authToken: '',
        email: '',
        course: '',
        grades: [],
    }

    componentDidMount() {
        let grades = this.state.grades;
        if(this.state.course == "CS 307"){
            grades.push({assignment: 'Quiz 1', grade: '100%', key: 0});
            this.setState({grades});
        }
        else{
            grades.push({assignment: 'No Grades', grade: '', key: 0})
            this.setState({grades});
        }
    }

    
    render() {
        this.state.course = this.props.navigation.state.params.courses;
        return (
            <Grid>
                <Row size={15}>
                    <Col size={50}>
                        { /*<Image onPress={() => this.props.navigation.navigate("Home")}
                        source={require('../../images/navigation_resources/back_button.png')}
                        style={styles.navigationButton}
                        />*/}                        
                        <Text style = {styles.classHeaderText}>
                        {this.state.course}
                        </Text>
                        {/*<Text style = {styles.classReminderText}>
                        Next class       @ 
                        </Text>*/}
                        {/*<Text style = {styles.currentGrade}>
                        No Grades 
                        </Text>*/}

                    </Col>
                    {/*<Col style={{alignItems: 'flex-end'}}>
                        <TouchableHighlight onPress={() => Alert.alert("Professor Quack's email is\nquack@quackers.edu")}>
                            <Text style={styles.liveQuizReminder}>
                            Contact Instructor
                            </Text>
                        </TouchableHighlight>
                    </Col>*/}
                </Row>
                <Row size={85}>
                    <Col size={50}>
                    <View style={styles.gradesListView}>
                    <ScrollView style={styles.gradesList}>
                        {
                            this.state.grades.map(({assignment}) => {
                                return (<View>
                                    <Text style={styles.gradeListText}>{assignment}</Text>
                                </View>);
                                }
                            ) 
                        }
                    </ScrollView>
                    </View>
                        {/*<Text style={styles.gradeTitle}>
                        Grades
                        </Text>
                        <Text style={styles.gradeQuizTitle}>
                        No Grades
                        </Text>*/}
                        {/*<TouchableOpacity onPress={() => this.props.navigation.navigate('PastQuiz')}>
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
                        </Text>*/}
                        {/*<Image
                        source={require('../../images/quiz_resources/quiz_backdrop_triple.png')}
                        style={styles.quizBackground}
                        />*/}
                        {/*<Text style={styles.beginQuizText}>
                        Begin Quiz
                        </Text>*/}
                    </Col>
                    <Col size={40}>
                        {/*<Text style={styles.firstgradeDate}>
                        1/29
                        </Text>
                        <Text style={styles.gradeDates}>
                        1/31
                        </Text>
                        <Text style={styles.gradeDates}>
                        2/11
                        </Text>*/}
                        {/*<TouchableHighlight onPress={() => this.props.navigation.navigate('Quiz')}>
                            <Image
                                source={require('../../images/navigation_resources/quiz_up.png')}
                                style={styles.letsGoToQuiz}
                            />
                        </TouchableHighlight>*/}  
                    </Col>
                </Row>
            </Grid>
        );
    }
}