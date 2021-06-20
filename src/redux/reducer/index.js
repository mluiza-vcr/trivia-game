import { combineReducers } from 'redux';
import user from './user';
import game from './game';
import player from './player';
import ranking from './ranking';

const rootReducer = combineReducers({ user, game, player, ranking });

export default rootReducer;
