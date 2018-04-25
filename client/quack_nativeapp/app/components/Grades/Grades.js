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
import io from 'socket.io-client';

const socket = io('http://endor-vm2.cs.purdue.edu:5000')

class Grades extends Component {
    static navigationOptions = {
        header: null,
        gesturesEnabled: false,
    };

    constructor(props) {
        super(props);
        this.handleQuiz = this.handleQuiz.bind(this);
        this.handleSocket()
    }

    state = {
        authToken: '',
        email: '',
        course: '',
        courseID: 0,
        quizzes: [],
        studentID: 0,
        updatedQuiz: [],
        plzUpdate: '',
    }

    handleSocket() {
        socket.emit('subscribe', 'quiz_updated', this.props.navigation.state.params.key);
        socket.on('quiz_updated', (quiz) => this.updateQuiz(quiz))
    }

    updateQuiz(quiz) {
        
        this.setState({updatedQuiz: quiz}, function() {
            
            for (let i = 0; i < this.state.quizzes.length; i++) {
                if (this.state.quizzes[i].key == this.state.updatedQuiz.id) {
                    this.state.quizzes[i].date = this.state.updatedQuiz.date;
                    this.state.quizzes[i].isOpen = this.state.updatedQuiz.isOpen == 1 ? true : false
                    this.state.quizzes[i].key = this.state.updatedQuiz.id;
                    this.state.quizzes[i].title = this.state.updatedQuiz.title;

                }
            }
            this.setState({plzUpdate: 'ok'})
        })
    }

    componentWillUnmount(){
        socket.emit('unsubscribe', 'quiz_updated', this.props.navigation.state.params.key)
    }

    componentDidMount() {

        this.setState({course:this.props.navigation.state.params.course})
        this.setState({studentID:this.props.navigation.state.params.studentID})
        this.setState({courseID:this.props.navigation.state.params.key})

        this.props.client.mutate({ mutation: gql`
                mutation userGetQuizzes($courseID: Int!) {
                    userGetQuizzes(courseID: $courseID) {
                        id
                        isOpen
                        date
                        title
                    }
                }
            `,
            variables: {
                courseID : this.props.navigation.state.params.key,
            }
            }).then( data => {
                quizzes = [];
                console.log(data.data.quizzes)

                for(let i = 0; i < data.data.userGetQuizzes.length; i++) {
                    quizzes.push({title: data.data.userGetQuizzes[i].title, isOpen:data.data.userGetQuizzes[i].isOpen, date:data.data.userGetQuizzes[i].date, key:data.data.userGetQuizzes[i].id})
                }

            console.log(quizzes)
            this.setState({quizzes});
            }).catch(function(error) {
                alert(error.message);
            });
    }
    handleQuiz (title, date, quizID, isOpen) {
        let course = this.state.course;
        let courseID = this.state.courseID;
        let studentID = this.state.studentID;
        if(isOpen == true){
            this.props.navigation.navigate('WriteQuiz', {course, courseID, title, date, quizID, studentID})
        }
        else if(date != ""){
            this.props.navigation.navigate('Questions', {course, courseID, title, date, quizID, studentID})
        }
        else{
            Alert.alert(
                'Upcoming Quiz',
                title + ' is an upcoming quiz',
                [
                  {text: 'OK'},
                ],
                { cancelable: false }
            )
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Header style={styles.headerTop}>
                    <Left style={{flex: 1}}>
                        <TouchableOpacity onPress={() => this.props.navigation.dispatch(NavigationActions.reset({index: 0, actions: [NavigationActions.navigate({ routeName: 'Home'})]}))}>
                        <Icon name='arrow-back' style={styles.backButton}/>
                        </TouchableOpacity>
                    </Left>
                </Header>

                <View style={styles.header}>
                    <Text style={styles.bigTitle}>
                        {this.state.course.split(":")[0]}
                    </Text>
                    <Text style={styles.subTitle}>
                        {this.state.course.split(":")[1]}
                    </Text>
                </View>

                <View style={styles.gradesListView}>
                    <ScrollView style={styles.gradesListRow}>
                        {(this.state.quizzes.length != 0) ?
                            this.state.quizzes.map(({title, isOpen, date, key}) => {
                                return (
                                    <View>
                                        <Grid>
                                                <TouchableOpacity style={{flex: 1}} onPress={()=> this.handleQuiz(title, date, key, isOpen)}>
                                                <Row style={{justifyContent: 'center', alignItems: 'center', margin: 10}}>
                                                        <Col size={80}>
                                                        <Text style={styles.quizText}>{title}</Text>
                                                        </Col>
                                                        <Col size={20}>
                                                        {(isOpen == true) ?
                                                            <Text style={styles.quizTextLive}>Live</Text>
                                                        : (date == "") ?
                                                            <Text style={styles.quizText}></Text>
                                                        :
                                                            <Text style={styles.quizText}>{date.substring(0,5)}</Text>
                                                        }
                                                        </Col>
                                                </Row>
                                                </TouchableOpacity>
                                        </Grid>
                                    </View>
                                );
                            })
                        :<Text style={styles.noQuizText}>There are no quizzes</Text>
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default withApollo(Grades)