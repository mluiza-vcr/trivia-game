import React, { Component } from 'react';
import { func, bool } from 'prop-types';

class Countdown extends Component {
  constructor() {
    super();

    this.state = {
      time: 30,
      hasBeenDisabled: false,
    };
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    this.countDown();
  }

  componentDidUpdate() {
    this.resetState();
  }

  resetState() {
    const { toggleState, resetCountDown } = this.props;
    const { time, interval, hasBeenDisabled } = this.state;
    if (!time && !hasBeenDisabled) {
      clearInterval(interval);
      toggleState('isDisabled');
      this.toggleDisabled('hasBeenDisabled');
    }
    if (resetCountDown) {
      this.setState({
        time: 30,
      });
      this.countDown();
      toggleState('resetCountDown');
      this.toggleDisabled('hasBeenDisabled');
    }
  }

  toggleDisabled(state) {
    this.setState((oldState) => ({
      [state]: !oldState[state],
    }));
  }

  countDown() {
    const second = 1000;
    const interval = setInterval(() => {
      this.setState((oldState) => ({
        time: oldState.time - 1,
      }));
    }, second);
    this.setState({ interval });
  }

  render() {
    const { time } = this.state;
    return (
      <div>
        { time }
      </div>
    );
  }
}

Countdown.propTypes = {
  toggleState: func,
  resetCountDown: bool,
}.isRequired;

export default Countdown;
