import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../styles/styles'
import logo from '../../assets/quack-logo-white.svg'
import { Link } from 'react-router-dom'
import { Modal, Button, ControlLabel, FormControl, FormGroup, HelpBlock } from '../../../node_modules/react-bootstrap'
import { graphql, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../../constants'

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
	},
	logoutButton: {
		position: 'absolute',
		bottom: '15px',
		left: '35%',
		border: 0,
		fontFamily: 'Fira Sans',
		fontWeight: '400',
		color: 'white',
		fontSize: '11pt',
		textAlign: 'center',
		backgroundColor: colors.transparent,
		textDecoration: 'none'
	},
	link: {
		color: 'white'
	}
};


class SidebarContent extends React.PureComponent {
	state = {
		links: [],
		count: 0,
		show: false,
		newCourseInput: '',
		newCoursePrefix: '',
		courseTitles: [],
		courseID: 6969,
		courseTitle: "ABC123: Course Title",
		courseDescription: "Software Engineering",
		courseRoster: ['Theo', 'Mason', 'Justin', 'Todd', 'Tyler'],
		courseQuizzes: ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4'],
		key: 1,
		userID: localStorage.getItem("userID"),
		courseDescriptionInput: ""
	}
  
	constructor(props) {
		super(props);

		this.addCourse = this.addCourse.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.logout = this.logout.bind(this);
		this.handleChangeD = this.handleChangeD.bind(this);
	}

	addCourse = async() => {
		await this.props.client.query({
			query: GET_ALL_COURSES,
			variables: {
				id: this.state.userID
			}
		}).then(data => {
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
						userID: this.state.userID,
						courseID: random,
						name: this.state.newCourseInput,
						description: this.state.courseDescriptionInput,
					}
				}
			}).then(data => {
				this.setState({courseID : random});
				this.props.client.mutate({
					mutation: ADD_COURSE,
					variables: {
						id : this.state.userID,
						courseID: random,
					}
				});

				this.setState({show: false});
				if (this.state.newCourseInput.length > 0) {
					var prefix = this.state.newCourseInput.split(":");
					var tempTitles = this.state.courseTitles.slice();
					tempTitles.push(this.state.newCourseInput);
					var temp = this.state.links.slice();

					temp.push(
						<Link
							to={{
								pathname: '/course/' + random,
								state: {
									courseTitle: this.state.newCourseInput,
									courseID: random
								},
							}}
							key={this.state.count++} 
							style={styles.sidebarLink}>{prefix[0]}
						</Link>
					);
					
					this.setState({
						links: temp,
						courseTitles: tempTitles,
						newCourseInput: ''
					});
				}

			});
		}).catch(function(error) { 
			alert(error.message);
		});
	}

	componentDidMount() {
		var links = [];

		this.props.client.mutate({
			mutation: GET_COURSES,
			variables: {
				id: this.state.userID
			}
		}).then(data => {
			var d = data.data.userGetCourses;

			for (var i = 0; i < d.length; i++) {
				var prefix = d[i].name.split(":");
				var title = d[i].name;
				
				links.push(
					<Link
						to={{
							pathname: '/course/' + d[i].id,
							state: {
								courseTitle: title,
								courseID: d[i].id
							}
						}}
						key={i + 1}
						style={styles.sidebarLink}>{prefix[0]}
					</Link>
				)
			}
			
			this.setState({
				links: links,
				newCourseInput: "",
				newCoursePrefix: "",
			});
		})
	}

	handleShow () {
		this.setState({show: true});
	}

	handleClose () {
		this.setState({show: false}); 
	}

	getValidationState() {
		if (this.state.newCourseInput.length === 0) {
			return 'error';
		}

		var string = this.state.newCourseInput;
		var temp = ":";

		if (string.includes(temp)) {
			return 'success';
		} else {
			return 'error';
		}
	}

	handleChange (e) {
		this.setState({newCourseInput: e.target.value})
	}

	handleChangeD (e) {
		this.setState({courseDescriptionInput: e.target.value})
	}

	logout () {
		localStorage.setItem(AUTH_TOKEN, "");
	}

	render () {
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

								<FormControl
									type="text"
									value={this.state.newCourseInput}
									placeholder="New course"
									onChange={this.handleChange}
								/>
								<FormControl.Feedback/>

								<HelpBlock>Example: "CS307: Software Engineering"</HelpBlock>
							</FormGroup>
						</form>

						<form style={{width: '100%'}}>
							<FormGroup controlId="formControlsTextarea">
								<ControlLabel>Enter Course Description</ControlLabel>

								<FormControl
									style={{height: '120px'}}
									componentClass="textarea"
									value={this.state.courseDescriptionInput}
									placeholder=""
									onChange={this.handleChangeD}
								/>
								<FormControl.Feedback/>
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

					<button onClick={ this.handleShow } style={styles.addCourseButton}>+ New course</button>  
				</div>

				<div>
					<button onClick={ this.logout } style={styles.logoutButton}><Link style={{color: 'white'}} to="/auth/login">Logout</Link></button>
				</div>
			</div>
		);
	}
}


SidebarContent.propTypes = {
  	style: PropTypes.object,
};

const GET_COURSES = gql` 
	mutation userGetCourses($id: Int!) { 
		userGetCourses(id: $id) { 
			id
			name 
		} 
	}
` 

const GET_ALL_COURSES = gql` 
	query courses { 
		courses { 
			id 
		}
	}
`

const ADD_COURSE = gql`
	mutation userAddCourse($id: Int!, $courseID: Int!) {
		userAddCourse(id: $id, courseID: $courseID) {
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