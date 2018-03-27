import React from 'react';
import { Component } from 'react';
import styles from './styles'
import { colors } from '../../styles/styles'
import logo from '../../assets/quack-logo-white.svg'
import {  } from 'react-router-dom'
import { AUTH_TOKEN } from '../../constants'
import { graphql, compose } from 'react-apollo'
import { Link } from 'react-router-dom';
import gql from 'graphql-tag'
import { Grid, Col, Row, FormGroup, ControlLabel, 
    FormControl, HelpBlock, Button } from '../../../node_modules/react-bootstrap';



class Login extends Component {

    state = {
        email: "",
        password: "",
    }

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    handleChangeEmail(e) {
        this.setState({email: e.target.value})
    }

    handleChangePassword(e) {
        this.setState({password: e.target.value})
    }

    login = async () => {
        const { email, password } = this.state
        const result = await this.props.login({
            variables: {
                email,
                password
            }
        })
        const { token } = result.data.login
        this._saveUserData(token);
        console.log("Token: " + token);
    }

    register() {

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
                            <button onClick={ this.login } style={styles.loginButton}>Login</button>
                        </div>
                        <div style={{display: "flex", justifyContent: 'center'}}>
                            <button onClick={ this.register } style={styles.registerButton}>Not a user? Register</button>
                        </div>
                    </Col>
                </Row>
            </Grid>
        </div>
    );
}
}

const LOGIN_MUTATION = gql`
    mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      jwt
    }
  } 
`

export default compose(
    graphql(LOGIN_MUTATION, {name: 'login'})
)(Login)