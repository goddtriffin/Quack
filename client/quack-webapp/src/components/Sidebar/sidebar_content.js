import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../styles/styles'
import logo from '../../assets/quack-logo-white.svg'
import { Link } from 'react-router-dom'
import { Modal, Button, ControlLabel, FormControl, FormGroup, HelpBlock } from '../../../node_modules/react-bootstrap'
import { graphql, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

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
    fontSize: '14pt',
    fontWeight: 'regular',
    textAlign: 'left',
    marginLeft: '10px',
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
    marginTop: '20px',
    backgroundColor: colors.qDarkGrey,
    border: 0,
    fontFamily: 'Fira Sans',
    color: 'white',
    fontSize: '12pt',
    textAlign: 'left',
  },
  currentCourse: {
    display: 'block',
    padding: '10px 0px',
    textDecoration: 'none',
    fontFamily: 'Fira Sans',
    color: 'white',
    fontSize: '14pt',
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: '10px',
  }
};


class SidebarContent extends React.PureComponent {

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


    //Download course data and map onto links




    this.addCourse = this.addCourse.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

 

  addCourse = async() => {
    
    await this.props.client.query({
      query: GET_ALL_COURSES
    }).then( data => { 
      var id = data.data.courses.map(a => a.id);
      var name = data.data.courses.map(a => a.name);

      var random = Math.floor(Math.random() * Math.floor(899999)) + 100000;
      while(id.includes(random)) {
        random = Math.floor(Math.random() * Math.floor(899999)) + 100000;
      }

      this.props.client.mutate({
        mutation: CREATE_COURSE,
        variables: {
          input: {
            id: random,
            name: this.state.newCourseInput
          }
        }
      }).then( data => { 
        console.log(data);
      });
      console.log(random);
    }).catch(function(error) { 
        alert(error.message); 
         // ADD THIS THROW error 
        //throw error; 
    });

    this.setState({show: false});
    if(this.state.newCourseInput.length > 0) {
      var prefix = this.state.newCourseInput.split(":");
      var tempTitles = this.state.courseTitles.slice();
      tempTitles.push(this.state.newCourseInput);
      var temp = this.state.links.slice();
      temp.push(
        <Link to={{
          pathname: '/course/' + this.state.count,
          state: {courseTitle: this.state.newCourseInput}
          }} 
        key={this.state.count++} 
        style={styles.sidebarLink}>{prefix[0]}</Link>
      );
      
      
      this.setState({
        links: temp,
        courseTitles: tempTitles,
        newCourseInput: ''
        
      });

    }

  }

  handleShow() {
    this.setState({show: true});
  }

  handleClose() {
    this.setState({show: false}); 

  }

  getValidationState() {
    if(this.state.newCourseInput.length === 0) {
      return 'error';
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
            <FormGroup validationState={this.getValidationState()}>
              <ControlLabel>Enter New Course Title</ControlLabel>
              <FormControl type="text" value={this.state.newCourseInput} placeholder="New course" onChange={this.handleChange}/>
              <FormControl.Feedback/>
              <HelpBlock>Example: "CS307: Software Engineering"</HelpBlock>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.addCourse}>Create</Button>
        </Modal.Footer>
      </Modal>
        <div style={styles.logoContainer}>
            <img src={logo} style={styles.logo}/>
        </div>
        <div style={styles.links}>
            <h1 style={styles.title}>Courses</h1>
            <div style={styles.divider}/>
                {this.state.links}
            <button onClick={ this.handleShow } style={styles.addCourseButton}>+ Add course</button>  
        </div>
      </div>
    );
  }
}


SidebarContent.propTypes = {
  style: PropTypes.object,
};

const GET_ALL_COURSES = gql`
  query courses {
    courses {
      id
      name
    }
  } 
`

const CREATE_COURSE = gql`
    mutation courseCreate($input: CourseInput!) {
    courseCreate(input: $input) {
      id
      name
    }
  } 
`

export default withApollo(SidebarContent);
