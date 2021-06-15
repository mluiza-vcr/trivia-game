import actions from '../actions';

const INITIAL_STATE = {
  questions: [],
};

function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.ADD_QUESTION:
    return { ...state, questions: action.payload };
  default:
    return state;
  }
}

export default gameReducer;
