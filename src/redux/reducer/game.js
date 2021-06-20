import actions from '../actions';

const INITIAL_STATE = {
  questions: [],
  loaded: false,
  time: 0,
  questionNumber: 0,
};

function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.ADD_QUESTION:
    return { ...state, questions: action.payload };
  case actions.SET_REDIRECT:
    return { ...state, loaded: !state.loading };
  case actions.ADD_TIME:
    return { ...state, time: action.payload };
  case actions.ADD_QUESTION_NUMBER:
    return { ...state, questionNumber: action.payload };
  default:
    return state;
  }
}

export default gameReducer;
