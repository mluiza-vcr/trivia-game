import React, { Component } from 'react';
import { func, bool } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import addTime from '../redux/actions/addTime';

const initialState = { time: 30, hasBeenDisabled: false };

class Countdown extends Component {
  constructor() {
    super();

    this.state = initialState;
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    this.countDown();
  }

  componentDidUpdate() {
    this.resetState();
    const { hasBeenChosen, addTime: addTimeProps, getTime } = this.props;
    const { time, interval } = this.state;
    const checkTime = time !== getTime;
    if (hasBeenChosen && checkTime) {
      addTimeProps(time);
      clearInterval(interval);
    }
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
      this.setState(initialState);
      this.countDown();
      toggleState('resetCountDown');
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
  addTime: func,
}.isRequired;

const mapStateToProps = (state) => ({
  getTime: state.game.time,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ addTime }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Countdown);
