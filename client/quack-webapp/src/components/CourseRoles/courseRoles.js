import React from 'react';
import { Component, Button } from 'react';
import { colors } from '../../styles/styles'
import styles from './styles'
import {  } from 'react-router-dom';
import { Grid, Col, Row, Tabs, Tab, FormGroup, 
    ControlLabel, FormControl, HelpBlock, 
    Nav, NavItem, Table } from '../../../node_modules/react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';

class CourseRoles extends Component {

    state = {
        courseID: 6969,
        columns: [],
        users: [],
        
    }

constructor(props) {
    
    console.log(props.location);
    super(props);

    var temp = [];
    for(var i = 0; i < 40; i++) {
        temp.push(
            {key: {i}, name: "Theo Burkhart", email: "burkhat@purdue.edu", section: "Seciton 1", roles: "Student"}
        )
    }


    this.state = {
        columns: [
            {key: '1', dataField: 'name', text: "Name"},
            {key: '2', dataField: 'email', text: "Email"},
            {key: '3', dataField: 'section', text: "Assigned Section"},
            {key: '3', dataField: 'roles', text: 'Roles'}
        ],
        users: temp,

    }
    
}


render() {
    return(
        <div >
        <Grid style={{width: 'auto'}}>
            <Row style={{marginTop: '20px'}}>
                <h1 style={styles.header}>Course Users</h1>
            </Row>
            <Row style={{height: '70vh', overflowY: 'scroll'}}>
                <BootstrapTable
                    striped
                    hover
                    condensed
                    bordered={false} 
                    keyField='name' 
                    data={this.state.users} 
                    columns={this.state.columns}
                    />
            </Row>
        </Grid>
        </div>
        
    );
}


}
export default CourseRoles;