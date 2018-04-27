import React, { Component, Fragment } from 'react';
import styles from './styles';
import { Grid, Col, Row, Button, Modal} from '../../../node_modules/react-bootstrap';
import { Link } from 'react-router-dom';
import { Doughnut, Bar } from 'react-chartjs-2';
import io from 'socket.io-client';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import styled, { keyframes } from 'styled-components';

class StartQuiz extends Component {

    state = {
        quizID: '',
        quizQuestions: [],
        answers: [],
        quizTitle: '',
        courseID: '',
        attendance: 0,
        sectionSize: 0,
        data: [],
        showOptions: false,
        password: false,
        quizPassword: "",
        results: [],
        loaded: false,
        
    }

    labels = ['Finished', 'Incomplete'];
    bgColors = ['#057B65', '#A1A1A1'];
    bColors = ['#046150', '#5A5A5A'];

    constructor(props) {
        super(props)

        // need to download quiz questions, section size

        this.state = {
            courseID: props.location.state.courseID,
            quizID: props.match.params.quizID,
            quizTitle: props.location.state.quizTitle,
            attendance: 0,
            sectionSize: 0,
            quizQuestions: [],
            answers: [],
            data: [0, 69],
            showOptions: true,
            password: false,
            quizPassword: "",
            results: [],
            loaded: false,
        }

        this.update = this.update.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.yes = this.yes.bind(this);
        this.no = this.no.bind(this);

        const socket = io('http://endor-vm2.cs.purdue.edu:5000');
        socket.emit("subscribe", "quiz_answer_created", props.match.params.quizID);
        socket.on("quiz_answer_created", this.update);

        this.download = this.download.bind(this);
        this.setLive = this.setLive.bind(this);

    }

    componentDidMount() {
        this.setLive();
        setTimeout(this.download, 200);
        //this.download();
    }

    setLive = async() => {

        await this.props.client.mutate({
            mutation: gql`mutation quizUpdate($id: Int!, $input: QuizInput) {
                quizUpdate(id: $id, input: $input) {
                    id
                }
            }`,
            variables: {
                id: this.state.quizID,
                input: {
                    title: this.state.quizTitle,
                    courseID: this.state.courseID,
                    qCount: this.state.quizQuestions.length,
                    date: '',
                    isOpen: true

                }
            }
        })
    }

    update(answer) {
        
        console.log("Quiz update received");
        console.log(answer);
        this.download();
        
    }
    
    handleClose() {
        this.setState({ showOptions: false })
    }

    yes() {
        this.setState({ showOptions: false, password: true })
    }

    no() {
        this.setState({ showOptions: false, password: false })
    }

    save = async() => {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        } 
        if(mm<10){
            mm='0'+mm;
        } 
        var today = mm+'/'+dd+'/'+yyyy;

        await this.props.client.mutate({
            mutation: gql`mutation quizUpdate($id: Int!, $input: QuizInput) {
                quizUpdate(id: $id, input: $input) {
                    id
                }
            }`,
            variables: {
                id: this.state.quizID,
                input: {
                    title: this.state.quizTitle,
                    courseID: this.state.courseID,
                    qCount: this.state.quizQuestions.length,
                    date: today,
                    isOpen: false,
                }
            }
        })
    }

    download = async() => {
        var quizResults = [];
        var quizQuestions = [];
        var qu = 2;

        await this.props.client.query({
            query: gql`
                query quiz($id: Int!) {
                quiz(id: $id) {
                  id
                  title
                  date
                }
              }`,
            variables: {
                id: this.state.quizID,
            }
        }).then( data => { 
            console.log("-----QUIZ-----");
            console.log(data);
            this.setState({
                quizDate: data.data.quiz.date,
            })
        })

        await this.props.client.mutate({
            mutation: gql`
                mutation quizGetQusetions($id: Int!) {
                    quizGetQuestions(id: $id) {
                        id
                        question
                        options
                        correctAnswer
                        type
                    }
                }`,
                variables: {
                    id: this.state.quizID,
                }
        }).then(quest => {
            console.log(quest);
            qu = quest;
        }) 

        //while(qu != 2);

        console.log(qu);
        var i;
        for(i = 0; i < qu.data.quizGetQuestions.length; i++){
            var q = qu.data.quizGetQuestions[i];
            if(q.type == "sa" || q.type == 'fb') {
                await this.props.client.mutate({
                    mutation: gql`
                    mutation quizGetAnswers($id: Int!) {
                        quizGetAnswers(id: $id){ 
                            content
                            questionID
                        }  
                    }`, variables: {
                        id: this.state.quizID
                    }
                }).then(content => {
                    console.log(content)
                    quizResults.push([]);
                    var ar = [];
                    for(var j = 0; j < content.data.quizGetAnswers.length; j++) {
                        if(content.data.quizGetAnswers[j].questionID == q.id) {
                            ar.push(content.data.quizGetAnswers[j].content)
                        }
                    }
                    quizQuestions.push({key: i + 1, num: i+1, type: q.type, question: q.question, options: [], content: ar })
                    
                })
            }else {
                await this.props.client.mutate({
                    mutation: gql`
                    mutation quizGetStats($questionID: Int!) {
                        quizGetStats(questionID: $questionID)  
                    }`, variables: {
                        questionID: q.id
                    }
                }).then(stats => {
                    quizResults.push(stats.data.quizGetStats)
                    if(q.type == "tf") {
                        quizQuestions.push({key: i + 1, num: i+1, type: q.type, question: q.question, options: ["True", "False"], answer: q.correctAnswer })
                    }else {
                        quizQuestions.push({key: i + 1, num: i+1, type: q.type, question: q.question, options: q.options.split(";"), answer: q.correctAnswer })
                    }
                })
            }
            console.log("QUESTION ID = " + q.id);
            
            
            
        }

        console.log(quizResults);
        console.log(quizQuestions);
        this.setState({
            results: quizResults,
            quizQuestions: quizQuestions,
            loaded: true,
        })
        
    }
    

    render() {

        const blink = keyframes` 
            from { opacity: 1; }
            to { opacity: 0; }
        `
        const Dot = styled.div`
            animation:  ${blink} 1s cubic-bezier(.5, 0, 1, 1) infinite alternate;
        `

        var r = this.state.results;
        var quizPassword = "";        
        var count = 0;
        const QuestionList = ({questions}) => (
            <Fragment>
                {questions.map(question => (
                    <Question key={count++} question={question} results={r} />
                ))}
            </Fragment>
        );

        const data = {
            labels: this.labels,
            datasets: [{
                data: this.state.data,
                backgroundColor: this.bgColors,
                hoverBackgroundColor: this.bColors,
            }]
        }

        if(this.state.password) {
            // generate password

            quizPassword = "password"
        }

        console.log(this.state.loaded);
        if(this.state.loaded == false) {
            return(
            <div style={{width: '100%', margin: '0px', padding: '0px', overflowY: 'scroll', overflowX: 'hidden'}}>
                
                <Grid style={{height: '92vh', width: 'auto', margin: '0px', padding: '0px', marginBottom: '-30px', marginLeft: '20px'}} ref="mainGrid">
                    <Row>
                        <div style={{margin: '0px', padding: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'baseline'}}>
                        <h1 style={styles.title}>{this.state.quizTitle}</h1>
                        <h2 style={{...styles.subtitle, ...{marginLeft: '20px'}}}>Live</h2>
                        <Dot>
                            <svg height="50" width="50">
                                <circle cx="15" cy="43" r="6" strokeWidth="3" fill="#C73700" />
                            </svg>
                        </Dot>
                        </div>
                    </Row>
                    
                    <Row>
                        <h1 style={styles.loading}>Loading...</h1>
                    </Row>
                </Grid>

                <div style={styles.footerRow}>
                    <div style={{display:'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', height: '100%'}}>
                        <Link to={{pathname: '/course/' + this.state.courseID + '/view/' + this.state.quizID, 
                            state: {courseID: this.props.courseID, quizTitle: this.props.location.state.courseTitle, quizID: this.state.quizID}
                        }} style={styles.saveButton} onClick={this.save}>Close quiz & view results <span>&#8594;</span></Link>
                    </div>
                </div>
            </div>
            );
        }
        return(
            <div style={{width: '100%', margin: '0px', padding: '0px', overflowY: 'scroll', overflowX: 'hidden'}}>
                
                <Grid style={{height: '92vh', width: 'auto', margin: '0px', padding: '0px', marginBottom: '-30px', marginLeft: '20px'}} ref="mainGrid">
                    <Row>
                        <div style={{margin: '0px', padding: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'baseline'}}>
                        <h1 style={styles.title}>{this.state.quizTitle}</h1>
                        <h2 style={{...styles.subtitle, ...{marginLeft: '20px'}}}>Live</h2>
                        <Dot>
                            <svg height="50" width="50">
                                <circle cx="15" cy="43" r="6" strokeWidth="3" fill="#C73700" />
                            </svg>
                        </Dot>
                        </div>
                    </Row>
                    
                    <Row>
                        <QuestionList questions={this.state.quizQuestions} />
                    </Row>
                </Grid>

                <div style={styles.footerRow}>
                    <div style={{display:'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', height: '100%'}}>
                        <Link to={{pathname: '/course/' + this.state.courseID + '/view/' + this.state.quizID, 
                            state: {courseID: this.props.courseID, quizTitle: this.props.location.state.quizTitle, quizID: this.state.quizID}
                        }} style={styles.saveButton} onClick={this.save}>Close quiz & view results <span>&#8594;</span></Link>
                    </div>
                </div>
            </div>
        );
    }

}
export default withApollo(StartQuiz)

class Question extends Component {

    constructor(props) {
        super(props);
        console.log(props)
    }

    // results for question are in results[questionKey - 1]

    render() {

        // create data object
        var bgColors = [];
        var borderColors = [];
        var labels = [];
        var results = this.props.results;
        var correctIndex = this.props.question.options.indexOf(this.props.question.answer);
        var type = this.props.question.type;
        var question = this.props.question;
        
        if(results.length == 0) {
            return(
                <div>
                <div style={styles.questionTitle}>{this.props.question.num}.) {this.props.question.question}</div>
                <div style={{width: '80%', marginTop: '15px', marginBottom: '20px'}}>
                    <div style={{fontFamily: 'Fira Sans', fontStyle: 'italic'}}>No answers for this question</div>
                </div>
                </div>
            )
        }else if(type == "fb") {
            var responses = [];
            for (var k = 0; k < question.content.length; k++) {
                responses.push(<div style={{paddingLeft: '1em'}} key={k}>{k+1}. {question.content[k]}</div>);
            }
            return(
                <div>
                <div style={styles.questionTitle}>{this.props.question.num}.) {this.props.question.question}</div>
                <div style={{fontFamily: 'Fira Sans', color: '#5A5A5A', fontSize: '13pt'}}>Responses:</div>
                <div style={{width: '80%', marginTop: '5px', marginBottom: '20px'}}>
                    <div style={{fontFamily: 'Fira Sans', fontSize: '12pt', color: 'black'}}>{responses}</div>
                </div>
                </div>
            )
        }else if (type == "sa") {
            var responses = [];
            for (var k = 0; k < question.content.length; k++) {
                responses.push(<div style={{paddingLeft: '1em'}} key={k}>{k+1}. {question.content[k]}</div>);
            }
            return(
                <div>
                <div style={styles.questionTitle}>{this.props.question.num}.) {this.props.question.question}</div>
                <div style={{fontFamily: 'Fira Sans', color: '#5A5A5A', fontSize: '13pt'}}>Responses:</div>
                <div style={{width: '80%', marginTop: '5px', marginBottom: '20px'}}>
                    <div style={{fontFamily: 'Fira Sans', fontSize: '12pt', color: 'black'}}>{responses}</div>
                </div>
                </div>
            )
        }
        for(var i = 0; i < this.props.question.options.length; i++) {
            if(i == correctIndex) {
                bgColors.push('#057B65');
                borderColors.push('#046150');
            }else {
                bgColors.push('#A1A1A1');
                borderColors.push('#5A5A5A');
            }

            labels.push(this.props.question.options[i].toString());
        }
        console.log(results[this.props.question.num - 1]);
        var thisdata = {
            labels: labels,
            datasets: [{
                backgroundColor: bgColors,
                borderColor: borderColors,
                borderWidth: 1,
                data: results[this.props.question.num - 1],
            }]
        }

        console.log(thisdata);

        return(
            <div>
            <div style={styles.questionTitle}>{this.props.question.key}.) {this.props.question.question}</div>
            <div style={{width: '80%', marginTop: '15px'}}>
                <Bar data={thisdata} options={{ legend: { display: false }, scales: { yAxes: [{ ticks: { beginAtZero: true, min: 0 } }] } }}/>
            </div>
            </div>
        );
    }
}