import React from 'react';
import { Component } from 'react';
import { colors } from '../../styles/styles'
import styles from './styles'
import {  } from 'react-router-dom';
import { Grid, Col, Row, Tabs, Tab, FormGroup, 
    ControlLabel, FormControl, HelpBlock, 
    Nav, NavItem, Table, Modal, Button } from '../../../node_modules/react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';

class CourseRoster extends Component {

    state = {
        courseID: 6969,
        courseTitle: "ABC123: Course Title",
        courseDescription: "Software Engineering",
        newCourseInput: '',
        columns: [],
        courseSections: [],
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
        columns: [
            {key: '1', dataField: 'name', text: "Name"},
            {key: '2', dataField: 'email', text: "Email"}
        ],
        courseSections: [
            {key: '1', title: 'Section 1 - 11am'},
            {key: '2', title: 'Section 2 - 3pm'},
            {key: '3', title: 'Section 3 - 1pm'}
        ],
        rosters: [temp, temp2, temp],
        show: false,
        newSectionTitle: '',
        
    }
    
    this.handleChangeSection = this.handleChangeSection.bind(this);
    this.handleClose = this.handleClose.bind(this)
}


handleChangeSection(e) {
    this.setState({newSectionTitle: e.target.value})
}

handleClose() {

    if(this.state.newSectionTitle.length != 0) {
        var cs = this.state.courseSections.slice();
        cs.push({key: `${cs.length + 1}`, title: `${this.state.newSectionTitle}`})
        
        var r = this.state.rosters;
        r.push([]);

        this.setState({
            show: false,
            newSectionTitle: '',
            courseSections: cs,
            rosters: r
        });
    }else {
        this.setState({
            show: false,
            newSectionTitle: '',

        })
    }
}


render() {

    const tabs = this.state.courseSections.map(section => (
        <NavItem key={section.key} eventKey={section.key}>{section.title}</NavItem>
    ));

    const pages = this.state.courseSections.map((section) => {
        return(
            <Tab.Pane key={section.key} eventKey={section.key} style={{width: '80%', height: '70vh', overflowY: 'scroll'}} >
                <BootstrapTable
                    striped
                    hover
                    condensed
                    bordered={false} 
                    keyField='key' 
                    data={this.state.rosters[`${section.key - 1}`]} 
                    columns={this.state.columns}
                    />
            </Tab.Pane>
        );
    });

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
                <Col sm={3} style={{paddingLeft: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <h1 style={styles.header}>Sections</h1>
                    <button onClick={this.addSection} style={styles.button}>
                        <div style={styles.buttonText} onClick={() => {this.setState({show: true})}}>add section</div>
                    </button>
                </Col>
                <Col sm={9} style={{paddingLeft: '0px'}}>
                <h1 style={styles.header}>Roster</h1>
                </Col>
            </Row>
            <Row>
                <Tab.Container id="left-tabs-example" defaultActiveKey="1">
                    <Row className="clearfix">
                        <Col sm={3}>
                        <Nav bsStyle="pills" stacked>
                            {tabs}
                        </Nav>
                        </Col>
                        <Col sm={9}>
                        <Tab.Content animation>
                            {pages}
                        </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Row>
        </Grid>
        </div>
        
    );
}


} export default CourseRoster;