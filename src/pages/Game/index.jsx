import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { shape, string, func } from 'prop-types';

import Countdown from '../../components/Countdown';

import addScore from '../../redux/actions/player/addScore';
import addRanking from '../../redux/actions/ranking/addRanking';
import addQuestionNumber from '../../redux/actions/game/addQuestionNumber';
import { setJson, setStorageRanking } from '../../helper/localStorage';
import level from '../../services/level';

import './styles.css';
import Questions from '../../components/Questions';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasBeenChosen: false,
      isDisabled: false,
      resetCountDown: false,
      hasBeenShuffled: false,
      hasBeenLoaded: false,
      answers: [],
      currentQuestion: [],
    };
    this.renderMain = this.renderMain.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.getPoints = this.getPoints.bind(this);
    this.getPlayer = this.getPlayer.bind(this);
    this.setLocalState = this.setLocalState.bind(this);
  }

  componentDidUpdate({ game }) {
    const { hasBeenChosen, hasBeenShuffled, hasBeenLoaded } = this.state;
    const {
      game: { questionNumber, loaded, questions },
    } = this.props;
    const checkShuffle = !hasBeenChosen && loaded && !hasBeenShuffled;

    if (game.questionNumber !== questionNumber) this.getCurrentQuestion();

    if (loaded && !hasBeenLoaded) {
      this.getCurrentQuestion();
      this.toggleState('hasBeenLoaded');
    }

    if (checkShuffle) {
      const question = questions[questionNumber];
      const shuffle = this.shuffleAnswers(question);

      this.setLocalState('answers', shuffle);
      this.toggleState('hasBeenShuffled');
    }
  }

  getCurrentQuestion() {
    const {
      game: { questions, questionNumber },
    } = this.props;
    this.setState({ currentQuestion: questions[questionNumber] });
  }

  getPlayer() {
    const {
      game: { questions, time, questionNumber },
      player,
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

    return newPlayer;
  }

  getPoints() {
    const { addScore: addScoreProps } = this.props;
    const newPlayer = this.getPlayer();

    setJson('state', newPlayer);
    addScoreProps(newPlayer.player);
  }

  setLocalState(state, value) {
    this.setState({ [state]: value });
  }

  shuffleAnswers(currentQuestion) {
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = currentQuestion;

    const incorrects = incorrectAnswers.map((text, index) => ({
      id: index,
      text,
    }));
    const correct = { text: correctAnswer };

    const answers = [...incorrects, correct];
    const half = 0.5;
    const shuffle = [...answers].sort(() => half - Math.random());
    return shuffle;
  }

  toggleState(state) {
    this.setState((oldState) => ({
      [state]: !oldState[state],
    }));
  }

  handleClick() {
    const { props } = this;
    const maxLength = 4;
    const { isDisabled } = this.state;
    const { game: { questionNumber } } = this.props;
    
    props.addQuestionNumber(questionNumber + 1);
    this.toggleState('resetCountDown');
    this.toggleState('hasBeenShuffled');
    this.toggleState('hasBeenChosen');
    
    if (isDisabled) this.toggleState('isDisabled');
    
    if (questionNumber === maxLength) {
      const { name, score, gravatarEmail } = props.player;
      const ranking = { name, score, picture: gravatarEmail };
      setStorageRanking(ranking);
      props.addQuestionNumber(0);
      props.history.push('/feedback');
      props.addRanking(ranking);
    }
  }

  renderMain() {
    const { hasBeenChosen, isDisabled, answers, currentQuestion } = this.state;

    return (
      <Questions
        hasBeenChosen={ hasBeenChosen }
        isDisabled={ isDisabled }
        answers={ answers }
        currentQuestion={ currentQuestion }
        toggleState={ this.toggleState }
        getPoints={ this.getPoints }
      />
    );
  }

  render() {
    const { user, game, player } = this.props;
    const { name } = user;
    const { questions, loaded } = game;
    const { hasBeenChosen, isDisabled, resetCountDown } = this.state;

    if (!loaded) return <h1>Loading</h1>;
    return (
      <section className="game-container">
        <header className="player-container">
          <img
            data-testid="header-profile-picture"
            alt="profile gravatar"
            src={ player.gravatarEmail }
          />
          <div>
            <h1 data-testid="header-player-name">{name}</h1>
            <p data-testid="header-score">0</p>
          </div>
        </header>
        <div className="question-container">
          <Countdown
            toggleState={ this.toggleState }
            resetCountDown={ resetCountDown }
            hasBeenChosen={ hasBeenChosen }
          />

          {questions.length && this.renderMain()}
        </div>

        <button
          type="button"
          onClick={ this.handleClick }
          className={ hasBeenChosen || isDisabled ? '' : 'hide' }
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ addScore, addRanking, addQuestionNumber }, dispatch);

Game.propTypes = {
  user: shape({
    name: string,
  }),
  addScore: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
