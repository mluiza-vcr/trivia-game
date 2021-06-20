import React, { Component } from 'react';

import { func } from 'prop-types';
import { RiSettings4Fill } from 'react-icons/ri';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import addUser from '../../redux/actions/user/addUser';
import fetchGameThunk from '../../redux/actions/game/addQuestion';
import addPlayer from '../../redux/actions/player/addPlayer';
import { fetchToken } from '../../services/api';
import { checkUser, createPlayer, createUser } from '../../helper/user';
import { setJson, setStorage } from '../../helper/localStorage';

import './styles.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFetchToken = this.handleFetchToken.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async handleFetchToken() {
    const { props } = this;
    const { player } = props;
    const { email, name } = this.state;
    const { token } = await fetchToken();
    const user = createUser(email, name);
    const newPlayer = createPlayer(player, user);

    setStorage('token', token);
    props.addUser(user);
    props.history.push('/game');
    props.fetchGameThunk(token);
    props.addPlayer(newPlayer.player);
    setJson('state', newPlayer);
  }

  render() {
    const { history } = this.props;
    const { name, email } = this.state;

    return (
      <div className="App">
        <button
          className="btn-settings"
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          <RiSettings4Fill />
        </button>

        <header className="App-header">
          <h1 className="App-logo title-trivia" alt="logo">
            TRIVIA
          </h1>
        </header>

        <main className="login-container">
          <div className="input-container">
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
          </div>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ checkUser(email, name) }
            onClick={ this.handleFetchToken }
          >
            JOGAR
          </button>
        </main>
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

Login.propTypes = {
  addUser: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
