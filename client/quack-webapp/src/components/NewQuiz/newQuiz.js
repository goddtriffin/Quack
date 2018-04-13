import React, { Component, Fragment } from 'react';
import styles from './styles';
import { Grid, Col, Row, FormControl, FormGroup, 
    ListGroup, ListGroupItem, Modal, ControlLabel, 
    Button, DropdownButton, MenuItem, ButtonToolbar } from '../../../node_modules/react-bootstrap';

class NewQuiz extends Component {

    state = {
        courseID: '',
        quizTitle: '',
        quizQuestions: [],
        show: false,
        newQuestionText: "",
        newQuestionType: "",
        newQuestionOptions: [],
        newQuestionImage: "",
        newQuestionAnswer: "",
        newQuestionTypeText: "",
        newQuestionMCoptions: ["", ""],
        newQuestionMCnum: 2
    }
    
    constructor(props) {
        super(props);
        this.state = {
            courseID: props.location.state.courseID,
            quizTitle: '',
            quizQuestions: [
                {key: "1", type: 'mc', question: "What is the capital of Ohio?", options: ["Cleveland", "Dayton", "Columbus", "Cincinnati"], image: "", answer: ""},
                {key: "2", type: 'mc', question: "What is the capital of Michigan?", options: ["Cleveland", "Dayton", "Columbus", "Cincinnati"], image: "", answer: ""},
                {key: "3", type: 'mc', question: "What is the capital of Indiana?", options: ["Cleveland", "Dayton", "Columbus", "Cincinnati"], image: "", answer: ""},
                {key: "4", type: 'mc', question: "What is the capital of New York?", options: ["Cleveland", "Dayton", "Columbus", "Cincinnati"], image: "", answer: ""},
                {key: "5", type: 'mc', question: "What is the capital of Illinois?", options: ["Cleveland", "Dayton", "Columbus", "Cincinnati"], image: "", answer: ""},
                {key: "6", type: 'mc', question: "What is the capital of Texas?", options: ["Cleveland", "Dayton", "Columbus", "Cincinnati"], image: "", answer: ""}
            ],
            show: false,
            newQuestionText: "",
            newQuestionType: 0,
            newQuestionOptions: [],
            newQuestionImage: "",
            newQuestionAnswer: "",
            newQuestionTypeText: "Question type",
            newQuestionMCoptions: ["", ""],
            newQuestionMCnum: 2,

        }
        
        this.handleQuizTitle = this.handleQuizTitle.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.setAnswer = this.setAnswer.bind(this);
        this.handleChangeQT = this.handleChangeQT.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleQuestionType = this.handleQuestionType.bind(this);
        this.handleMCChange = this.handleMCChange.bind(this);
        this.addMCOption = this.addMCOption.bind(this);
    }

    handleQuizTitle(e) {
        this.setState({quizTitle: e.target.value})
    }

    addQuestion() {
        console.log("Add question!")
        this.setState({show: true});
    }

    deleteQuestion(q) {

    }

    setAnswer(q, answer) {
        // loop through array for matching question and set answer
        var questions = this.state.quizQuestions.slice();
        questions.map((question) => {
            if(question.question == q) {
                question.answer = answer;
                return;
            }
        });
        
        this.setState({quizQuestions: questions});
        console.log(this.state.quizQuestions);
    }


    handleClose() {
        var qType = this.state.newQuestionType;
        var questions = this.state.quizQuestions.slice();
        if(qType == 1) {
            // add MC question
            var newQ = {key: this.state.quizQuestions.length + 1, type: "mc", 
                question: this.state.newQuestionText, options: this.state.newQuestionMCoptions,
                image: "", answer: "" };
            questions.push(newQ);
            this.setState({
                quizQuestions: questions,
                show: false, newQuestionMCnum: 2, newQuestionType: 0, 
                newQuestionTypeText: 'Question type', newQuestionText: ""
            })
        }else if(qType == 2) {
            // add t/f question
            var newQ = {key: this.state.quizQuestions.length + 1, type: "tf", 
                question: this.state.newQuestionText, options: "",
                image: "", answer: "" };
            questions.push(newQ);
            this.setState({
                quizQuestions: questions, show: false, newQuestionMCnum: 2,
                newQuestionType: 0, newQuestionTypeText: 'Question type', newQuestionText: ""
            })
        }else if(qType == 3) {
            // add fill-in-the-blank quetion
            var newQ = {key: this.state.quizQuestions.length + 1, type: "fb", 
                question: this.state.newQuestionText, options: "",
                image: "", answer: "" };
            questions.push(newQ);
            this.setState({
                quizQuestions: questions, show: false, newQuestionMCnum: 2,
                newQuestionType: 0, newQuestionTypeText: 'Question type', newQuestionText: ""
            })
        }else if(qType == 4) {
            // add short answer question
            var newQ = {key: this.state.quizQuestions.length + 1, type: "sa", 
                question: this.state.newQuestionText, options: "",
                image: "", answer: "" };

            questions.push(newQ);
            this.setState({
                quizQuestions: questions, show: false, newQuestionMCnum: 2,
                newQuestionType: 0, newQuestionTypeText: 'Question type', newQuestionText: ""
            })
        }else {
            // just close
            this.setState({show: false, newQuestionText: "", newQuestionMCnum: 2, newQuestionType: 0, newQuestionTypeText: 'Question type', newQuestionMCoptions: []});
        }
        
        
    
    }
    
    
    handleChangeQT(e) {
        this.setState({newQuestionText: e.target.value})
    }

    handleQuestionType(e, type) {
        var typeText = "";
        if(type == 1) {
            typeText = "Multiple choice"
        }else if(type == 2) {
            typeText = "True/false"
        }else if(type == 3) {
            typeText = "Fill-in-the-blank"
        }else {
            typeText = "Short answer"
        }

        this.setState({newQuestionTypeText:  typeText, newQuestionType: type});
    }

    handleMCChange(num, e) {
        console.log("Option " + num + ": " + e.target.value);
        var n;
        var MCoptions = this.state.newQuestionMCoptions;
        console.log(MCoptions)
        MCoptions.splice(`${num - 1}`, 1, e.target.value);
        this.setState({newQuestionOptions: MCoptions});
        console.log(MCoptions);
    }

    addMCOption() {
        var num = this.state.newQuestionMCnum;
        num++;
        var mcOptions = this.state.newQuestionMCoptions.slice();
        mcOptions.splice(num, 0, "");
        this.setState({newQuestionMCnum: num, newQuestionMCoptions: mcOptions});
    }

    NewQuestionForm = ({type}) => {
        if(type == 1) {
            // mc question

            var optionInputs = [];
            for(var i = 1; i < this.state.newQuestionMCnum + 1; i++) {
                optionInputs.push(<div key={`${i}`} style={{marginTop: '10px'}}><ControlLabel>Option {i}</ControlLabel>
                    <FormControl key={`${i}`} type="text"  value={this.state.newQuestionMCoptions[i - 1]} placeholder="" onChange={this.handleMCChange.bind(this, i)}/></div>);
            }

            return(
                <div>
                    
                    <form>
                        <FormGroup>
                            {optionInputs}
                        </FormGroup>
                    </form>
                </div>
            );
        }else if(type == 2) {
            // true/false
            return(
                <div>
                
                </div>
            );
        }else if(type == 3) {
            // fill-in-the-blank
            return null;
        }else if(type == 4){
            // short answer
            return null;
        }else {
            return(<p style={{fontFamily: 'Fira Sans', color: '#5A5A5A', fontSize: '12pt', fontWeight: 'regular'}}>
                Choose question type</p>);
        }
    }
    
    render() {

        

        const AddOptionButton = ({type}) => {
            if(type == 1) {
                return(<button style={styles.addQuestionButton} onClick={this.addMCOption}>add option</button>);
            }else {
                return null;
            }
        }

        return(
            <div style={{width: '100%', margin: '0px', padding: '0px', overflowY: 'scroll', overflowX: 'hidden'}}>
                <div>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>New Question</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <FormGroup>
                                <ControlLabel>Enter question</ControlLabel>
                                <FormControl type="text" value={this.state.newQuestionText} placeholder="Question text" onChange={this.handleChangeQT}/>
                                <FormControl.Feedback/>
                                </FormGroup>
                            </form>
                            
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <DropdownButton
                                bsStyle="default"
                                title={this.state.newQuestionTypeText}
                                id="question-type-dropdown">
                                <MenuItem eventKey={1} onSelect={(e) => this.handleQuestionType(e, 1)}>Multiple choice</MenuItem>
                                <MenuItem eventKey={2} onSelect={(e) => this.handleQuestionType(e, 2)}>True/false</MenuItem>
                                <MenuItem eventKey={3} onSelect={(e) => this.handleQuestionType(e, 3)}>Fill-in-the-blank</MenuItem>
                                <MenuItem eventKey={4} onSelect={(e) => this.handleQuestionType(e, 4)}>Short answer</MenuItem>
                            </DropdownButton>
                            <AddOptionButton type={this.state.newQuestionType} />
                            </div>

                            <div style={{marginTop: '30px'}}>
                                <this.NewQuestionForm type={this.state.newQuestionType}/>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleClose}>Add</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <Grid style={{height: '92vh', width: 'auto', margin: '0px', padding: '0px', marginBottom: '-30px', marginLeft: '20px'}}>
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
                    <Row style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                        <h1 style={styles.header}>Quiz questions</h1>
                        <button onClick={this.addQuestion} style={styles.button}>
                            add question
                        </button>
                    </Row>
                    <Row>
                        <QuizForm quizQuestions={this.state.quizQuestions} addQuestion={this.addQuestion} deleteQuestion={this.deleteQuestion} setAnswer={this.setAnswer}/>
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

    constructor(props) {
        super(props);

        this.setAnswer = this.setAnswer.bind(this);
    }

    newQuestion() {
        this.props.addQuestion("test");
    }

    deleteQuestion() {
        this.props.deleteQuestion("test");
    }

    setAnswer(question, answer) {
        this.props.setAnswer(question, answer);  // pass data up again to NewQuiz, where state and the array are
    }

    render() {
        // loop through quizQuestions array and render a {QuizQuestion} component for each
        var count = 0;
        const QuestionList = ({questions}) => (
            <Fragment>
                {questions.map(question => (
                    <QuizQuestion key={count++} question={question} setAnswer={this.setAnswer}/>
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

    handleChange(e, question) {
        var answer = e.target.value;
        this.setState({selected: e.target.value})
        this.props.setAnswer(question, answer); // pass data up to QuizForm
    }


    render() {
        
        const question = this.props.question.question;
        var options = this.props.question.options;
        const image = this.props.question.image;
        const type = this.props.question.type;
        const num = this.props.question.key;
        const answer = this.props.question.answer;

        // MC
        if(type == "mc") {
            const optionsList = options.map((choice) =>
                
                <div key={choice.toString()} className="radio">
                    <label>
                    <input id={question} type="radio" value={`${choice}`} checked={answer===`${choice}`} onChange={(e) => this.handleChange(e, question)} />
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
        
        }else if(type == "tf") {
            // True/false
            const optionList = (
                <div>
                <div key="true" className="radio">
                    <label>
                        <input id="true" type="radio" value="True" checked={answer === "True"} onChange={(e) => this.handleChange(e, question)} />
                        True
                    </label>
                </div>
                <div key="false" className="radio">
                    <label>
                        <input id="false" type="radio" value="False" checked={answer === "False"} onChange={(e) => this.handleChange(e, question)} />
                        False
                    </label>
                </div>
                </div>
            )

            return(
                <div style={{width: '60%'}}>
                    <h1 style={styles.questionTitle}>{num}.) {question}</h1>
                    <form>
                        {optionList}
                    </form>
                </div>
            );

        }else if(type == "fb") {
            // Fill in the blank

            return (
                <div style={{width: '60%'}}>
                    <h1 style={styles.questionTitle}>{num}.) {question}</h1>
                    <h3 style={styles.accent}>Fill-in-the-blank question</h3>
                </div>
            );
        }else if(type == "sa") {
            // Short answer
            return (
                <div style={{width: '60%'}}>
                    <h1 style={styles.questionTitle}>{num}.) {question}</h1>
                    <h3 style={styles.accent}>Short answer question</h3>
                </div>
            );
        }else {
            return null;
        }
        

    }
}
