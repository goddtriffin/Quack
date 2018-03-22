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
        selected: [],
        
    }
roleDropdown(cell, row, rowIndex) {
    var role = row.role;
    if(role == "Student") {
        return(
            <select>
                <option value="student" selected>Student</option>
                <option value="instructor">Instructor</option>
                <option value="ta">TA</option>
            </select>
        )
    }else if(role == "Instructor") {
        return(
            <select>
                <option value="student">Student</option>
                <option value="instructor" selected>Instructor</option>
                <option value="ta">TA</option>
            </select>
        )
    }else if(role == "TA") {
        return(
            <select>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="ta" selected>TA</option>
            </select>
        )
    }else {
        return(
            <select>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="ta">TA</option>
            </select>
        )
    }
    
}

sectionDropDown(cell, row) {
    return(
        <select>
            <option value="section1">Section 1</option>
            <option value="section2">Section 2</option>
        </select>
    )
}

constructor(props) {
    
    console.log(props.location);
    super(props);

    var temp = [];
    for(var i = 0; i < 8; i++) {
        temp.push(
            {key: `${i}`, name: "Theo Burkhart", email: "burkhat@purdue.edu", section: "Seciton 1", role: "Instructor"}
        )
    }


    this.state = {
        columns: [
            {key: '1', dataField: 'name', text: "Name"},
            {key: '2', dataField: 'email', text: "Email"},
            {key: '3', dataField: 'section', text: "Assigned Section", formatter: this.sectionDropDown},
            {key: '3', dataField: 'role', text: 'Role', formatter: this.roleDropdown}
        ],
        users: temp,
        selected: [],

    }
    
}
handleOnSelect = (row, isSelect) => {
    if(isSelect) {
        
        var temp = this.state.selected;
        temp.push(`${row.key}`);
        this.setState({
            seleted: temp
        })
    }else {
        this.setState(() => ({
            selected: this.state.selected.filter(x => x !== row.key)
        }));
    }
}

handleOnSelectAll = (isSelect, row) => {

}

render() {
    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        selected: this.state.selected,
        onSelect: this.handleOnSelect,
        onSelectAll: this.handleOnSelectAll
    };

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
                    keyField='key' 
                    data={this.state.users} 
                    columns={this.state.columns}
                    selectRow={selectRow}
                    />
            </Row>
        </Grid>
        </div>
        
    );
}


}
export default CourseRoles;