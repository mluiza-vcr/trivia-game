import actions from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.ADD_USER:
    return { ...state, ...action.payload };

  default:
    return state;
  }
}

export default userReducer;
