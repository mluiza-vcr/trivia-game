import { getStorageRanking } from '../../helper/localStorage';
import actions from '../actions';

const DEFAULT_STATE = [];
const INITIAL_STATE = getStorageRanking(DEFAULT_STATE, 'ranking');

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.ADD_RANKING:
    return [...state, action.payload];

  default:
    return state;
  }
}

export default userReducer;
