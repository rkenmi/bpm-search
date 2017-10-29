import React, { Component } from 'react';
import { Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    let loginUrl = `/api`;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          Or if you're using webpack-dev-server, no need to reload.

          ( ͡° ͜ʖ ͡°)
        </p>
        <ButtonGroup>
          <DropdownButton id="dropdown-btn-menu" bsStyle="success" title="Dropdown">
            <MenuItem key="1">Dropdown link</MenuItem>
            <MenuItem key="2">Dropdown link</MenuItem>
          </DropdownButton>
          <Button bsStyle="info">Middle</Button>
          <Button bsStyle="info">Right</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default App;
