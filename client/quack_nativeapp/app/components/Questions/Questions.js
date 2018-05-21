import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid"
import { View, Image, Text, Dimensions, TouchableHighlight, Alert, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { StackNavigator } from 'react-navigation';
import { HeaderContainer, Header, Left, Body, Right, Button, Icon, Title, Item, Input } from 'native-base';
import { ApolloProvider, graphql, withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { NavigationActions } from 'react-navigation';

class Questions extends Component {
    static navigationOptions = {
        header: null,
        gesturesEnabled: false,
    };

    constructor(props) {
        super(props);
        this.handleQuestion = this.handleQuestion.bind(this);
    }
    
    state = {
        studentID: 0,
        course: '',
        courseID: 0,
        title: '',
        date: '',
        quizID: '',
        questions: [],
        userAnswer: '',
    }

    componentDidMount() {
        this.setState({course:this.props.navigation.state.params.course})
        this.setState({title:this.props.navigation.state.params.title})
        this.setState({courseID:this.props.navigation.state.params.courseID})
        this.setState({date:this.props.navigation.state.params.date})
        this.setState({quizID:this.props.navigation.state.params.quizID})
        this.setState({studentID:this.props.navigation.state.params.studentID})

        this.props.client.mutate({ mutation: gql`
            mutation quizGetQuestions($id: Int!) {
                quizGetQuestions(id: $id){
                    id
                    question
                    options
                    correctAnswer
                    type
                }
            }`,
            variables: {
                id : this.props.navigation.state.params.quizID,
            }
        }).then( data => {
            this.setState({numQuestions:data.data.quizGetQuestions.length});
            let questions = []

            for (let i = 0; i < data.data.quizGetQuestions.length; i++) {
                questions.push({
                    id: data.data.quizGetQuestions[i].id,
                    question: data.data.quizGetQuestions[i].question,
                    options: data.data.quizGetQuestions[i].options,
                    correctAnswer: data.data.quizGetQuestions[i].correctAnswer,
                    type: data.data.quizGetQuestions[i].type,
                    fullType: '',
                    key: i
                })
            }

            this.setState({questions})
        });
    }

    handleQuestion (id, options, type, key, correctAnswer) {
        let title = this.state.title;
        let date = this.state.date;
        let course = this.state.course;
        let quizID = this.state.quizID;
        let courseID = this.state.courseID;
        let studentID = this.state.studentID;

        this.props.client.query({query: gql`
            {
                answers {
                    userID
                    questionID
                    content
                }
            }`
        }).then(data => {
            let userAnswer = '';

            for (let i = 0; i < data.data.answers.length; i++) {
                if (data.data.answers[i].userID == this.state.studentID && data.data.answers[i].questionID == id){
                    userAnswer = data.data.answers[i].content;
                }
            }

            if (type.toLowerCase() == "mc") {
                this.props.navigation.navigate('QuizResults', {title, course, courseID, date, quizID, id, correctAnswer, userAnswer, options, type, studentID})
            } else if (type.toLowerCase() == "tf") {
                this.props.navigation.navigate('QuizResults', {title, course, courseID, date, quizID, id, correctAnswer, userAnswer, options, type, studentID})
            }
        });
    }
    
    render() {
        let course = this.state.course;
        let key = this.state.courseID;
        let studentID = this.state.studentID;

        return (
            <View style={styles.container}>
                <Header style={styles.headerTop}>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.dispatch(NavigationActions.reset({index: 0, actions: [NavigationActions.navigate({routeName: 'Grades', params: {course, key, studentID}})]}))}>
                            <Icon name='arrow-back' style={styles.backButton}/>
                        </TouchableOpacity>
                    </Left>

                    <Body style={{flex: 1}}></Body>

                    <Right style={{flex: 1}}></Right>
                </Header>

                <View style={styles.header}>
                    <Text style={styles.bigTitle}>
                        {this.state.title}
                    </Text>
                </View>

                <View style={styles.gradesListView}>
                    <ScrollView style={styles.gradesListRow}>
                        {this.state.questions.map(({id, options, type, key, correctAnswer}) => {
                            return (
                                <View>
                                    <Grid>
                                        <Row style={{justifyContent: 'center', alignItems: 'center'}}>
                                            <TouchableOpacity onPress={()=> this.handleQuestion(id, options, type, key, correctAnswer)}>
                                                <Text style={styles.quizText}>Question {key+1}</Text>
                                                {
                                                    (type.toUpperCase() == 'MC') ?
                                                    <Text style={styles.quizSubText}>Multiple-Choice</Text>
                                                    : (type.toUpperCase() == 'TF') ?
                                                    <Text style={styles.quizSubText}>True-False</Text>
                                                    : (type.toUpperCase() == 'SA') ?
                                                    <Text style={styles.quizSubText}>Short-Answer</Text>
                                                    : (type.toUpperCase() == 'FB') ?
                                                    <Text style={styles.quizSubText}>Fill-in-the-blank</Text>
                                                    : <Text style={styles.quizSubText}>Type Not Reconized</Text>
                                                }
                                            </TouchableOpacity>
                                        </Row>
                                    </Grid>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default withApollo(Questions)