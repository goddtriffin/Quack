import React from 'react';
import { Component } from 'react';
import { colors } from '../../styles/styles'
import styles from './styles'
import { graphql, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'
import { Grid, Col, Row, Tabs, Tab, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Modal, Panel } from '../../../node_modules/react-bootstrap'

class CourseDetails extends Component {
    state = {
        courseID: '',
        courseTitle: "ABC123: Course Title",
        courseDescription: "Software Engineering",
        newCourseInput: '',
        show: false,
        feedback: "",
    }

    constructor(props) {
        super(props);

        this.state = {
            courseID: props.courseID,
            courseTitle: props.courseTitle,
            courseDescription: "",
            newCourseInput: '',
            show: false,
            feedback: "",
            userID: localStorage.getItem("userID")
        }
        this.handleChangeT          = this.handleChangeT.bind(this);
        this.handleChangeD          = this.handleChangeD.bind(this);
        this.getValidationState     = this.getValidationState.bind(this);
        this.handleChangeFeedback   = this.handleChangeFeedback.bind(this);
        this.showFeedback           = this.showFeedback.bind(this);
        this.handleClose            = this.handleClose.bind(this);
        this.submit                 = this.submit.bind(this)
        this.getCourseInfo          = this.getCourseInfo.bind(this);
    }

    getValidationState() {
        if (this.state.newCourseInput.length === 0) {
            return null;
        }

        var string = this.state.newCourseInput;
        var colon = ":";
        if (string.includes(colon)) {
            return 'success';
        } else {
            return 'error';
        }
    }

    handleChangeT (e) {
        this.setState({courseTitleInput: e.target.value})
    }

    handleChangeD (e) {
        this.setState({courseDescriptionInput: e.target.value})
    }

    getCourseInfo () {
        this.props.client.query({
            query: gql`query course($id: Int!) {
                course(id: $id) {
                    description
                    name
                }
            }`,
            variables: {
                id: this.state.courseID
            }
        }).then(data => {
            this.setState({courseDescription: data.data.course.description})
        })
    }

    componentDidMount () {
        setTimeout(this.getCourseInfo, 200);
    }

    handleChangeFeedback (e) {
        this.setState({feedback: e.target.value})
    }

    handleClose () {
        this.setState({show: false, feedback: ""})
    }

    submit = async() => {
        var feedback = this.state.feedback;
        if (feedback == "") {
            this.setState({show: false, feedback: ""})
        } else {
            // submit feedback
            await this.props.client.mutate({
                mutation: gql`mutation feedbackCreate($input: FeedbackInput) {
                    feedbackCreate( input: $input) {
                        id
                    }
                }`,
                variables: {
                    input: {
                        userID: this.state.userID,
                        content: this.state.feedback,
                        date: 'now'
                    }
                }
            }).then( data => {
                this.setState({show: false})
            });
        }
    }

    showFeedback() {
        this.setState({show: true});
    }

    render() {
        
        return(
            <div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Send Feedback</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form>
                            <FormGroup>
                                <ControlLabel>Type a response</ControlLabel>

                                <FormControl style={{height: '120px'}} type="text" componentClass="textarea" value={this.state.feedback} placeholder="" onChange={this.handleChangeFeedback}/>
                                <FormControl.Feedback/>
                            </FormGroup>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.submit}>Submit</Button>
                    </Modal.Footer>
                </Modal>

                <Grid style={{width: 'auto'}}>
                    <Row>
                        <Col>
                            <h1 style={styles.emphasis}>Course ID: {this.state.courseID}</h1>
                        
                            <h1 style={styles.header}>Course description</h1>
                            
                            <div >
                                <Panel style={{width: '60%', height: '250px'}}><Panel.Body>{this.state.courseDescription}</Panel.Body></Panel>
                            </div>
                        </Col>
                    </Row>
                </Grid>

                <div style={styles.footerRow}>
                    <div style={{display:'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', height: '100%'}}>
                        <button onClick={this.showFeedback} style={styles.button}><div style={styles.buttonText}>Submit Feedback to Quack</div></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withApollo(CourseDetails);