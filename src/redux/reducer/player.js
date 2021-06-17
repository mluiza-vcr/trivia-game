import actions from '../actions';

const INITIAL_STATE = {
  name: '', assertions: 0, score: 0, gravatarEmail: '',
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.ADD_PLAYER:
    return { ...state, ...action.payload };
  case actions.ADD_SCORE:
    return { ...state, ...action.payload };
  default:
    return state;
  }
}

export default playerReducer;
