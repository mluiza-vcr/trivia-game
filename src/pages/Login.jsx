import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import fetchToken from '../services/api';

import logo from '../trivia.png';
import '../App.css';
import { setStorage } from '../helper/localStorage';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      shouldRedirect: false,
    };

    this.isDisabled = this.isDisabled.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFetchToken = this.handleFetchToken.bind(this);
  }

  setShouldRedirect() {
    this.setState({ shouldRedirect: true });
  }

  isDisabled() {
    const { email, name } = this.state;

    const checkEmail = !email; // email.lenght === 0;
    const checkName = !name; // name.lenght === 0;

    return checkEmail || checkName;
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async handleFetchToken() {
    const { token } = await fetchToken();
    setStorage('token', token);

    this.setShouldRedirect();
  }

  render() {
    const { shouldRedirect } = this.state;

    if (shouldRedirect) return <Redirect to="/game" />;

    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>

        <div>
          <input
            data-testid="input-player-name"
            onChange={ this.handleChange }
            name="name"
          />
          <input
            data-testid="input-gravatar-email"
            type="email"
            onChange={ this.handleChange }
            name="email"
          />
          <button
            data-testid="btn-play"
            type="button"
            disabled={ this.isDisabled() }
            onClick={ this.handleFetchToken }
          >
            <Link to="/game">Jogar</Link>
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
