import React from 'react';
import { Component } from 'react';
import styles from './styles'
import { colors } from '../../styles/styles'
import logo from '../../assets/quack-logo-white.svg'
import {  } from 'react-router-dom'
import { AUTH_TOKEN } from '../../constants'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Grid, Col, Row, FormGroup, ControlLabel, 
    FormControl, HelpBlock, Button } from '../../../node_modules/react-bootstrap';



class Register extends Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    }

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: ""
        }

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    handleChangeEmail(e) {
        this.setState({email: e.target.value})
    }

    handleChangePassword(e) {
        this.setState({password: e.target.value})
    }

    handleChangeFirstName(e) {
        this.setState({firstName: e.target.value})
    }

    handleChangeLastName(e) {
        this.setState({firstName: e.target.value})
    }

    login() {

    }

    register = async () => {
        
    }

    saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }

render() {
    return(
        <div style={styles.container}>
            <Grid style={{marginTop: "40px"}}>
                <Row style={{display: "flex", justifyContent: "center", paddingBottom: "15px"}}>
                    <Col>
                        <div style={styles.logoContainer}>
                            <img src={logo} style={styles.logo}/>
                        </div>
                    </Col>
                </Row>
                <Row style={{display: "flex", justifyContent: 'center'}}>
                    <Col style={{width: "25%"}}>
                        <div style={styles.formContainer}>
                        <form>
                            <FormGroup>
                            <h2 style={styles.label}>First name</h2>
                            <FormControl type="text" value={this.state.firstName} placeholder="John" onChange={this.handleChangeFirstName}/>
                            <h2 style={styles.label}>Last name</h2>
                            <FormControl type="text" value={this.state.lastName} placeholder="johndoe@example.edu" onChange={this.handleChangeLastName}/>
                            <h2 style={styles.label}>Email</h2>
                            <FormControl type="text" value={this.state.email} placeholder="johndoe@example.edu" onChange={this.handleChangeEmail}/>
                            <FormControl.Feedback/>
                            <h2 style={styles.label}>Password</h2>
                            <FormControl type="text" value={this.state.password} placeholder="password" onChange={this.handleChangePassword}/>
                            <FormControl.Feedback/>
                            </FormGroup>
                        </form>
                        </div>
                        <div style={{display: "flex", justifyContent: 'center'}}>
                            <button onClick={ () => this.register } style={styles.loginButton}>Register</button>
                        </div>
                        <div style={{display: "flex", justifyContent: 'center'}}>
                            <button onClick={ this.login } style={styles.registerButton}>Already a user? Login</button>
                        </div>
                    </Col>
                </Row>
            </Grid>
        </div>
    );
}


}

const REGISTER_MUTATION = gql`
    mutation userCreate($input: UserInput, $password: String!) {
    userCreate(input: $input, password: $password) {
      id
    }
  }
`

export default compose(
    graphql(REGISTER_MUTATION, {name: 'userCreate'})
)(Register)