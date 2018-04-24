import React from 'react';
import { Component } from 'react';
import { colors } from '../../styles/styles'
import styles from './styles'
import {  } from 'react-router-dom';
import { Grid, Col, Row, Tabs, Tab, FormGroup, 
    ControlLabel, FormControl, HelpBlock, 
    Nav, NavItem, Table, Modal, Button } from '../../../node_modules/react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import { graphql, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

class CourseRoster extends Component {

    state = {
        courseID: 6969,
        courseTitle: "ABC123: Course Title",
        courseDescription: "Software Engineering",
        newCourseInput: '',
        columns: [],
        courseStudents: [],
        rosters: [],
        newSectionTitle: '',
        show: false,
        
    }

constructor(props) {
    
    console.log(props.location);
    super(props);

    var temp = [];
    var temp2 = [];
    for(var i = 0; i < 40; i++) {
        temp.push(
            {key: `${i}`, name: "Theo Burkhart", email: "burkhat@purdue.edu"}
        )

        temp2.push(
            {key: `${i}`, name: "Frank Ocean", email: "frank@purdue.edu"}
        )
    }

    

    this.state = {
        courseID: props.courseID,
        columns: [
            {key: '1', dataField: 'name', text: "Name"},
            {key: '2', dataField: 'email', text: "Email"}
        ],
        courseStudents: []
                
    }
    
}

componentDidMount() {
    this.props.client.mutate({
            mutation: gql`
                mutation courseGetUsers($id: Int!) {
                courseGetUsers(id: $id) {
                  firstName
                  lastName
                  email
                }
              }`,
            variables: {
                id: this.state.courseID,
            }
        }).then( data => {
            console.log(data);
            var students = [];
            var s = data.data.courseGetUsers;
            for(var i = 0; i < s.length; i++) {
                students.push({key: i, name: s[i].firstName + " " + s[i].lastName, email: s[i].email})
            }
            this.setState({courseStudents: students})
        })
}




render() {
    var tabs = [];
    var pages = [];
    if(this.state.courseStudents.length == 0) {
        return(<div></div>);
    }
    
        // tabs = this.state.courseSections.map(section => (
        //     <NavItem key={section.key} eventKey={section.key}>{section.title}</NavItem>
        // ));

        // pages = this.state.courseSections.map((section) => {
        //     return(
        //         <Tab.Pane key={section.key} eventKey={section.key} style={{width: '80%', height: '70vh', overflowY: 'scroll'}} >
        //             <BootstrapTable
        //                 striped
        //                 hover
        //                 condensed
        //                 bordered={false} 
        //                 keyField='key' 
        //                 data={this.state.courseSections} 
        //                 columns={this.state.columns}
        //                 />
        //         </Tab.Pane>
        //     );
        // });

    return(
        <div>
            <div>
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>New Section</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup>
                        <ControlLabel>Enter section title</ControlLabel>
                        <FormControl type="text" value={this.state.newSectionTitle} placeholder="Section 0792 - 12:30" onChange={this.handleChangeSection}/>
                        <FormControl.Feedback/>
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Add</Button>
                </Modal.Footer>
            </Modal>
            </div>
        <Grid style={{width: 'auto'}}>
            <Row style={{marginTop: '20px'}}>
                <Col sm={6} style={{paddingLeft: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <h1 style={styles.header}>Course Roster</h1>
                </Col>
            </Row>
            <Row>
                <Col sm={11} style={{paddingLeft: '0px'}}>
                    <BootstrapTable
                        striped
                        hover
                        condensed
                        bordered={false} 
                        keyField='key' 
                        data={this.state.courseStudents} 
                        columns={this.state.columns}
                        />
                </Col>
            </Row>
        </Grid>
        </div>
        
    );
}


} export default withApollo(CourseRoster);