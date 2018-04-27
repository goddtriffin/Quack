import React from 'react';
import { Component, Button } from 'react';
import { colors } from '../../styles/styles'
import styles from './styles'
import { Link } from 'react-router-dom';
import { Grid, Col, Row, Tabs, Tab, FormGroup, 
    ControlLabel, FormControl, HelpBlock, 
    Nav, NavItem, Table, Modal } from '../../../node_modules/react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import { graphql, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

class CourseQuizzes extends Component {

    state = {
        recentQuizzes: [],
        upcomingQuizzes: [],
        courseID: '',
    }

ViewQuizButton = ({id, quizTitle}) => (
    <button style={styles.viewButton}><Link style={styles.viewButton} to={{
        pathname: '/course/' + this.state.courseID + '/view/' + id,
        state: {courseID: this.state.courseID, quizTitle: quizTitle}
        }}>View Results</Link></button>
)

EditQuizButton = ({id, quizTitle}) => (
    <button style={styles.editButton}><Link style={styles.editButton} 
        to={{
            pathname: '/course/' + this.state.courseID + '/quiz/' + id,
            state: {courseID: this.state.courseID, quizTitle: quizTitle, courseTitle: this.props.courseTitle}
        }}
    >Edit</Link></button>
)

StartQuizButton = ({id, quizTitle}) => (
    <button style={styles.startButton}><Link style={styles.startButton} to={{
        pathname: '/course/' + this.state.courseID + '/start/' + id,
        state: {courseID: this.state.courseID, quizTitle: quizTitle, courseTitle: this.props.courseTitle}
        }}>Start Quiz</Link></button>
)

constructor(props) {
    
    console.log(props.location);
    super(props);

    var temp1 = [];
    var temp2 = [];

    this.getCourseQuizzes = this.getCourseQuizzes.bind(this);

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
            {key: '2', dataField: 'startButton', text: ""},
            {key: '3', dataField: 'editButton', text: ""}
        ],
        recentQuizzes: temp1,
        upcomingQuizzes: temp2,
        courseID: props.courseID,
        show: false,

    }
    
}

getCourseQuizzes() {
    var temp1 = [];
    var temp2 = [];
    console.log("COURSE ID: " + this.state.courseID);
    this.props.client.mutate({
        mutation: gql`
            mutation courseGetQuizzes($id: Int!) {
            courseGetQuizzes(id: $id) {
              id
              title
              date
            }
          }`,
        variables: {
            id: this.state.courseID,
        }
    }).then( data => { 
        console.log("DOWNLOADING COURSE QUIZZES");
        console.log(data);
        var quizzes = data.data.courseGetQuizzes;
        for(var i = 0; i < quizzes.length; i++) {
            if(quizzes[i].date == "") {
                temp2.push(
                    {key: i, title: quizzes[i].title, startButton: <this.StartQuizButton id={quizzes[i].id} quizTitle={quizzes[i].title} />, editButton: <this.EditQuizButton id={quizzes[i].id} quizTitle={quizzes[i].title} />}
                );
            }else {
                temp1.push({key: `${i}`, title: quizzes[i].title, date: quizzes[i].date, viewButton: <this.ViewQuizButton id={quizzes[i].id} quizTitle={quizzes[i].title}/>, editButton: <this.EditQuizButton id={quizzes[i].id} quizTitle={quizzes[i].title} />})
            }
        }

        this.setState({recentQuizzes: temp1, upcomingQuizzes: temp2})
    })
}

componentDidMount() {
    setTimeout(this.getCourseQuizzes, 200);
}

yes() {
    this.setState({ password: true })
}

no() {
    this.setState({ password: false })
}

handleClose() {
    this.setState({show: false})
}


render() {
    return(
        <div>
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
                        }}  style={styles.createLink}><span style={{fontFamily: 'Fira Sans', fontSize: '18pt', fontWeight: '800'}}>+ </span>Create New Quiz</Link></button>
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
export default withApollo(CourseQuizzes);