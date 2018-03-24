import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid"
import { Input, Item, Content, Container } from "native-base"
import { View, Image, StatusBar, Text, Dimensions, TouchableHighlight, TouchableOpacity, TextInput, Alert } from 'react-native';
import styles from './styles';
export default class PastQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            text: 'Enter text here',
            picture: '../../images/quiz_resources/quiz_backdrop_triple.png',
            questionText: 'What color is the dog? and what is the meaning of life',
            hasPicture: true,
        
        }
    }
    render() {
        const quizPicture = <Image
            source={require('../../images/quiz_resources/dogPic.jpg')}
            style={styles.pictureView}
            />
        const quizQuestion = <Text style={styles.quizQuestionText}>{this.state.questionText}</Text>
        const answerBox = 
                <Item rounded>
                <Input 
                    placeholder='Enter text here...'
                    multiline={true}
                    numberOfLines={5}
                    style={this.state.hasPicture ? {height:200} : {height:200}}
                />
                </Item>
        
        return (
        <Container>
            <Image
                source={require('../../images/quiz_resources/quiz_backdrop_triple.png')}
                style={styles.quizBackground}
            />
            <Text style={styles.quizText}>
                Quiz 1
            </Text>
            
        <Grid>
            <StatusBar
                    barStyle="dark-content"
                    style={styles.navBar}
            />
            <Row size ={30}></Row>
            <Row size = {20}>
                <Content>
                    {this.state.hasPicture ? null : quizQuestion}
                </Content>
            </Row>
            <Row size = {10}>
                {this.state.hasPicture ? quizQuestion : null}
            </Row>
            <Row size = {40} padding={8}>
                <Content>
                    {answerBox}
                </Content>
                
            </Row>    
        </Grid>
        <TouchableOpacity style={styles.downIndicator} onPress={ () => Alert.alert("Answers saved. You can go back now") }>
                <Image
                    source={require('../../images/quiz_resources/close_quiz_indicator_triple.png')}
                  //  style={styles.downIndicator}
                />
    
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => Alert.alert("Next question")}>
                <Image
                    source={require('../../images/quiz_resources/next_button.png')}
                    
                />
    
            </TouchableOpacity>
            <TouchableOpacity style={styles.prevButton} onPress={() => Alert.alert("Previous question")}>
                <Image
                    source={require('../../images/quiz_resources/previous_button.png')}
                    
            />
    
            </TouchableOpacity>
            {this.state.hasPicture ? quizPicture : null}
        </Container>
        );
    }
}