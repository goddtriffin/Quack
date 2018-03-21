import React from 'react';
import { Component } from 'react';
import { colors } from '../../styles/styles'
import styles from './styles'
import {  } from 'react-router-dom';
import { Grid, Col, Row, Tabs, Tab } from '../../../node_modules/react-bootstrap'
import CourseDetails from '../CourseDetails/courseDetails';
import CourseRoster from '../CourseRoster/courseRoster'
import CourseRoles from '../CourseRoles/courseRoles';

class Course extends Component {

    state = {
        courseID: 6969,
        courseTitle: "ABC123: Course Title",
        courseDescription: "Software Engineering",
        courseRoster: ['Theo', 'Mason', 'Justin', 'Todd', 'Tyler'],
        courseQuizzes: ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4'],
        key: 1,
    }

constructor(props) {
    console.log(props.location);
    super(props);
    this.state = {
        courseTitle: props.location.state.courseTitle,
        key: 1,
    }

    this.handleSelect = this.handleSelect.bind(this);
    this.updateDetails = this.updateDetails.bind(this);
}

handleSelect(key) {
    this.setState({ key: key });
}

updateDetails(title, description) {
    console.log("new title");
    console.log(title);
    this.setState({
        courseTitle: title,
        courseDescription: description
    })
}

render() {
    
    return(
        <div style={{width: '100%'}}>
        <Grid style={{width: '100%', margin: '0px', padding: '0px', marginLeft: '20px'}}>
            <Row>
            <div style={{margin: '0px', padding: '0px'}}>
            <h1 style={styles.title}>{this.state.courseTitle}</h1>
            </div>
            </Row>

            <Row>
            <div style={styles.tab_menu}>
                <Tabs
                    activeKey={this.state.key}
                    onSelect={this.handleSelect}
                    id="course-tabs"
                >
                    <Tab eventKey={1} title="Course Details">
                        <CourseDetails 
                            courseID={this.state.courseID} 
                            courseTitle={this.state.courseTitle}
                            courseDescription={this.state.courseDescription}
                            callback={this.updateDetails}
                            />
                    </Tab>
                    <Tab eventKey={2} title="Quizzes">
                        
                    </Tab>
                    <Tab eventKey={3} title="Roster">
                        <CourseRoster/>
                    </Tab>
                    <Tab eventKey={4} title="Roles">
                        <CourseRoles/>
                    </Tab>
                
                </Tabs>
            </div>
            </Row>
            </Grid>
        </div>
        
    );
}


}
export default Course;