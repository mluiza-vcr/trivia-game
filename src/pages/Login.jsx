import React, { Component } from 'react';
import { func } from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import addUser from '../redux/actions/addUser';
import fetchGameThunk from '../redux/actions/addQuestion';
import { fetchToken } from '../services/api';
import { setStorage } from '../helper/localStorage';

import logo from '../trivia.png';
import '../App.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };

    this.isDisabled = this.isDisabled.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFetchToken = this.handleFetchToken.bind(this);
    this.createUser = this.createUser.bind(this);
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

  createUser() {
    const { email, name } = this.state;

    const user = {
      email,
      name,
    };

    return user;
  }

  async handleFetchToken() {
    const { props } = this;
    const { token } = await fetchToken();
    setStorage('token', token);

    props.addUser(this.createUser());
    props.history.push('/game');
    props.fetchGameThunk(token);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />

          <button type="button" data-testid="btn-settings">
            <Link to="/settings">Settings</Link>
          </button>
        </header>

        <div>
          <input
            data-testid="input-player-name"
            onChange={ this.handleChange }
            name="name"
            placeholder="name"
          />
          <input
            data-testid="input-gravatar-email"
            type="email"
            onChange={ this.handleChange }
            name="email"
            placeholder="email"
          />
          <button
            data-testid="btn-play"
            type="button"
            disabled={ this.isDisabled() }
            onClick={ this.handleFetchToken }
          >
            Jogar
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  shouldRedirect: state.game.shouldRedirect,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ addUser, fetchGameThunk }, dispatch)
);

// const mapDispatchToProps = (dispatch) => ({
//   addUserProps: (user) => dispatch(addUser(user)),
// });

Login.propTypes = {
  addUser: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
