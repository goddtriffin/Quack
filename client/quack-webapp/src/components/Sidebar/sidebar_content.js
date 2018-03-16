import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../styles/styles'
import { Component, Image, Text } from 'react'
import logo from '../../assets/quack-logo-white.svg'
import Routes from '../../routes'
import { Modal, Button, ControlLabel, FormControl, FormGroup, HelpBlock } from '../../../node_modules/react-bootstrap'

const styles = {
  sidebar: {
    width: 256,
    height: '100%',
  },
  sidebarLink: {
    display: 'block',
    padding: '10px 0px',
    textDecoration: 'none',
    fontFamily: 'Fira Sans',
    color: 'white',
    fontSize: '12pt',
    fontWeight: 'regular',
    textAlign: 'left',
  },
  divider: {
    //margin: '8px 0',
    paddingTop: 0,
    margin: 0,
    height: 1,
    backgroundColor: colors.qLightGrey,
  },
  links: {
    marginTop: '10px',
    padding: '10px',
    height: '100%',
    backgroundColor: colors.qDarkGrey,
    justifyContent: 'flex-start',
  },
  content: {
    height: '100%',
    backgroundColor: colors.qDarkGrey,
  },
  logoContainer: {
    width: '100%',
    height: '80px',
    display: 'flex',
    backgroundColor: colors.qGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '130px',
    height: '100%',
  },
  title: {
    fontFamily: 'Fira Sans',
    color: 'white',
    fontSize: '18pt',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingBottom: 0,
  },
  addCourseButton: {
    backgroundColor: colors.qDarkGrey,
    border: 0,
    fontFamily: 'Fira Sans',
    color: 'white',
    fontSize: '11pt',
    textAlign: 'left',
  }
};

class SidebarContent extends Component {
  state = {
    links: [],
    count: 0,
    show: false,
    newCourseInput: '',
    newCoursePrefix: '',
    courseTitles: []
  }

  constructor(props) {
    super(props);
    this.addCourse = this.addCourse.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClose() {
    this.setState({show: false});
    var prefix = this.state.newCourseInput.split(":");
    var tempTitles = this.state.courseTitles.slice();
    tempTitles.push(this.state.newCourseInput);
    var temp = this.state.links.slice();
    temp.push(
      <a key={this.state.count++} href={'/course/' + this.state.count} style={styles.sidebarLink}>{prefix[0]}</a>
    );
    
    this.setState({
      links: temp,
      courseTitles: tempTitles,
    });

  }

  handleShow() {
    this.setState({show: true});
  }

  addCourse() {
    console.log("addCourse clicked");

    this.handleShow();

  }

  getValidationState() {
    if(this.state.newCourseInput.length == 0) {
      return null;
    }
    var string = this.state.newCourseInput;
    var temp = ":";
    if(string.includes(temp)) {
      return 'success';
    }else {
      return 'error';
    }
  }

  handleChange(e) {
    this.setState({newCourseInput: e.target.value})
  }

  render() {

    return(
      <div style={styles.content}>
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlID="addCourseForm" validationState={this.getValidationState()}>
              <ControlLabel>Enter New Course Title</ControlLabel>
              <FormControl type="text" value={this.state.newCourseInput} placeholder="New course" onChange={this.handleChange}/>
              <FormControl.Feedback/>
              <HelpBlock>Example: "CS307: Software Engineering"</HelpBlock>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Create</Button>
        </Modal.Footer>
      </Modal>
        <div style={styles.logoContainer}>
            <img src={logo} style={styles.logo}/>
        </div>
        <div style={styles.links}>
            <h1 style={styles.title}>Courses</h1>
            <div style={styles.divider}/>
            {this.state.links}
            <button onClick={ this.addCourse } style={styles.addCourseButton}>+ Add course</button>  
        </div>
      </div>
    );
  }
}


SidebarContent.propTypes = {
  style: PropTypes.object,
};

export default SidebarContent;
