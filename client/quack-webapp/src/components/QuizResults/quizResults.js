import React, { Component, Fragment } from 'react';
import styles from './styles';
import { Grid, Col, Row, Button} from '../../../node_modules/react-bootstrap';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { Bar } from 'react-chartjs-2';

class QuizResults extends Component {

    state = {
        quizID: '',
        quizTitle: '',
        courseID: '',
        quizQuestions: [],
        answers: [],
        results: [],
        
    }


    constructor(props) {
        super(props)
        console.log(props.location.quizTitle);
        this.state = {
            courseID: props.location.state.courseID,
            quizID: props.match.params.quizID,
            quizTitle: props.location.state.quizTitle,
            quizQuestions: [
                {key: "1", id: '1', type: 'mc', question: "What is the capital of Ohio?", options: ["Cleveland", "Dayton", "Columbus", "Cincinnati"], image: "", answer: "Columbus"},
                {key: "2", id: '2', type: 'mc', question: "What is the capital of Michigan?", options: ["Detroit", "Lansing", "Battle Creek", "Grand Rapids"], image: "", answer: "Lansing"}
            ],
            answers: [
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Cleveland'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Cleveland'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Cleveland'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Cleveland'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Columbus'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Columbus'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Columbus'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Columbus'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Columbus'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Columbus'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Columbus'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Columbus'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Columbus'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Columbus'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Dayton'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Dayton'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Dayton'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Dayton'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Dayton'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Cincinnati'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Cincinnati'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Cincinnati'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Cincinnati'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Cincinnati'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Cincinnati'},
                {key: '1', id: '123', qNum: '1', quizID: '1', type: 'mc', content: 'Cincinnati'},
                {key: '1', id: '123', qNum: '2', quizID: '1', type: 'mc', content: 'Grand Rapids'},
                {key: '1', id: '123', qNum: '2', quizID: '1', type: 'mc', content: 'Grand Rapids'},
                {key: '1', id: '123', qNum: '2', quizID: '1', type: 'mc', content: 'Grand Rapids'},
                {key: '1', id: '123', qNum: '2', quizID: '1', type: 'mc', content: 'Grand Rapids'},
                {key: '1', id: '123', qNum: '2', quizID: '1', type: 'mc', content: 'Grand Rapids'},
                {key: '1', id: '123', qNum: '2', quizID: '1', type: 'mc', content: 'Grand Rapids'},
                {key: '1', id: '123', qNum: '2', quizID: '1', type: 'mc', content: 'Grand Rapids'},
                {key: '1', id: '123', qNum: '2', quizID: '1', type: 'mc', content: 'Grand Rapids'},
                {key: '1', id: '123', qNum: '2', quizID: '1', type: 'mc', content: 'Grand Rapids'},
                {key: '1', id: '123', qNum: '2', quizID: '1', type: 'mc', content: 'Lansing'},
                {key: '1', id: '123', qNum: '2', quizID: '1', type: 'mc', content: 'Lansing'},
                {key: '1', id: '123', qNum: '2', quizID: '1', type: 'mc', content: 'Lansing'},
                {key: '1', id: '123', qNum: '2', quizID: '1', type: 'mc', content: 'Lansing'},
                {key: '1', id: '123', qNum: '2', quizID: '1', type: 'mc', content: 'Lansing'},
                {key: '1', id: '123', qNum: '2', quizID: '1', type: 'mc', content: 'Lansing'},
                {key: '1', id: '123', qNum: '2', quizID: '1', type: 'mc', content: 'Lansing'},
                {key: '1', id: '123', qNum: '2', quizID: '1', type: 'mc', content: 'Lansing'},
                {key: '1', id: '123', qNum: '2', quizID: '1', type: 'mc', content: 'Lansing'},
                {key: '1', id: '123', qNum: '2', quizID: '1', type: 'mc', content: 'Battle Creek'},
                {key: '1', id: '123', qNum: '2', quizID: '1', type: 'mc', content: 'Battle Creek'},
                {key: '1', id: '123', qNum: '2', quizID: '1', type: 'mc', content: 'Battle Creek'},
                {key: '1', id: '123', qNum: '2', quizID: '1', type: 'mc', content: 'Battle Creek'},
                {key: '1', id: '123', qNum: '2', quizID: '1', type: 'mc', content: 'Battle Creek'},
                {key: '1', id: '123', qNum: '2', quizID: '1', type: 'mc', content: 'Battle Creek'},
                
            ],
            results: [],
        }

        this.parseAnswers = this.parseAnswers.bind(this);

    }

    render() {

        var r = this.parseAnswers();        
        var count = 0;
        const QuestionList = ({questions}) => (
            <Fragment>
                {questions.map(question => (
                    <Question key={count++} question={question} results={r} />
                ))}
            </Fragment>
        );

        console.log("Results during render: " + this.state.results);

        return(
            <div style={{width: '100%', margin: '0px', padding: '0px', overflowY: 'scroll', overflowX: 'hidden'}}>
                <Grid style={{height: '100vh', width: 'auto', margin: '0px', padding: '0px', marginBottom: '-30px', marginLeft: '20px'}} ref="mainGrid">
                    <Row>
                        <div style={{margin: '0px', padding: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'baseline'}}>
                        <h1 style={styles.title}>{this.state.quizTitle}</h1>
                        <h2 style={{...styles.subtitle, ...{marginLeft: '20px'}}}>Attendance: 69/96</h2>
                        <h2 style={{...styles.subtitle, ...{marginLeft: '20px'}}}>Date: 4/18/2018</h2>
                        </div>
                    </Row>
                    <Row>
                        <QuestionList questions={this.state.quizQuestions} />
                    </Row>
                </Grid>
            </div>
        );
    }

    parseAnswers() {

        var answers = this.state.answers;
        var questions = this.state.quizQuestions;
        var numQuestions = 0;
        for(var i = 0; i < answers.length; i++) {
            if(answers[i].qNum > numQuestions) {
                numQuestions = answers[i].qNum;
            }
        }

        var results = [];   // {key: 1, options: [x, x, x, x, etc.]}
        for(var i = 0; i < numQuestions; i++) {
            results[i] = {key: i + 1, options: []};
            for(var j = 0; j < questions[i].options.length; j++) {
                results[i].options.push(0);
            }
        }
        console.log(results)

        for(var i = 0; i < answers.length; i++) {
            var choice = questions[answers[i].qNum - 1].options.indexOf(answers[i].content);
            var numOptions = questions[answers[i].qNum - 1].options.length;
            var temp = results[answers[i].qNum - 1].options;
            var currentCount = results[answers[i].qNum - 1].options[choice];
            currentCount =  currentCount + 1;
            temp.splice(choice, 1, currentCount);
            results[answers[i].qNum - 1].options = temp;
        }

        if(this.refs.mainGrid) {
            this.setState({
                results: results,
            })
        }

        return results;
        
    }
}
export default QuizResults

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
        
        var data = {
            labels: labels,
            datasets: [{
                backgroundColor: bgColors,
                borderColor: borderColors,
                borderWidth: 1,
                data: results[this.props.question.key - 1].options,
            }]
        }

        return(
            <div>
            <div style={styles.questionTitle}>{this.props.question.key}.) {this.props.question.question}</div>
            <div style={{width: '80%', marginTop: '15px'}}>
                <Bar data={data} options={{ legend: { display: false } }}/>
            </div>
            </div>
        );
    }
}