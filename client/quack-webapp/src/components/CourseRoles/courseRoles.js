import React from 'react';
import { Component } from 'react';
import { colors } from '../../styles/styles'
import styles from './styles'
import {  } from 'react-router-dom';
import { Grid, Col, Row, Tabs, Tab, FormGroup, 
    ControlLabel, FormControl, HelpBlock, 
    Nav, NavItem, Table, Modal, Button } from '../../../node_modules/react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';

class CourseRoles extends Component {

    state = {
        courseID: 6969,
        columns: [],
        users: [],
        selected: [],
        selectedIndexes: [],
        show: false
        
    }
roleDropdown(cell, row, rowIndex, formatExtraData) {
    var role = row.role;
    if(role == "Student") {
        return(
            <select defaultValue="student" >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="ta">TA</option>
            </select>
        )
    }else if(role == "Instructor") {
        return(
            <select defaultValue="instructor" >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="ta">TA</option>
            </select>
        )
    }else if(role == "TA") {
        return(
            <select defaultValue="ta">
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="ta">TA</option>
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
    temp.push(
        {key: "0", name: "Jeff Turkstra", email: "turkey@purdue.edu", section: "Seciton 1", role: "Instructor"}
    )
    for(var i = 1; i < 6; i++) {
        temp.push(
            {key: `${i}`, name: "Theo Burkhart", email: "burkhat@purdue.edu", section: "Seciton 1", role: "Student"}
        )
    }


    this.state = {
        columns: [
            {key: '1', dataField: 'name', text: "Name"},
            {key: '2', dataField: 'email', text: "Email"},
            {key: '3', dataField: 'section', text: "Assigned Section", formatter: this.sectionDropDown},
            {key: '3', dataField: 'role', text: 'Role', formatter: this.roleDropdown, formatExtraData: {state: this}}
        ],
        users: temp,
        selected: [],
        selectedIndexes: [],
        newName: "",
        newEmail: ""
    }

    this.deleteUsers = this.deleteUsers.bind(this);
    this.addUser = this.addUser.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.handleOnSelectAll = this.handleOnSelectAll.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    
}
handleOnSelect = (row, isSelect) => {
    if(isSelect) {
        console.log("Select")
        var users = this.state.users;
        var selected = this.state.selected;

        console.log("row = " + JSON.stringify(row));
        for(var i = 0; i < users.length; i++) {
            console.log("users[i] = " + JSON.stringify(users[i]));
            if(JSON.stringify(row) == JSON.stringify(users[i])) {
                console.log("MATCH")
                //console.log("User: " + JSON.stringify(temp[i]))
                selected.push(row);
                break;
            }
        }
        
        this.setState({
            selected: selected,
            selectedIndexes: [...this.state.selectedIndexes, row.key]
        })

    }else {
        console.log("Unselect")
        var selected = this.state.selected;
        for(var i = 0; i < selected.length; i++) {
            if(JSON.stringify(row) == JSON.stringify(selected[i])) {
                selected.splice(i, 1);
            }
        }
        this.setState(() => ({
            selected: selected,
            selectedIndexes: this.state.selectedIndexes.filter(x => x !== row.key)
        }));
    }

}

handleOnSelectAll = (isSelect, row) => {
    var selected = this.state.selected;
    var selectedIndexes = this.state.selectedIndexes;
    if(isSelect) {
        for(var i = 0; i < this.state.users.length; i++) {
            selected.push(this.state.users[i]);
            selectedIndexes.push(this.state.users[i].key)
        }
        this.setState({
            selected: selected,
            selectedIndexes: selectedIndexes
        })
    }else {
        selected = [];
        selectedIndexes = [];
        this.setState({
            selected: selected,
            selectedIndexes: selectedIndexes
        })
    }
}

deleteUsers() {
    var temp = this.state.users;
    for(var i = 0; i < this.state.selected.length; i++) {
       for(var j = 0; j < temp.length; j++) {
            if(JSON.stringify(this.state.selected[i]) == JSON.stringify(temp[j])) {
                temp.splice(j, 1);
                this.setState({
                    selectedIndexes: this.state.selectedIndexes.filter(x => x !== this.state.selected[i].key)
                })
            }
       } 
    }

    this.setState({
        users: temp,
        selectedIndexes: [],
        selected: []
    })

}

addUser() {
    this.handleShow();
}

handleClose() {
    this.setState({show: false});
    if(this.state.newName.length > 0 && this.state.newEmail.length > 0) {
      var users = this.state.users;
      users.push(
          {key: `${users.length}`, name: `${this.state.newName}`, email: `${this.state.newEmail}`, section: "Seciton 1", role: "Student"}
      )      
    
      console.log(users)
    
      this.setState({
        users: users,
        newEmail: "",
        newName: "",
      });

    }

}

handleShow() {
    this.setState({show: true});
}

handleChangeName(e) {
    this.setState({newName: e.target.value})
}

handleChangeEmail(e) {
    this.setState({newEmail: e.target.value})
}

render() {
    const selectRow = {
        mode: 'checkbox',
        clickToSelect: false,
        selected: this.state.selectedIndexes,
        onSelect: this.handleOnSelect,
        onSelectAll: this.handleOnSelectAll
    };

    return(
        <div>
        <div>
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form>
                    <FormGroup>
                    <ControlLabel>Enter name</ControlLabel>
                    <FormControl type="text" value={this.state.newName} placeholder="John Doe" onChange={this.handleChangeName}/>
                    <FormControl.Feedback/>
                    <HelpBlock>First and Last</HelpBlock>
                    <ControlLabel>Enter email</ControlLabel>
                    <FormControl type="text" value={this.state.newEmail} placeholder="johndoe@example.edu" onChange={this.handleChangeEmail}/>
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
            <Row style={{marginTop: '20px', width: '90%'}}>
                <Col>
                <h1 style={styles.header}>Course Users</h1>
                </Col>
                <Col style={{display: 'flex', justifyContent: 'space-between'}}>
                <button onClick={this.deleteUsers} style={styles.button}>Delete selected</button>
                <button onClick={this.addUser} style={styles.button}>Add user</button>
                </Col>
            </Row>
            <Row style={{height: '70vh', overflowY: 'scroll', width: '90%'}}>
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