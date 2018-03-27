import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid"
import { Input, Item, Content, Container, Icon } from "native-base"
import { View, Image, StatusBar, Text, Dimensions, TouchableHighlight, TouchableOpacity, TextInput, Alert } from 'react-native';
import styles from './styles';


import { ApolloProvider, graphql, withApollo } from 'react-apollo';

import gql from 'graphql-tag';

class PastQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            text: 'Enter text here',
            picture: '../../images/quiz_resources/quiz_backdrop_triple.png',
            questionText: 'What color is the dog? and what is the meaning of life',
            hasPicture: true,
            firstTextCorrect: true,
            inputText: '',
            secondInputText: '',
            image: '',
            c: '',
            d: '',
            options: 'meh;meh;meh;meh',
            numberOfOptions: 2,
            origA: require('../../images/quiz_resources/A_button.png'),
            origB: require('../../images/quiz_resources/B_button.png'),
            origC: require('../../images/quiz_resources/C_button.png'),
            origD: require('../../images/quiz_resources/D_button.png'),
            fillinBlank: false,
            freeResp: false,
            multiChoice: true,
        }


    }

    componentDidMount() {

        this.props.client.query({ query: gql`
                query quiz($id: Int!) {
                  quiz(id: $id) {
                    image
                    question
                  }
                }
              `,
              variables: {
                id : 1
               }}).then( data => {
              
                this.setState({
                    image: data.data.quiz.image,
                    questionText : data.data.quiz.question
                });
            }).catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                 // ADD THIS THROW error
                throw error;
        });
    }

    componentDidMountMult() {

        this.props.client.query({ query: gql`
                query quiz($id: Int!) {
                  quiz(id: $id) {
                    image
                    question
                    options
                  }
                }
              `,
              variables: {
                id : 3
               }}).then( data => {
                console.log(data);
              
                this.setState({
                    image: data.data.quiz.image,
                    questionText : data.data.quiz.question,
                    options: data.data.quiz.options
                });
            }).catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                 // ADD THIS THROW error
                throw error;
        });
    }

    setAChoiceState() {
        this.setState({
            origA: require('../../images/quiz_resources/A_button_selected.png')
        });
    }

    setBChoiceState() {
        this.setState({
            origB: require('../../images/quiz_resources/B_button_selected.png')
        });
    }

    setCChoiceState() {
        this.setState({
            origC: require('../../images/quiz_resources/C_button_selected.png')
        });
    }

    setDChoiceState() {
        this.setState({
            origD: require('../../images/quiz_resources/D_button_selected.png')
        });
    }

    resetState() {
        this.setState({
            origA: require('../../images/quiz_resources/A_button.png'),
            origB: require('../../images/quiz_resources/B_button.png'),
            origC: require('../../images/quiz_resources/C_button.png'),
            origD: require('../../images/quiz_resources/D_button.png')
        })
    }

    render() {
        const quizPicture = <Image
            source={{uri: (this.state.image)}}
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

        const fillinBox = 
            <Item success={this.state.firstTextCorrect}>
                <Input 
                placeholder='Answer'
             //   style={this.state.hasPicture ? {height:200} : {height:200}}
                
                />
                <Icon name = {this.state.firstTextCorrect ? 'checkmark-circle' : null}/>
            </Item>
        
        const checkmark = <Icon name = 'checkmark-circle'/>

        const A_button = <TouchableOpacity onPress={() => {
            this.resetState();
            this.setAChoiceState();
        }}>
            <Image
            source={this.state.origA}
        
            />
        </TouchableOpacity>

        const B_button = <TouchableOpacity onPress={() => {
            this.resetState();
            this.setBChoiceState();
        }}>
            <Image
            source={this.state.origB}
        
            />
        </TouchableOpacity>

        const C_button = <TouchableOpacity onPress={() => {
            this.resetState();
            this.setCChoiceState();
        }}>
            <Image
            source={this.state.origC}
            />
        </TouchableOpacity>

        const D_button = <TouchableOpacity onPress={() => {
            this.resetState();
            this.setDChoiceState();
        }}>
            <Image
            source={this.state.origD}
        
            />
        </TouchableOpacity>
        
        const multipleQuizCol1 =
        <View>
                <Col paddingLeft={75}>
                    <Content>
                    {A_button}
                    </Content>
                    <Content>
                    {this.state.numberOfOptions > 2 ? C_button : null}
                    </Content>
                </Col>
        </View>

        const multipleQuizCol2 =
        <View>
                <Col paddingLeft={90}>
                    <Content>
                    {B_button}
                    </Content>
                    <Content>
                    {this.state.numberOfOptions > 3 ? D_button : null}
                    </Content>
                </Col>
        </View>

        const multipleQuizAnsCol1 =
        <View>
                <Col paddingRight={60} paddingTop={70}>
                    
                    <Text style={styles.quizAnswerText}>
                        {'a.) ' + this.state.options.split(";")[0]}
                    </Text>
                    
                    <Text style={styles.quizAnswerText}>
                        {this.numberOfOptions > 2 ? 'c.) ' + this.state.options.split(";")[2] : null}
                    </Text>
                </Col>
        </View>

        const multipleQuizAnsCol2 =
        <View>
                <Col paddingRight={130} paddingTop={70}>
                    <Text style={styles.quizAnswerText}>
                        {'b.) ' + this.state.options.split(";")[1]}
                    </Text>
                    <Text style={styles.quizAnswerText}>
                        {this.numberOfOptions > 3 ? 'd.) ' + this.state.options.split(";")[3] : null}
                    </Text>
                </Col>
        </View>

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
                {this.state.multiChoice ? multipleQuizAnsCol1 : null}
                {this.state.multiChoice ? multipleQuizAnsCol2 : null}
            </Row>
            <Row size = {10}>
                {this.state.hasPicture ? quizQuestion : null}
            </Row>
            <Row size = {40} padding={8}>
                {this.state.multiChoice ? multipleQuizCol1 : null}
                {this.state.multiChoice ? multipleQuizCol2 : null}
                <Content>
                {this.state.freeResp ? answerBox : null}
                {this.state.fillinBlank ? fillinBox : null}
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

export default withApollo(PastQuiz);