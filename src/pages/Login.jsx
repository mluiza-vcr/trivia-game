import React, { Component } from 'react';
import { func } from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

import addUser from '../redux/actions/addUser';
import fetchGameThunk from '../redux/actions/addQuestion';
import addPlayer from '../redux/actions/addPlayer';
import { fetchToken } from '../services/api';
import { setJson, setStorage } from '../helper/localStorage';

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
    const { player } = props;
    const user = this.createUser();
    const gravatar = md5(user.email).toString();
    const gravatarEmail = `https://www.gravatar.com/avatar/${gravatar}`;
    const newPlayer = {
      player: {
        ...player,
        name: user.name,
        gravatarEmail,
      },
    };
    const { token } = await fetchToken();
    setStorage('token', token);

    props.addUser(user);
    props.history.push('/game');
    props.fetchGameThunk(token);
    props.addPlayer(newPlayer.player);
    setJson('state', newPlayer);
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
  player: state.player,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ addUser, fetchGameThunk, addPlayer }, dispatch)
);

// const mapDispatchToProps = (dispatch) => ({
//   addUserProps: (user) => dispatch(addUser(user)),
// });

Login.propTypes = {
  addUser: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
