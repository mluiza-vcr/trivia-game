import actions from '../actions';

const INITIAL_STATE = [];

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.ADD_RANKING:
    return [...state, action.payload];

  default:
    return state;
  }
}

export default userReducer;
