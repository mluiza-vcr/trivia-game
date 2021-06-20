import React, { Component } from 'react';
import { shape, string, number } from 'prop-types';
import { connect } from 'react-redux';

import addPlayer from '../../redux/actions/player/addPlayer';
import { playAgain } from '../../helper/player';

class Feedback extends Component {
  render() {
    const { player, history, addPlayer: addPlayerProps } = this.props;
    const { name, assertions, score, gravatarEmail } = player;

    const minAssertions = 3;
    const feedbackText = assertions < minAssertions
      ? 'Podia ser melhor...'
      : 'Mandou bem!';

    return (
      <main>
        <header>
          <img
            data-testid="header-profile-picture"
            alt="gravatar"
            src={ gravatarEmail }
          />
          <span data-testid="header-player-name">{name}</span>
          <span data-testid="header-score">{score}</span>
        </header>

        <div>
          <h1 data-testid="feedback-text">{feedbackText}</h1>
          <h1 data-testid="feedback-total-question">{assertions}</h1>
          <h2 data-testid="feedback-total-score">{score}</h2>
        </div>

        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => playAgain(history, addPlayerProps) }
        >
          Jogar novamente
        </button>

        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ver Ranking
        </button>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  addPlayer: (player) => dispatch(addPlayer(player)),
});

Feedback.propTypes = {
  player: shape({
    name: string,
    assertions: number,
    score: number,
    gravatarEmail: string,
  }),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
