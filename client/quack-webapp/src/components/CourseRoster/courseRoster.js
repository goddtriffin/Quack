import React from 'react';
import { Component } from 'react';
import { colors } from '../../styles/styles'
import styles from './styles'
import {  } from 'react-router-dom';
import { Grid, Col, Row, Tabs, Tab, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Nav, NavItem } from '../../../node_modules/react-bootstrap'

class CourseRoster extends Component {

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
        courseSections: [],
        courseRoster: []
    }
    
}



render() {
    
    return(
        <div >
        <Grid style={{width: 'auto'}}>
            <Row style={{marginTop: '20px'}}>
                <Col sm={3} style={{paddingLeft: '0px'}}>
                    <h1 style={styles.header}>Sections</h1>
                </Col>
                <Col sm={9} style={{paddingLeft: '0px'}}>
                <h1 style={styles.header}>Roster</h1>
                </Col>
            </Row>
            <Row>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row className="clearfix">
                        <Col sm={3}>
                        <Nav bsStyle="pills" stacked>
                            <NavItem eventKey="first">Section 1 - 11am</NavItem>
                            <NavItem eventKey="second">Section 2 - 1pm</NavItem>
                        </Nav>
                        </Col>
                        <Col sm={9}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="first">Tab 1 content</Tab.Pane>
                            <Tab.Pane eventKey="second">Tab 2 content</Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Row>
        </Grid>
        </div>
        
    );
}


}
export default CourseRoster;