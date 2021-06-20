import { setJson } from './localStorage';

export const resetPlayer = (actionPlayer) => {
  const initialPlayer = {
    player: {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    },
  };

  actionPlayer(initialPlayer.player);
  setJson('state', initialPlayer);
};

export const playAgain = (history, addPlayer) => {
  resetPlayer(addPlayer);
  history.push('/');
};
