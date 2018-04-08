import React, { Component, Fragment } from 'react';
import styles from './styles';
import { Grid, Col, Row, FormControl, FormGroup, ListGroup, ListGroupItem } from '../../../node_modules/react-bootstrap';

class NewQuiz extends Component {

    state = {
        courseID: '',
        quizTitle: '',
        quizQuestions: []

    }
    
    constructor(props) {
        super(props);
        this.state = {
            courseID: props.location.state.courseID,
            quizTitle: '',
            quizQuestions: [
                {key: "1", type: 'mc', question: "What is the capital of Ohio?", options: ["Cleveland", "Dayton", "Columbus", "Cincinnati"], image: ""},
                {key: "2", type: 'mc', question: "What is the capital of Michigan?", options: ["Cleveland", "Dayton", "Columbus", "Cincinnati"], image: ""},
                {key: "3", type: 'mc', question: "What is the capital of Indiana?", options: ["Cleveland", "Dayton", "Columbus", "Cincinnati"], image: ""},
                {key: "4", type: 'mc', question: "What is the capital of New York?", options: ["Cleveland", "Dayton", "Columbus", "Cincinnati"], image: ""},
                {key: "5", type: 'mc', question: "What is the capital of Illinois?", options: ["Cleveland", "Dayton", "Columbus", "Cincinnati"], image: ""},
                {key: "6", type: 'mc', question: "What is the capital of Texas?", options: ["Cleveland", "Dayton", "Columbus", "Cincinnati"], image: ""}
            ],
        }
        
        this.handleQuizTitle = this.handleQuizTitle.bind(this);
    }

    handleQuizTitle(e) {
        this.setState({quizTitle: e.target.value})
    }

    addQuestion(q) {

    }

    deleteQuestion(q) {

    }
    
    render() {




        return(
            <div style={{width: '100%', margin: '0px', padding: '0px', overflowY: 'scroll', overflowX: 'hidden'}}>
                <Grid style={{height: '92vh', width: 'auto', margin: '0px', padding: '0px', marginLeft: '20px'}}>
                    <Row>
                    <div style={{margin: '0px', padding: '0px'}}>
                    <h1 style={styles.title}>Create a new quiz</h1>
                    </div>
                    </Row>
                    <Row> 
                        <h1 style={styles.header}>Quiz title</h1>
                        <form style={{width: '500px'}}>
                            <FormGroup>
                            <FormControl type="text" value={this.state.quizTitle} placeholder={this.state.quizTitle} onChange={this.handleQuizTitle}/>
                            <FormControl.Feedback/>
                            </FormGroup>
                        </form>
                    </Row>
                    <Row >
                        <h1 style={styles.header}>Quiz questions</h1>
                        <QuizForm quizQuestions={this.state.quizQuestions} addQuestion={this.addQuestion} deleteQuestion={this.deleteQuestion}/>
                    </Row>
                </Grid>
                <div style={styles.footerRow}>
                    <div style={{display:'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', height: '100%'}}>
                        <button style={styles.saveButton}>Save and return <span>&#8594;</span></button>
                    </div>
                </div>
            </div>
        );
    }
}
export default NewQuiz;


class QuizForm extends Component {

    newQuestion() {
        this.props.addQuestion("test");
    }

    deleteQuestion() {
        this.props.deleteQuestion("test");
    }

    render() {
        // loop through quizQuestions array and render a {QuizQuestion} component for each
        var count = 0;
        const QuestionList = ({questions}) => (
            <Fragment>
                {questions.map(question => (
                    <QuizQuestion key={count++} question={question} />
                ))}
            </Fragment>
        );

        return(
            <QuestionList questions={this.props.quizQuestions} />
        );
    }
}

class QuizQuestion extends Component {

    state = {
        selected: ''
    }

    constructor(props) {
        super(props);
        this.state = {
            selected: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({selected: e.target.value})
    }


    render() {
        
        const question = this.props.question.question;
        var options = this.props.question.options;
        const image = this.props.question.image;
        const type = this.props.question.type;
        const num = this.props.question.key;

        // MC
        const optionsList = options.map((choice) =>
            
            <div key={choice.toString()} className="radio">
                <label>
                <input type="radio" value={`${choice}`} checked={this.state.selected===`${choice}`} onChange={this.handleChange} />
                    {choice}
                </label>
            </div>
            
        );

        return(
            <div style={{width: '60%'}}>
                <h1 style={styles.questionTitle}>{num}.) {question}</h1>
                <form>
                    {optionsList}
                </form>
            </div>
        );

        // True/false

        // Short answer

        // Fill in the blank

    }
}
