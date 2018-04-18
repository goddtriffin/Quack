import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid"
import {Content } from 'native-base'
import { StackNavigator } from 'react-navigation';
import { View, Image, Text, Dimensions, TouchableHighlight, Alert, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { colors } from '../../style/styles';
import ReactDOM from 'react-dom';
import * as V from 'victory';
import {VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel} from 'victory-native';
export default class QuizResults extends Component {

    state = {
        authToken: '',
        email: '',
        course: '',
        grades: [{assignment: 'Quiz 1', grade: '80', key: 0},
        {assignment: 'Quiz 2', grade: '23', key:1}],
    }

    render() {
       this.state.course = this.props.navigation.state.params.courses;
       const data = [
        {answer: 1, number: 13, opacity: 0.7},
        {answer: 2, number: 20, fill: colors.qRed},
        {answer: 3, number: 20, opacity: 0.7},
        {answer: 4, number: 69, fill: 'white', opacity: .9}
      ];
       const quizzes = "Quiz 1 2/4\n\nQuiz 2 4/5\n\nQuiz 3 6/7\n\nQuiz 5  4/2\n\n\n\n\n\nQuiz 6 6/9"

        return (
            <Grid style={styles.background}>
                <Row size={15}>        
                        <Text style = {styles.classHeaderText}>
                        {this.state.course}
                        </Text>
                </Row>
                <Row size={50}>
                    <VictoryChart
                    domainPadding={20}
                     >         
                    <VictoryLabel text="Live Quiz" textAnchor="middle" x={Dimensions.get('window').width / 2} y={40}/>
                    <VictoryAxis
                      tickValues={[1, 2, 3, 4]}
                      tickFormat={["A", "B", "C", "D"]}
                    />
                    <VictoryAxis
                      dependentAxis
                      //tickFormat={(x) => (`$${x / 1000}k`)}
                    />
                    <VictoryBar
                      data={data}
                      labels={(d) => d.y}
                      x="answer"
                      y="number"
                      animate={{duration: 50}}
                    />
                    </VictoryChart>
     
            </Row>
            <Row size={9}>
                <Text style= {styles.recentIndicator}>
                Past Quizzes
                </Text>
            </Row>
            <Row size={30}>
                <Content>
                <Text style={styles.pastQuizIndicator}>
                {quizzes}
                </Text>
                </Content>
            </Row>
            </Grid>
        );
    }
}