import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid"

import { StackNavigator } from 'react-navigation';
import { View, Image, Text, Dimensions, TouchableHighlight, Alert, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { colors } from '../../style/styles';
import {Content, Form, Textarea, Button } from 'native-base'
import ReactDOM from 'react-dom';
import * as V from 'victory';
import {VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel} from 'victory-native';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
class Feedback extends Component {

    static navigationOptions = {
        backgroundColor: '#07A386',
    };

    constructor(props) {
        super(props);
        this.sendFeedback = this.sendFeedback.bind(this);
        this.state = {
            authToken: '',
            email: '',
            course: '',
            feedback: '',
            feedbackID: '',
            grades: [{assignment: 'Quiz 1', grade: '80', key: 0},
            {assignment: 'Quiz 2', grade: '23', key:1}],
        }
    }

    sendFeedback() {
        if (this.state.feedback != '') {
            this.props.client.mutate({
                    mutation: gql`mutation feedbackCreate($input: FeedbackInput) {
                        feedbackCreate( input: $input) {
                            id
                        }
                    }`,
                    variables: {
                        input: {
                            userID: 69,
                            content: this.state.feedback,
                            date: 'now'
                        }
                    }
                }).then( data => { 
                    this.setState({feedbackID: data.data.feedbackCreate.id});
                    this.props.navigation.navigate('Home')
                    alert("Thank you for your feedback!")
                    
                }).catch(function(error) { 
                    alert(error.message); 
                     // ADD THIS THROW error 
                    throw error; 
                });
        }
    }
    

    render() {
       //this.state.course = this.props.navigation.state.params.courses;
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
                        Feedback
                        </Text>
                </Row>
                <Row size={20}>
                    <Text style = {styles.recentIndicator}>
                    Have some feedback for us? Please enter it below!
                    </Text>
            </Row>
            <Row size={40}>
                <Content padder scrollEnabled={false}>
                    <Form>
                        <Textarea 
                        rowSpan={5}
                        bordered placeholder="Enter here" 
                        placeholderTextColor={'white'}
                        style={styles.textArea}
                        onChangeText = {(text) => this.setState({feedback: text})}
                        />
                    </Form>
                </Content>
            </Row>
            <Row size={50}>
                <Content padder scrollEnabled={false}>
                <TouchableOpacity style={styles.button} onPress={() => this.sendFeedback()}>
                        <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                </Content>
            </Row>
            </Grid>
        );
    }
}

export default withApollo(Feedback)
