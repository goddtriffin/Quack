import React, { Component, Fragment } from 'react';
import styles from './styles';
import { Grid, Col, Row, Button} from '../../../node_modules/react-bootstrap';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { Bar } from 'react-chartjs-2';
import { graphql, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

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
            quizQuestions: [],
            results: [],
        }
        this.download = this.download.bind(this);
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
        })
        
    }

    componentWillMount() {
        setTimeout(this.download, 200);
    }

    render() {

        var r = this.state.results.slice();   
        console.log(this.state.results);
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
                        <h2 style={{...styles.subtitle, ...{marginLeft: '20px'}}}>Date: {this.state.quizDate}</h2>
                        </div>
                    </Row>
                    <Row>
                        <QuestionList questions={this.state.quizQuestions} />
                    </Row>
                </Grid>
            </div>
        );
    }

}
export default withApollo(QuizResults)

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