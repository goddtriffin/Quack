import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/css/bootstrap-theme.css'
import Sidebar from './components/Sidebar/sidebar'
import SidebarContent from './components/Sidebar/sidebar_content'
import Blank from './components/Blank/blank';
import Course from './components/Course/course';
import NewQuiz from './components/NewQuiz/newQuiz';
import QuizResults from './components/QuizResults/quizResults';
import EditQuiz from './components/EditQuiz/editQuiz';
import StartQuiz from './components/StartQuiz/startQuiz';
import Login from './components/Login/login';
import { AUTH_TOKEN } from './constants'
import { Grid, Col, Row } from '../node_modules/react-bootstrap'
import {
	Route,
	Switch,
	Redirect,
	withRouter
} from 'react-router-dom'

class App extends Component {
	state = {
		userID: "",
		userEmail: "",
		loggedIn: false
	}

	render() {

		const sidebar = <SidebarContent params={this.props.params}/>

		document.body.style.overflow = "hidden"
		const sidebarProps = {
			sidebar: sidebar,
			docked: true,
			shadow: false,
			touchHandleWidth: 20,
			dragToggleDistance: 30,
			touch: false,
			transitions: false,
			pullRight: false,
			open: true
		}

		const CourseParent = ({ match, location }) => {
			return(<Course courseID={match.params.courseID} location={location}/>);
		}

		const SidebarParent = (props) => {
			return(<Sidebar {...sidebarProps} className="Sidebar" location={props.location}/>);
		}

		const authToken = localStorage.getItem(AUTH_TOKEN);
		if (!authToken) {
			return (<Login/>);
		}
    
		return (
			<div>
			<Grid fluid={true}>
				<Row >
					<Col md={1} style={{height: '100vh', width: '175px', overflowY: 'scroll'}}>
						<div>
							<Route render={({ location }) => (
							<Sidebar {...sidebarProps} className="Sidebar" location={location}/>
							)}/>
						</div>
					</Col>

					<Col md={10}>
						<Switch>
							<Route exact path="/" component={Blank}/>
							<Route path="/course/:courseID/new" component={NewQuiz}/> 
							<Route path="/course/:courseID/view/:quizID" component={QuizResults} />
							<Route path="/course/:courseID/quiz/:quizID" component={EditQuiz} />
							<Route path="/course/:courseID/start/:quizID" component={StartQuiz} />
							<Route path="/course/:courseID" component={CourseParent}/>
							<Redirect to="/" />
						</Switch>
					</Col>
				</Row>
			</Grid>
			</div>
		);
  	}
}

export default withRouter(App);