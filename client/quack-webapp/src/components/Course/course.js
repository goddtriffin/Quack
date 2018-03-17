import React from 'react';
import { Component } from 'react';
import { colors } from '../../styles/styles'
import styles from './styles'
import {  } from 'react-router-dom';
import { Grid, Col, Row, Tabs, Tab } from '../../../node_modules/react-bootstrap'

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
}

handleSelect(key) {
    this.setState({ key: key });
}

render() {
    
    return(
        <div style={styles.container}>
        <Grid >
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
                    
                    </Tab>
                    <Tab eventKey={2} title="Quizzes">
                    
                    </Tab>
                    <Tab eventKey={3} title="Roster">
                    
                    </Tab>
                    <Tab eventKey={4} title="Roles">
                    
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