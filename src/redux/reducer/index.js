import { combineReducers } from 'redux';
import user from './user';
import game from './game';
import player from './player';

const rootReducer = combineReducers({ user, game, player });

export default rootReducer;
