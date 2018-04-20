import React from 'react';
import { Component } from 'react';
import { colors } from '../../styles/styles'
import styles from './styles'
import {  } from 'react-router-dom';
import { Grid, Col, Row, Tabs, Tab, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Modal } from '../../../node_modules/react-bootstrap'

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
    console.log(props.location);
    super(props);
    this.state = {
        courseID: props.courseID,
        courseTitle: props.courseTitle,
        courseDescription: props.courseDescription,
        newCourseInput: '',
        show: false,
        feedback: "",
    }
    this.handleChangeT = this.handleChangeT.bind(this);
    this.handleChangeD = this.handleChangeD.bind(this);
    this.save = this.save.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.handleChangeFeedback = this.handleChangeFeedback.bind(this);
    this.showFeedback = this.showFeedback.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submit = this.submit.bind(this)
}

  getValidationState() {
    if(this.state.newCourseInput.length === 0) {
      return null;
    }
    var string = this.state.newCourseInput;
    var colon = ":";
    if(string.includes(colon)) {
      return 'success';
    }else {
      return 'error';
    }
  }

  handleChangeT(e) {
    this.setState({courseTitleInput: e.target.value})
  }

  handleChangeD(e) {
    this.setState({courseDescriptionInput: e.target.value})
  }

  save() {
    console.log("saving...")
    this.props.callback(this.state.courseTitleInput, this.state.courseDescriptionInput);
  }

  handleChangeFeedback(e) {
      this.setState({feedback: e.target.value})
  }

  handleClose() {
    this.setState({show: false, feedback: ""})
  }

  submit() {
    var feedback = this.state.feedback;
      if(feedback == "") {
          this.setState({show: false, feedback: ""})
      }else {
          // submit feedback
          console.log("SUBMITTING")
          this.setState({show: false})
      }
  }

  showFeedback() {
      this.setState({show: true})
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
                    <h1 style={styles.header}>Course title</h1>
                    <form style={{width: '500px'}}>
                        <FormGroup validationState={this.getValidationState()}>
                        <FormControl type="text" value={this.state.courseTitleInput} placeholder={this.state.courseTitle} onChange={this.handleChangeT}/>
                        <FormControl.Feedback/>
                        <HelpBlock>Example: "CS307: Software Engineering"</HelpBlock>
                        </FormGroup>
                    </form>

                    <h1 style={styles.header}>Course description</h1>
                    <form style={{width: '500px'}}>
                        <FormGroup controlId="formControlsTextarea">
                        <FormControl style={{height: '120px'}} componentClass="textarea" value={this.state.courseDescriptionInput} placeholder={this.state.courseDescription} onChange={this.handleChangeD}/>
                        <FormControl.Feedback/>
                        </FormGroup>
                    </form>
                    <Button style={{color: '#057B65'}} onClick={this.save}>Save</Button>
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
export default CourseDetails;