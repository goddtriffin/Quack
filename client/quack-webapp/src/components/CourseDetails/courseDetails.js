import React from 'react';
import { Component } from 'react';
import { colors } from '../../styles/styles'
import styles from './styles'
import {  } from 'react-router-dom';
import { Grid, Col, Row, Tabs, Tab, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from '../../../node_modules/react-bootstrap'

class CourseDetails extends Component {

    state = {
        courseID: 6969,
        courseTitle: "ABC123: Course Title",
        courseDescription: "Software Engineering",
        newCourseInput: '',
    }

constructor(props) {
    console.log(props.location);
    super(props);
    this.state = {
        courseID: props.courseID,
        courseTitle: props.courseTitle,
        courseDescription: props.courseDescription,
        newCourseInput: ''
    }
    this.handleChangeT = this.handleChangeT.bind(this);
    this.handleChangeD = this.handleChangeD.bind(this);
    this.save = this.save.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
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

render() {
    
    return(
        <div >
        <Grid style={{width: 'auto'}}>
            <Row>
                <Col>
                    <h1 style={styles.header}>Course ID: {this.state.courseID}</h1>
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
        </div>
        
    );
}


}
export default CourseDetails;