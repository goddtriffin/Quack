import React, { Component } from 'react';
import { Input, Item, Content, Container, Icon, Col, Row, Grid, Spinner } from "native-base"
import { View, Image, StatusBar, Text, Dimensions, TouchableHighlight, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, BackHandler } from 'react-native';
import styles from './styles';
import { NavigationActions } from 'react-navigation';
import { ApolloProvider, graphql, withApollo } from 'react-apollo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import gql from 'graphql-tag';

class WriteQuiz extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null,
        guesturesEnabled: false,
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
            numQuestions: '',
            origA: require('../../images/quiz_resources/A_button.png'),
            origB: require('../../images/quiz_resources/B_button.png'),
            origC: require('../../images/quiz_resources/C_button.png'),
            origD: require('../../images/quiz_resources/D_button.png'),
            firstTextCorrect: true,
            freeResp: false,
            multiChoice: false,
            loading: false,
            hasPicture: false,
            fillinBlank: false,
            selectedAnswer: '',
            text: 'Enter text here',
            questions: [{
            questionID: '',
            questionText: '',
            
            inputText: '',
            secondInputText: '',
            answer: '',
            image: '',
            c: '',
            d: '',
            options: '',
            type: '',
            numberOfOptions: 4,
            quizID: 0
            }],
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        this.setState({title:this.props.navigation.state.params.title})
        this.setState({course:this.props.navigation.state.params.course})
        this.setState({courseID:this.props.navigation.state.params.courseID})
        this.setState({date:this.props.navigation.state.params.date})
        this.setState({quizID:this.props.navigation.state.params.quizID})
        console.log(this.props.navigation.state.params.quizID)
        this.props.client.mutate({ mutation: gql`
                mutation quizGetQuestions($id: Int!) {
                    quizGetQuestions(id: $id){
                        id
                        type
                        options
                        image
                        isManual
                        quizID
                        qIndex
                        question
                        correctAnswer
                    }
                }
            `,
            variables: {
                id : this.props.navigation.state.params.quizID,
            }
            }).then( data => {
                console.log(data)
                questions = [];
            
                for(let i = 0; i < data.data.quizGetQuestions.length; i++) {
                    questions.push({
                        questionText: data.data.quizGetQuestions[i].question, 
                        type:data.data.quizGetQuestions[i].type, 
                        options:data.data.quizGetQuestions[i].options, 
                        image:data.data.quizGetQuestions[i].image,
                        isManual: data.data.quizGetQuestions[i].isManual,
                        correctAnswer:data.data.quizGetQuestions[i].correctAnswer,
                        qIndex: data.data.quizGetQuestions[i].qIndex,
                        numberOfOptions: 4,
                        questionID: data.data.quizGetQuestions[i].id,
                        answer: '',
                        

                        })
                }
                this.state.numCurrent = 0;
                for(let i = 0; i < data.data.quizGetQuestions.length; i++) {
                    questions[i].numberOfOptions = questions[i].options.split(";").length;
                    console.log(questions[i].numberOfOptions)
                    if (questions[i].numberOfOptions > 2) {
                        questions[i].c = "c.) " + questions[i].options.split(";")[2];
                        if (questions[i].numberOfOptions > 3) {
                            questions[i].d = "d.) " + questions[i].options.split(";")[3];
                        }
                    }
                }
                
                
                this.setState({numQuestions: data.data.quizGetQuestions.length})
                console.log(questions)
                switch(questions[0].type) {
                    case "sa": 
                        this.setState({freeResp: true});
                        break;
                    case "mc": 
                        this.setState({multiChoice: true});
                        break;
                    case "tf": 
                        console.log("meh")
                        this.setState({multiChoice: true});
                        break;
                    case "fb":
                        this.setState({fillinBlank: true});
                        break;
                }
                
                if (questions[0].image == '')
                    this.setState({hasPicture: false})
                else
                    this.setState({hasPicture: true})

            this.setState({questions});
            console.log(this.state.questions)
            }).catch(function(error) {
                alert(error.message);
            });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }


    sendAnswers(index) {
        console.log(this.state.questions[this.state.numCurrent].questionID)
        console.log(parseInt(this.state.quizID))
        console.log(parseInt(this.state.questions[this.state.numCurrent].questionID))
        console.log(this.state.questions[this.state.numCurrent].type)
        console.log(this.state.selectedAnswer)
        
        console.log("made it")
        if (this.state.numQuestions == index) {
            this.props.navigation.dispatch(NavigationActions.reset({index: 0, actions: [NavigationActions.navigate({ routeName: 'Home'})]}))
        }

        this.props.client.mutate({
                mutation: gql`mutation answerCreate($input: AnswerInput) {
                    answerCreate(input: $input) {
                        id
                    }
                }`,
                variables: {
                    input: {
                        userID: 3,
                        quizID: parseInt(this.state.quizID),
                        questionID: parseInt(this.state.questions[index].questionID),
                        type: this.state.questions[index].type,
                        content: this.state.questions[index].answer
                    }
                }
            }).then( data => { 
                console.log(data.data.answerCreate.id);
                let next = index + 1;
                console.log("this is next " + next)
                this.sendAnswers(next)
            }).catch(function(error) { 
                console.log(error.message); 
                 // ADD THIS THROW error 
                throw error; 
            });
    
        
            
    }

    updateState(nextArrow) {
        console.log(this.state.numCurrent)
        console.log(this.state.numQuestions)
        console.log(this.state.questions)
        if (this.state.numCurrent < this.state.numQuestions) {
            var index = 0;
            if (nextArrow == true) {
                if (this.state.numCurrent + 1 == this.state.numQuestions) {
                    for(let i = 0; i < this.state.numQuestions; i++) {
                        console.log("This is answer" + this.state.questions[i].answer)
                        if (this.state.questions[i].answer == '') {
                            Alert.alert("Please answer all questions before submitting")
                            return;
                        }
                    }
                    this.setState({multiChoice: false, freeResp: false, fillinBlank: false, hasPicture: false, loading: true}, () => this.sendAnswers(0))
                    return;
                }
                index = this.state.numCurrent + 1;
            }
            else {
                if (this.state.numCurrent - 1 < 0) {
                    return;
                }
                index = this.state.numCurrent - 1;
            }
            this.setState({numCurrent: index, freeResp: false, multiChoice: false, fillinBlank: false}, function() {
                console.log(this.state.numCurrent)
                switch(this.state.questions[this.state.numCurrent].type) {
                    case "sa": 
                        this.setState({freeResp: true});
                        break;
                    case "mc": 
                        this.setState({multiChoice: true});
                        if (this.state.questions[this.state.numCurrent].options.split(";")[0] == this.state.questions[this.state.numCurrent].answer) {
                            this.setAChoiceState();
                        }
                        if (this.state.questions[this.state.numCurrent].options.split(";")[1] == this.state.questions[this.state.numCurrent].answer) {
                            this.setBChoiceState();
                        }
                        if (this.state.questions[this.state.numCurrent].numberOfOptions > 2 && this.state.questions[this.state.numCurrent].options.split(";")[2] == this.state.questions[this.state.numCurrent].answer) {
                            this.setCChoiceState();
                        }
                        if (this.state.questions[this.state.numCurrent].numberOfOptions > 3 && this.state.questions[this.state.numCurrent].options.split(";")[3] == this.state.questions[this.state.numCurrent].answer) {
                            this.setDChoiceState();
                        }
                        break;
                    case "tf": 
                        console.log("meh")
                        this.setState({multiChoice: true});
                        if (this.state.questions[this.state.numCurrent].options.split(";")[0] == this.state.questions[this.state.numCurrent].answer) {
                            this.setAChoiceState();
                        }
                        if (this.state.questions[this.state.numCurrent].options.split(";")[1] == this.state.questions[this.state.numCurrent].answer) {
                            this.setBChoiceState();
                        }
                        break;
                    case "fb":
                        this.setState({fillinBlank: true});
                        break;
                }
                
                if (this.state.questions[this.state.numCurrent].image == '') {
                    this.setState({hasPicture: false})
                }
                else {
                    this.setState({hasPicture: true})
                }
            })
        }
        this.resetState();
        
        console.log("hasPic " + this.state.hasPicture)
        console.log(this.state.questions[this.state.numCurrent].image)
        console.log(this.state.numCurrent)
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
            source={{uri: (this.state.questions[this.state.numCurrent].image)}}
            style={styles.pictureView}
            />
        const quizQuestion = 
        <Text style={styles.quizQuestionText}>
            {this.state.loading ? null : this.state.questions[this.state.numCurrent].questionText}
        </Text>
        const answerBox = 
                <Item rounded>
                <Input 
                    placeholder='Enter text here...'
                    placeholderTextColor='white'
                    multiline={true}
                    defaultValue={this.state.questions[this.state.numCurrent].answer == '' ? '' : this.state.questions[this.state.numCurrent].answer}
                    numberOfLines={5}
                    style={{height:200, textAlignVertical: 'top', color: 'white'}}
                    onChangeText = {(text) => this.state.questions[this.state.numCurrent].answer = text}
                />
                </Item>

        const fillinBox = 
            <Item>
                <Input 
                placeholder='Answer'
                defaultValue={this.state.questions[this.state.numCurrent].answer == '' ? '' : this.state.questions[this.state.numCurrent].answer}
                placeholderTextColor='white'
                style={{color: 'white'}}
             //   style={this.state.hasPicture ? {height:200} : {height:200}}
                onChangeText = {(text) => this.state.questions[this.state.numCurrent].answer = text}
                />
                
            </Item>
        
        const checkmark = <Icon name = 'checkmark-circle'/>

        const A_button = <TouchableOpacity onPress={() => {
            this.resetState();
            this.setAChoiceState();
            this.state.questions[this.state.numCurrent].answer = this.state.questions[this.state.numCurrent].options.split(";")[0];
            console.log(this.state.questions[this.state.numCurrent].answer)
        }}>
            <Image
            source={this.state.origA}
        
            />
        </TouchableOpacity>

        const B_button = <TouchableOpacity onPress={() => {
            this.resetState();
            this.setBChoiceState();
            this.state.questions[this.state.numCurrent].answer = this.state.questions[this.state.numCurrent].options.split(";")[1];
            console.log(this.state.questions[this.state.numCurrent].answer)
        }}>
            <Image
            source={this.state.origB}
        
            />
        </TouchableOpacity>

        const C_button = <TouchableOpacity onPress={() => {
            this.resetState();
            this.setCChoiceState();
            this.state.questions[this.state.numCurrent].answer = this.state.questions[this.state.numCurrent].options.split(";")[2];
            console.log(this.state.questions[this.state.numCurrent].answer)
        }}>
            <Image
            source={this.state.origC}
            />
        </TouchableOpacity>

        const D_button = <TouchableOpacity onPress={() => {
            this.resetState();
            this.setDChoiceState();
            this.state.questions[this.state.numCurrent].answer = this.state.questions[this.state.numCurrent].options.split(";")[3];
            console.log(this.state.questions[this.state.numCurrent].answer)
        }}>
            <Image
            source={this.state.origD}
        
            />
        </TouchableOpacity>
        const answerTextA = 'a.) ' + this.state.questions[this.state.numCurrent].options.split(";")[0]
        const answerTextB = 'b.) ' + this.state.questions[this.state.numCurrent].options.split(";")[1]
        
        const multipleQuizCol1 =
        
        <View>
                <Col paddingLeft={75} paddingTop={10}>
                    <Content>
                    {A_button}
                    </Content>
                    <Content>
                    {this.state.questions[this.state.numCurrent].numberOfOptions > 2 ? C_button : null}
                    </Content>
                </Col>
        </View>

        const multipleQuizCol2 =
        <View>
                <Col paddingLeft={90} paddingTop={10}>
                    <Content>
                    {B_button}
                    </Content>
                    <Content>
                    {this.state.questions[this.state.numCurrent].numberOfOptions > 3 ? D_button : null}
                    </Content>
                </Col>
        </View>

        const multipleQuizAnsCol1 =
        <View>
                <Col>

                    <Text style={styles.quizAnswerText}>
                        {'a.) ' + this.state.questions[this.state.numCurrent].options.split(";")[0]}
                    </Text>

                    <Text style={styles.quizAnswerText}>
                        {this.state.questions[this.state.numCurrent].numberOfOptions > 2 ? this.state.c: null}
                    </Text>
                </Col>
        </View>

        const multipleQuizAnsCol2 =
        <View>
                <Col>
                    <Text style={styles.quizAnswerText}>
                        {'b.) ' + this.state.questions[this.state.numCurrent].options.split(";")[1]}
                    </Text>
                    <Text style={styles.quizAnswerText}>
                        {this.state.questions[this.state.numCurrent].numberOfOptions > 3 ? this.state.d : null}
                    </Text>
                </Col>
        </View>
        const picture = 
        <Image 
        style={styles.pictureStyle}
        source={{uri: this.state.questions[this.state.numCurrent].image}}
        resizeMode="contain"
        />

        const spin = 
            <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                <Spinner color="white"/>
            </View>
       
        
        
        return (
        <Container style={styles.background}>
            <Content scrollEnabled={false}>
            <View style={{flex: 1, height: Dimensions.get('window').height}}>
            <Grid>
            
            <Row size={3}></Row>
            <Row size ={33} style={{justifyContent: 'center', alignItems: 'center'}}>
                {this.state.hasPicture ? picture : null}
               {this.state.hasPicture ? null : quizQuestion}
            </Row>
            <Row size={5}>
            <Content>
                    {this.state.hasPicture && !this.state.loading ? quizQuestion : null}
                    
                    
            </Content>
            </Row>
            <Row size= {5}>
            <Col size = {5} style={{textAlign: 'center'}}>
                <Text style={styles.quizAnswerTextLeft}>
                {this.state.multiChoice ? answerTextA : null}
                </Text>
                <Text style={styles.quizAnswerTextLeft}>
                {this.state.multiChoice && this.state.questions[this.state.numCurrent].numberOfOptions > 2 ? this.state.questions[this.state.numCurrent].c : null}
                
                </Text>
            </Col>
            <Col size = {5} style={{textAlign: 'center'}}>
                <Text style={styles.quizAnswerTextRight}>
                {this.state.multiChoice ? answerTextB : null}
                </Text>
                <Text style={styles.quizAnswerTextRight}>
                {this.state.multiChoice && this.state.questions[this.state.numCurrent].numberOfOptions > 3 ? this.state.questions[this.state.numCurrent].d : null}
                </Text>
            </Col>
            </Row>
            <Row size = {35} padding={8}>
                
                {this.state.multiChoice ? multipleQuizCol1 : null}
                {this.state.multiChoice ? multipleQuizCol2 : null}
                
                <Content scrollEnabled={false}>
                {this.state.freeResp ? answerBox : null}
                {this.state.fillinBlank ? fillinBox : null}
                
                </Content>
                
                
                

            </Row>
            {this.state.loading ? spin : null}

            <TouchableOpacity style={styles.nextButton} onPress={() => this.updateState(true)}>
                {this.state.loading
                ? null
                : <Image source={require('../../images/quiz_resources/next_button.png')}/>
                }
            </TouchableOpacity>
            <TouchableOpacity style={styles.prevButton} onPress={() => this.updateState(false)}>
                {(this.state.numCurrent > 0 && !this.state.loading)
                ?<Image source={require('../../images/quiz_resources/previous_button.png')}/>
                :null
                }
            </TouchableOpacity>
            </Grid>
            </View>
            </Content> 
        </Container>
        );
    }
}

export default withApollo(WriteQuiz);