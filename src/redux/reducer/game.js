import actions from '../actions';

const INITIAL_STATE = {
  questions: [],
  shouldRedirect: false,
};

function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.ADD_QUESTION:
    return { ...state, questions: action.payload };
  case actions.SET_REDIRECT:
    return { ...state, shouldRedirect: true };
  default:
    return state;
  }
}

export default gameReducer;
