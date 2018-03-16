import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/css/bootstrap-theme.css'
import Sidebar from './components/Sidebar/sidebar'
import SidebarContent from './components/Sidebar/sidebar_content'
import Blank from './components/Blank/blank';
import Course from './components/Course/course';
import { Grid, Col, Row } from '../node_modules/react-bootstrap'
import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import Routes from './routes'


class App extends Component {

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
      open: true,
    }
    return (
      <div className="App">
        <Grid fluid={true}>
          <Row className="show-grid">
            <Col className="col-md-2" style={{height: '100vh', width: '175px'}}>
              <Sidebar {...sidebarProps} className="Sidebar"/>
            </Col>
            <Col className="col-md-auto">
              <Router>
                <Switch>
                  <Route path="/course/" component={Course}/>
                  <Route component={Blank}/>
                </Switch>
              </Router>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
