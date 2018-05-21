import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid"
import {Content } from 'native-base'
import { StackNavigator } from 'react-navigation';
import { View, Image, Text, Dimensions, TouchableHighlight, Alert, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { HeaderContainer, Header, Left, Body, Right, Button, Icon, Title, Item, Input, Spinner} from 'native-base';
import { colors } from '../../style/styles';
import ReactDOM from 'react-dom';
import * as V from 'victory';
import {VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel } from 'victory-native';
import { ApolloProvider, graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { NavigationActions } from 'react-navigation';

class QuizResults extends Component {
    state = {
        title: '',
        course: '',
        courseID: '',
        date: '',
        quizID: '',
        options: [],
        options3: ['A', 'B', 'C', 'D'],
        numoptions: 0,
        stats: [],
        correctAnswer: '',
        isLoading: true,
        type: ''
    }

    componentDidMount () {
        this.setState({title:this.props.navigation.state.params.title})
        this.setState({course:this.props.navigation.state.params.course})
        this.setState({courseID:this.props.navigation.state.params.courseID})
        this.setState({date:this.props.navigation.state.params.date})
        this.setState({quizID:this.props.navigation.state.params.quizID})
        this.setState({questionID:this.props.navigation.state.params.id})
        this.setState({correctAnswer:this.props.navigation.state.params.correctAnswer})
        this.setState({userAnswer:this.props.navigation.state.params.userAnswer})
        this.setState({type:this.props.navigation.state.params.type})
        this.setState({studentID:this.props.navigation.state.params.studentID})

        this.props.client.mutate({ mutation: gql`
            mutation quizGetStats($questionID: Int!) {
                quizGetStats(questionID: $questionID)
            }`,
            variables: {
                questionID : this.props.navigation.state.params.id,
            }
        }).then( data => {
            let stats = [];
            let numOptions = data.data.quizGetStats.length;

            for (let i = 0; i < data.data.quizGetStats.length; i++) {
                if (this.props.navigation.state.params.type.toLowerCase() == 'tf') {
                    stats.push({answer: (3*i+2), number: data.data.quizGetStats[i], fill: ''})
                }
                else if (this.props.navigation.state.params.type.toLowerCase() == 'mc') {
                    if (data.data.quizGetStats.length == 5) {
                        stats.push({answer: (i+1), number: data.data.quizGetStats[i], fill: ''})
                    }
                    else if (data.data.quizGetStats.length == 4) {
                        stats.push({answer: (i+1), number: data.data.quizGetStats[i], fill: ''})
                    }
                    else if (data.data.quizGetStats.length == 3) {
                        stats.push({answer: (2*i+2), number: data.data.quizGetStats[i], fill: ''})
                    }
                    else if (data.data.quizGetStats.length == 2) {
                        stats.push({answer: (3*i+2), number: data.data.quizGetStats[i], fill: ''})
                    }
                    else {
                        stats.push({answer: (i+1), number: data.data.quizGetStats[i], fill: ''})
                    }
                }
            }

            this.setState({stats})
            this.setState({numOptions});
            
            for (let i=0; i<numOptions; i++) {
                this.state.options.push({'option': this.props.navigation.state.params.options.split(";")[i], 'letter': this.state.options3[i]});
            }
            
            for (let i=0; i<numOptions; i++) {
                if (this.state.userAnswer == this.state.options[i].option){
                    if (this.state.correctAnswer == this.state.userAnswer){
                        this.state.stats[i].fill = 'white';
                    } else {
                        this.state.stats[i].fill = 'red';
                    }
                } else if(this.state.correctAnswer == this.state.options[i].option){
                    this.state.stats[i].fill = 'green';
                }
            }

            this.setState({isLoading:false})
        });
    }

    isLoading() {
        this.setState({isLoading:false})
    }

    render() {
        let title = this.state.title;
        let course = this.state.course;
        let courseID = this.state.courseID;
        let date = this.state.date;
        let quizID = this.state.quizID;
        let id = this.state.id;
        let correctAnswer = this.state.correctAnswer;
        let userAnswer = this.state.userAnswer;
        let options = this.state.options;
        let studentID = this.state.studentID;

        if (this.state.isLoading == true) {
            return(
                <View style={styles.background}>
                    <Header style={styles.headerTop}>
                        <Left style={{flex: 1}}>
                            <TouchableOpacity onPress={() => this.props.navigation.dispatch(NavigationActions.reset({index: 0, actions: [NavigationActions.navigate({ routeName: 'Questions', params:  {title, course, courseID, date, quizID, id, correctAnswer, userAnswer, options, studentID}})]}))}>
                                <Icon name='arrow-back' style={styles.backButton}/>
                            </TouchableOpacity>
                        </Left>
                    </Header>
                
                    <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                        <Spinner color = 'white'/>
                    </View>
                </View>
            );
        } else {
            return (
                <Grid style={styles.background}>
                    <Header style={styles.headerTop}>
                        <Left style={{flex: 1}}>
                            <TouchableOpacity onPress={() => this.props.navigation.dispatch(NavigationActions.reset({index: 0, actions: [NavigationActions.navigate({ routeName: 'Questions', params:  {title, course, courseID, date, quizID, id, correctAnswer, userAnswer, options, studentID}})]}))}>
                                <Icon name='arrow-back' style={styles.backButton}/>
                            </TouchableOpacity>
                        </Left>
                    </Header>

                    <Row size={10}>
                        <Text style = {styles.bigTitle}>
                            {this.state.course.split(":")[0]}
                        </Text>
                    </Row>

                    <Row size={7}>
                        <Text style = {styles.subTitle}>
                            {this.state.course.split(":")[1]}
                        </Text>
                    </Row>

                    <Row size={50}>
                        <VictoryChart domainPadding={20}>
                            <VictoryLabel text={this.state.title} textAnchor="middle" x={Dimensions.get('window').width / 2} y={30} size={40} />

                            {
                                (this.state.type.toLowerCase() == "tf")?
                                <VictoryAxis tickValues={[1, 2, 3, 4, 5, 6]} tickFormat={["", "True", "", "", "False", ""]}/>
                                : (this.state.numOptions == 5) ?
                                <VictoryAxis tickValues={[1, 2, 3, 4, 5]} tickFormat={[this.state.options[0].option, this.state.options[1].option, this.state.options[2].option, this.state.options[3].option, this.state.options[4].option]}/>
                                : (this.state.numOptions == 4) ?
                                <VictoryAxis tickValues={[1, 2, 3, 4]} tickFormat={[this.state.options[0].option, this.state.options[1].option, this.state.options[2].option, this.state.options[3].option]}/>
                                : (this.state.numOptions == 3) ?
                                <VictoryAxis tickValues={[1, 2, 3, 4, 5, 6, 7]} tickFormat={["", this.state.options[0].option, "", this.state.options[1].option, "", this.state.options[2].option, ""]}/>
                                : (this.state.numOptions == 2) ?
                                <VictoryAxis tickValues={[1, 2, 3, 4, 5, 6]} tickFormat={["", this.state.options[0].option, "", "", this.state.options[1].option, ""]}/>
                                : <VictoryAxis tickValues={[1, 2, 3, 4]} tickFormat={["A", "B", "C", "D"]}/>
                            }

                            <VictoryAxis dependentAxis/>

                            <VictoryBar
                                data={this.state.stats}
                                labels={(d) => d.y}
                                x="answer"
                                y="number"
                                animate={{duration: 5}}
                            />
                        </VictoryChart>
                    </Row>

                    <Row size={8}>
                        <Text style= {styles.recentIndicator}>
                            Overview
                        </Text>
                    </Row>
                    
                    <Row size={25}>
                        <Content>
                            <View>
                                <Grid>
                                    <Row style={{justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={styles.pastQuizIndicator}> {this.state.correctAnswer}</Text>
                                    </Row>
                                </Grid>
                            </View>
                        </Content>
                    </Row>
                </Grid>
            );
        }
    }
}

export default withApollo(QuizResults);