import actions from '../actions';

const INITIAL_STATE = {
  questions: [],
  shouldRedirect: false,
  time: 0,
};

function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.ADD_QUESTION:
    return { ...state, questions: action.payload };
  case actions.SET_REDIRECT:
    return { ...state, shouldRedirect: true };
  case actions.ADD_TIME:
    return { ...state, time: action.payload };
  default:
    return state;
  }
}

export default gameReducer;
