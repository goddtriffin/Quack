import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid"
import { Input, Item, Content, Container, Icon } from "native-base"
import { View, Image, StatusBar, Text, Dimensions, TouchableHighlight, TouchableOpacity, TextInput, Alert } from 'react-native';
import styles from './styles';
import { NavigationActions } from 'react-navigation';
import { ApolloProvider, graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

class WriteQuiz extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null,
      })

    constructor(props) {
        super(props);
        this.sendAnswers = this.sendAnswers.bind(this);
        this.state = { 
            course: '',
            courseID: '',
            title: '',
            date: '',
            quizID: '',
            numCurrent: 0,
            numQuestions: 0,
            questions: [{
            text: 'Enter text here',
            picture: '../../images/quiz_resources/quiz_backdrop_triple.png',
            questionText: 'What color is the dog? and what is the meaning of life',
            hasPicture: true,
            firstTextCorrect: true,
            inputText: '',
            secondInputText: '',
            selectedAnswer: '',
            image: '',
            c: '',
            d: '',
            options: '',
            type: '',
            numberOfOptions: 4,
            origA: require('../../images/quiz_resources/A_button.png'),
            origB: require('../../images/quiz_resources/B_button.png'),
            origC: require('../../images/quiz_resources/C_button.png'),
            origD: require('../../images/quiz_resources/D_button.png'),
            freeResp: false,
            multiChoice: true,
            quizID: 0
            }],
        }
    }

    componentDidMount() {
        this.setState({title:this.props.navigation.state.params.title})
        this.setState({course:this.props.navigation.state.params.course})
        this.setState({course:this.props.navigation.state.params.courseID})
        this.setState({course:this.props.navigation.state.params.date})
        this.setState({course:this.props.navigation.state.params.quizID})

        this.props.client.mutate({ mutation: gql`
                mutation quizGetQuestion($courseID: Int!) {
                    quizGetQuestions(ID: $quizID){
                        id
                        type
                        options
                        image
                        isManual
                        quizID
                        qIndex
                        options
                        question
                        correctAnswer
                    }
                }
            `,
            variables: {
                courseID : this.props.navigation.state.params.quizID,
            }
            }).then( data => {
                questions = [];

                for(let i = 0; i < data.data.quizGetQuestions.length; i++) {
                    questions.push({questionText: data.data.userGetQuestions[i].question, 
                        type:data.data.userGetQuizzes[i].type, options:data.data.userGetQuizzes[i].options, image:data.data.userGetQuizzes[i].image,
                        })
                }

                switch(questions[0].type) {
                    case "SA": 
                        this.setState({freeResp: true});
                        break;
                    case "MC": 
                        this.setState({multiChoice: true});
                        break;
                    case "TF": 
                        this.setState({multiChoice: true});
                        break;
                }

            this.setState({questions});
            }).catch(function(error) {
                alert(error.message);
            });
    }

    sendAnswers() {

        this.props.client.mutate({
                mutation: gql`mutation answerCreate($input: AnswerInput) {
                    answerCreate( input: $input) {
                        id
                    }
                }`,
                variables: {
                    input: {
                        userID:1,
                        quizID: parseInt(this.state.quizID),
                        type:this.state.type,
                        content: this.state.selectedAnswer
                    }
                }
            }).then( data => { 
                console.log(data.data.answerCreate.id);
            }).catch(function(error) { 
                alert(error.message); 
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
                    onChangeText = {(text) => this.setState({selectedAnswer: text})}
                />
                </Item>

        const fillinBox = 
            <Item success={this.state.firstTextCorrect}>
                <Input 
                placeholder='Answer'
             //   style={this.state.hasPicture ? {height:200} : {height:200}}
                onChangeText = {(text) => this.setState({selectedAnswer: text})}
                />
                <Icon name = {this.state.firstTextCorrect ? 'checkmark-circle' : null}/>
            </Item>
        
        const checkmark = <Icon name = 'checkmark-circle'/>

        const A_button = <TouchableOpacity onPress={() => {
            this.resetState();
            this.setAChoiceState();
            this.setState({selectedAnswer: this.state.questions.options.split(";")[0]})
        }}>
            <Image
            source={this.state.origA}
        
            />
        </TouchableOpacity>

        const B_button = <TouchableOpacity onPress={() => {
            this.resetState();
            this.setBChoiceState();
            this.setState({selectedAnswer: this.state.questions.options.split(";")[1]})
        }}>
            <Image
            source={this.state.origB}
        
            />
        </TouchableOpacity>

        const C_button = <TouchableOpacity onPress={() => {
            this.resetState();
            this.setCChoiceState();
            this.setState({selectedAnswer: this.state.questions.options.split(";")[2]})
        }}>
            <Image
            source={this.state.origC}
            />
        </TouchableOpacity>

        const D_button = <TouchableOpacity onPress={() => {
            this.resetState();
            this.setDChoiceState();
            this.setState({selectedAnswer: this.state.questions.ptions.split(";")[3]})
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
                        {'a.) ' + this.state.questions.options.split(";")[0]}
                    </Text>
                    
                    <Text style={styles.quizAnswerText}>
                        {this.numberOfOptions > 2 ? this.state.c: null}
                    </Text>
                </Col>
        </View>

        const multipleQuizAnsCol2 =
        <View>
                <Col paddingRight={130} paddingTop={70}>
                    <Text style={styles.quizAnswerText}>
                        {'b.) ' + this.state.questions.options.split(";")[1]}
                    </Text>
                    <Text style={styles.quizAnswerText}>
                        {this.numberOfOptions > 3 ? this.state.d : null}
                    </Text>
                </Col>
        </View>

        const TrueAnswer =
        <View>
            <Col paddingRight={130} paddingTop={70}>
                <Text style={styles.quizAnswerText}>
                    True
                </Text>
            </Col>
        </View>

        const FalseAnswer =
        <View>
            <Col paddingRight={130} paddingTop={70}>
                <Text style={styles.quizAnswerText}>
                    False
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
                {this.state.TrueFalse ? TrueAnswer : null}
                {this.state.TrueFalse ? FalseAnswer : null}
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
        <TouchableOpacity style={styles.downIndicator} onPress={ () => this.props.navigation.dispatch(NavigationActions.reset({index: 0, actions: [NavigationActions.navigate({ routeName: 'Home'})]})) }>
                <Image
                    source={require('../../images/quiz_resources/close_quiz_indicator_triple.png')}
                  //  style={styles.downIndicator}
                />
    
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => this.sendAnswers()}>
                {(numQuestions == numCurrent)
                ? <Image source={require('../../images/quiz_resources/next_button.png')}/>
                : <Image source={require('../../images/quiz_resources/next_button.png')}/>
                }
            </TouchableOpacity>
            <TouchableOpacity style={styles.prevButton} onPress={() => Alert.alert("Previous question")}>
                {(numCurrent == 0)
                ?<Image source={require('../../images/quiz_resources/previous_button.png')}/>
                :null
                }
            </TouchableOpacity>
            {this.state.hasPicture ? quizPicture : null}
        </Container>
        );
    }
}

export default withApollo(WriteQuiz);