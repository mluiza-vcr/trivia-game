import React, { Component } from 'react';
import { bol, arrayOf, shape, number, string, func } from 'prop-types';
import { decode } from 'he';
import Button from '../Button';
import buttonStyles from '../../styles/button';

class Questions extends Component {
  render() {
    const { props } = this;
    const {
      category,
      question,
      correct_answer: correctAnswer,
    } = props.currentQuestion;
    const filteredQuestion = question || '';

    return (
      <main className="render-main-container">
        <h2 data-testid="question-category">{category}</h2>
        <h3 data-testid="question-text">{decode(filteredQuestion)}</h3>

        <div>
          {props.answers.map(({ text, id }, index) => {
            if (text !== correctAnswer) {
              return (
                <Button
                  key={ index }
                  index={ id }
                  toggleState={ props.toggleState }
                  hasBeenChosen={ props.hasBeenChosen }
                  isDisabled={ props.isDisabled }
                  text={ text }
                />
              );
            }
            return (
              <button
                key={ index }
                onClick={ () => {
                  props.toggleState('hasBeenChosen');
                  props.getPoints();
                } }
                style={ props.hasBeenChosen ? buttonStyles.correct : {} }
                type="button"
                data-testid="correct-answer"
                disabled={ props.isDisabled }
              >
                {correctAnswer}
              </button>
            );
          })}
        </div>
      </main>
    );
  }
}

Questions.propTypes = {
  hasBeenChosen: bol,
  isDisabled: bol,
  answers: arrayOf(
    shape({
      text: string,
      id: number,
    }),
  ),
  currentQuestion: shape({
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: arrayOf(string),
    question: string,
    type: string,
  }),
  toggleState: func,
  getPoints: func,
}.isRequired;

export default Questions;
