import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import { connect } from 'react-redux';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questionNumber: 0,
      // hasBeenChosen: false,
    };
    this.renderMain = this.renderMain.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((oldState) => ({
      questionNumber: oldState.questionNumber + 1,
    }));
  }

  // handleChosen() {
  //   this.setState({
  //     hasBeenChosen: true,
  //   }),
  // }

  renderMain(questions) {
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = questions;

    const button = (text, index) => (
      <button type="button" data-testid={ `wrong-answer-${index}` }>{text}</button>
    );

    const incorrect = incorrectAnswers.map((answer, index) => button(answer, index));
    const correct = (
      <button type="button" data-testid="correct-answer">{correctAnswer}</button>
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
    const { user, game } = this.props;
    const { name } = user;
    const { questions } = game;
    const { questionNumber } = this.state;
    const currentQuestion = questions[questionNumber];
    const maxLength = 4;

    return (
      <section>
        <header>
          <img data-testid="header-profile-picture" alt="profile gravatar" />
          <h1 data-testid="header-player-name">{name}</h1>
          <p data-testid="header-score">0</p>
        </header>
        {questions.length > 0 && this.renderMain(currentQuestion)}
        <button
          type="button"
          onClick={ this.handleClick }
          disabled={ questionNumber === maxLength }
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
});

Game.propTypes = {
  user: shape({
    name: string,
  }),
}.isRequired;

export default connect(mapStateToProps)(Game);
