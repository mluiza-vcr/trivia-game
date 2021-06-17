import React, { Component } from 'react';
import { shape, string, func } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Countdown from '../components/Countdown';
import addScore from '../redux/actions/addScore';
import { setJson } from '../helper/localStorage';
import level from '../services/level';
import './game.css';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questionNumber: 0,
      hasBeenChosen: false,
      isDisabled: false,
      resetCountDown: false,
    };
    this.renderMain = this.renderMain.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChosen = this.handleChosen.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.getPoints = this.getPoints.bind(this);
  }

  getPoints() {
    const { questionNumber } = this.state;
    const {
      game: { questions, time },
      player,
      addScore: addScoreProps,
    } = this.props;
    const { difficulty } = questions[questionNumber];
    const numberPoints = 10;
    const score = numberPoints + time * level[difficulty];
    const newPlayer = {
      player: {
        ...player,
        assertions: player.assertions + 1,
        score: player.score + score,
      },
    };
    setJson('state', newPlayer);
    addScoreProps(newPlayer.player);
  }

  toggleState(state) {
    this.setState((oldState) => ({
      [state]: !oldState[state],
    }));
  }

  handleClick() {
    const { props } = this;
    const maxLength = 4;

    const { isDisabled, questionNumber } = this.state;
    this.setState((oldState) => ({
      questionNumber: oldState.questionNumber + 1,
    }));
    this.toggleState('resetCountDown');
    this.handleChosen();
    if (isDisabled) {
      this.toggleState('isDisabled');
    }
    if (questionNumber === maxLength) {
      props.history.push('/feedback');
    }
  }

  handleChosen() {
    this.setState({
      hasBeenChosen: false,
    });
  }

  renderMain(questions) {
    const { hasBeenChosen, isDisabled } = this.state;
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions;

    const button = (text, index) => (
      <button
        onClick={ () => this.toggleState('hasBeenChosen') }
        className={ hasBeenChosen ? 'incorrect' : '' }
        type="button"
        data-testid={ `wrong-answer-${index}` }
        disabled={ isDisabled }
      >
        {text}
      </button>
    );
    const incorrect = incorrectAnswers.map((answer, index) => button(answer, index));
    const correct = (
      <button
        onClick={ () => {
          this.toggleState('hasBeenChosen');
          this.getPoints();
        } }
        className={ hasBeenChosen ? 'correct' : '' }
        type="button"
        data-testid="correct-answer"
        disabled={ isDisabled }
      >
        {correctAnswer}
      </button>
    );

    const answers = [...incorrect, correct];
    const half = 0.5;
    const shuffle = [...answers].sort(() => half - Math.random());

    return (
      <main>
        <h3 data-testid="question-category">{category}</h3>
        <h2 data-testid="question-text">{question}</h2>
        {shuffle.map((btn) => btn)}
      </main>
    );
  }

  render() {
    const { user, game, player } = this.props;
    const { name } = user;
    const { questions } = game;
    const { questionNumber, resetCountDown, hasBeenChosen } = this.state;
    const currentQuestion = questions[questionNumber];

    return (
      <section>
        <header>
          <img
            data-testid="header-profile-picture"
            alt="profile gravatar"
            src={ player.gravatarEmail }
          />
          <h1 data-testid="header-player-name">{name}</h1>
          <p data-testid="header-score">0</p>
        </header>
        <Countdown
          toggleState={ this.toggleState }
          resetCountDown={ resetCountDown }
          hasBeenChosen={ hasBeenChosen }
        />
        {questions.length > 0 && this.renderMain(currentQuestion)}
        <button
          type="button"
          onClick={ this.handleClick }
          className={ hasBeenChosen ? '' : 'hide' }
          data-testid="btn-next"
        >
          Próxima pergunta
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  game: state.game,
  player: state.player,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ addScore }, dispatch);

Game.propTypes = {
  user: shape({
    name: string,
  }),
  addScore: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
