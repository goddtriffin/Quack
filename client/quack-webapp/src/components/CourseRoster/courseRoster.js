import React from 'react';
import { Component, Button } from 'react';
import { colors } from '../../styles/styles'
import styles from './styles'
import {  } from 'react-router-dom';
import { Grid, Col, Row, Tabs, Tab, FormGroup, 
    ControlLabel, FormControl, HelpBlock, 
    Nav, NavItem, Table } from '../../../node_modules/react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';

class CourseRoster extends Component {

    state = {
        courseID: 6969,
        courseTitle: "ABC123: Course Title",
        courseDescription: "Software Engineering",
        newCourseInput: '',
        columns: [],
        students: [],
        students2: [],
        
    }

constructor(props) {
    
    console.log(props.location);
    super(props);

    var temp = [];
    for(var i = 0; i < 40; i++) {
        temp.push(
            {key: `${i}`, name: "Theo Burkhart", email: "burkhat@purdue.edu"}
        )
    }


    this.state = {
        courseSections: [],
        columns: [
            {key: '1', dataField: 'name', text: "Name"},
            {key: '2', dataField: 'email', text: "Email"}
        ],
        students: temp,
        students2: temp,

    }
    
}

addSection() {

}


render() {
    return(
        <div >
        <Grid style={{width: 'auto'}}>
            <Row style={{marginTop: '20px'}}>
                <Col sm={3} style={{paddingLeft: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <h1 style={styles.header}>Sections</h1>
                    <button onClick={this.addSection} style={styles.button}>
                        <div style={styles.buttonText}>add section</div>
                    </button>
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
                            <Tab.Pane eventKey="first" style={{width: '80%', height: '70vh', overflowY: 'scroll'}} >
                                <BootstrapTable
                                    striped
                                    hover
                                    condensed
                                    bordered={false} 
                                    keyField='key' 
                                    data={this.state.students} 
                                    columns={this.state.columns}
                                    />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <BootstrapTable
                                    striped
                                    hover
                                    condensed
                                    bordered={false} 
                                    keyField='key' 
                                    data={this.state.students2} 
                                    columns={this.state.columns}
                                    />
                            </Tab.Pane>
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