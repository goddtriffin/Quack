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
import { ApolloProvider, graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

class QuizResults extends Component {

    constructor(props) {
        super(props);
        this.getQuestion = this.getQuestion.bind(this);
    }

    state = {
        title: '',
        course: '',
        courseID: '',
        date: '',
        quizID: '',
        options: '',
        selections: '',
        numQuestions: 0,
        questionIDs: [],
        data: [],
    }

    componentDidMount () {
        this.setState({title:this.props.navigation.state.params.title})
        this.setState({course:this.props.navigation.state.params.course})
        this.setState({coureId:this.props.navigation.state.params.courseID})
        this.setState({date:this.props.navigation.state.params.date})
        this.setState({quizID:this.props.navigation.state.params.quizID})

        this.props.client.mutate({ mutation: gql`
        mutation quizGetQuestions($courseID: Int!) {
            quizGetQuestions(ID: $quizID){
                id
                question
                options
                correctAnswer
                type
            }
        }
        `,
        variables: {
            quizID : this.props.navigation.state.params.quizID,
        }
        }).then( data => {
            this.setState({numQuestions:data.data.quizGetQuestions.length});
            for(let i = 0; i < data.data.quizGetQuestions.length; i++) {
                this.state.questionIDs.push({id: data.data.userGetQuizzes[i].id, question: data.data.userGetQuizzes[i].question, options: data.data.userGetQuizzes[i].options, correctAnswer: data.data.userGetQuizzes[i].correctAnswer, type: data.data.userGetQuizzes[i].type})
            }
            this.getQuestion(questionIDs[0].id, 0)
        });
    }

    getQuestion(id, index) {
        this.props.client.mutate({ mutation: gql`
                mutation quizGetStats($questionID: Int!) {
                    quizGetStats(questionID: $questionID)
                }
            `,
            variables: {
                questionID : id,
            }
            }).then( data => {
                console.log(data)
                for(let i = 0; i < data.data.quizGetStats.length; i++) {
                    data.push({answer: this.state.questionIDs[index].options.split(";")[i], number: data.data.quizGetStats.length})
                }
            });
    }

    render() {
       const data = [
        {answer: 1, number: 13, opacity: 0.7},
        {answer: 2, number: 20, fill: colors.qRed},
        {answer: 3, number: 20, opacity: 0.7},
        {answer: 4, number: 69, fill: 'white', opacity: .9}
      ];

        return (
            <Grid style={styles.background}>
                <Row size={15}>        
                        <Text style = {styles.classHeaderText}>
                        {this.state.course.split(":")[0]}
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
                
                </Text>
            </Row>
            <Row size={30}>
                <Content>
                <Text style={styles.pastQuizIndicator}>
                </Text>
                </Content>
            </Row>
            </Grid>
        );
    }
}

export default withApollo(QuizResults);