import React from 'react';
import { Component, Button } from 'react';
import { colors } from '../../styles/styles'
import styles from './styles'
import { Link } from 'react-router-dom';
import { Grid, Col, Row, Tabs, Tab, FormGroup, 
    ControlLabel, FormControl, HelpBlock, 
    Nav, NavItem, Table } from '../../../node_modules/react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';

class CourseQuizzes extends Component {

    state = {
        recentQuizzes: [],
        upcomingQuizzes: [],
        courseID: '',
    }

ViewQuizButton = ({id}) => (
    <button style={styles.viewButton}><Link style={styles.viewButton} to={'/course/' + this.state.courseID + '/view/' + id}>View Results</Link></button>
)

EditQuizButton = ({id}) => (
    <button style={styles.editButton}><Link style={styles.editButton} to={'/course/' + this.state.courseID + '/quiz/' + id}>Edit</Link></button>
)

StartQuizButton = ({id}) => (
    <button style={styles.startButton}><Link style={styles.startButton} to={'/course/' + this.state.courseID + '/start/' + id}>Start Quiz</Link></button>
)

constructor(props) {
    
    console.log(props.location);
    super(props);

    var temp1 = [];
    var temp2 = [];
    for(var i = 0; i < 25; i++) {
        temp1.push(
            {key: `${i}`, title: `Quiz ${i}`, date: "3/21/18", viewButton: <this.ViewQuizButton id={i}/>, editButton: <this.EditQuizButton id={i} />}
        )
        temp2.push(
            {key: `${i}`, title: `Quiz ${i + 25}`, startButton: <this.StartQuizButton id={i} />}
        )

    }


    this.state = {
        courseSections: [],
        columnsRecent: [
            {key: '1', dataField: 'title', text: "Title"},
            {key: '2', dataField: 'date', text: "Date"},
            {key: '3', dataField: 'viewButton', text: ""},
            {key: '4', dataField: 'editButton', text: ""}
        ],
        columnsUpcoming: [
            {key: '1', dataField: 'title', text: "Title"},
            {key: '2', dataField: 'startButton', text: ""}
        ],
        recentQuizzes: temp1,
        upcomingQuizzes: temp2,
        courseID: props.courseID,

    }
    
}


render() {
    return(
        <div >
        <Grid style={{width: 'auto'}}>
            <Row style={{marginTop: '20px'}}>
                <Col sm={6} style={{paddingLeft: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <h1 style={styles.header}>Recent Quizzes</h1>
                </Col>
                <Col sm={6} style={{paddingLeft: '0px'}}>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <h1 style={styles.header}>Upcoming Quizzes</h1>
                    <button style={styles.createButton}><Link 
                        to={{
                            pathname:  '/course/' + this.props.courseID + '/new',
                            state: {courseID: this.props.courseID, courseTitle: this.props.courseTitle}
                        }}  style={styles.createLink}>Create New Quiz</Link></button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm={6} style={{paddingLeft: '0px', height: '60vh', overflowY: 'scroll'}}>
                    <BootstrapTable
                            striped
                            hover
                            condensed
                            bordered={false} 
                            keyField='key' 
                            data={this.state.recentQuizzes} 
                            columns={this.state.columnsRecent}
                            />
                </Col>
                <Col sm={6} style={{paddingLeft: '0px', height: '60vh', overflowY: 'scroll'}}>
                    <BootstrapTable
                            striped
                            hover
                            condensed
                            bordered={false} 
                            keyField='key' 
                            data={this.state.upcomingQuizzes} 
                            columns={this.state.columnsUpcoming}
                            />
                </Col>
            </Row>
        </Grid>
        </div>
        
    );
}


}
export default CourseQuizzes;