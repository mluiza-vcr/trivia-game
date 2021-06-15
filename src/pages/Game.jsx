import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import { connect } from 'react-redux';

class Game extends Component {
  render() {
    const { user } = this.props;
    const { name } = user;

    return (
      <section>
        <header>
          <img data-testid="header-profile-picture" alt="profile gravatar" />
          <h1 data-testid="header-player-name">{name}</h1>
          <p data-testid="header-score">0</p>
        </header>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Game.propTypes = {
  user: shape({
    name: string,
  }),
}.isRequired;

export default connect(mapStateToProps)(Game);
