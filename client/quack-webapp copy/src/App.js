import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar/sidebar'
import SidebarContent from './components/Sidebar/sidebar_content'

class App extends Component {
  render() {

    const sidebar = <SidebarContent/>

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
        <Sidebar {...sidebarProps} className="sidebar"/>
        <div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </div>
    );
  }
}

export default App;
