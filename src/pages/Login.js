import React, { Component } from 'react';
import logo from '../trivia.png';
import '../App.css';

class Login extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default Login;
