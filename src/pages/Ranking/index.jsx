import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shape, string, number } from 'prop-types';
import addPlayer from '../../redux/actions/player/addPlayer';
import { playAgain } from '../../helper/player';
import { bindActionCreators } from 'redux';

class Ranking extends Component {
  render() {
    const { ranking, history, addPlayer: addPlayerProps } = this.props;
    const sortedRanking = [...ranking].sort((a, b) => b.score - a.score);

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {sortedRanking.map(({ name, picture, score }, index) => (
            <li key={ index }>
              <img src={ picture } alt="gravatar" />
              <p data-testid={ `player-name-${index}` }>{name}</p>
              <p data-testid={ `player-score-${index}` }>{score}</p>
            </li>
          ))}
        </ul>

        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ () => playAgain(history, addPlayerProps) }
        >
          Página inicial
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ranking: state.ranking,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ addPlayer }, dispatch)
);

Ranking.propTypes = {
  ranking: shape({
    name: string,
    score: number,
    picture: string,
  }),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
