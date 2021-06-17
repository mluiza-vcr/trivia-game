import React, { Component } from 'react';
import { string, func, number, bool } from 'prop-types';

class Button extends Component {
  render() {
    const { index, toggleState, hasBeenChosen, isDisabled, text } = this.props;

    return (
      <button
        key={ index }
        onClick={ () => toggleState('hasBeenChosen') }
        className={ hasBeenChosen ? 'incorrect' : '' }
        type="button"
        data-testid={ `wrong-answer-${index}` }
        disabled={ isDisabled }
      >
        {text}
      </button>
    );
  }
}

Button.propTypes = {
  index: number,
  toggleState: func,
  hasBeenChosen: bool,
  isDisabled: bool,
  text: string,
}.isRequired;

export default Button;
