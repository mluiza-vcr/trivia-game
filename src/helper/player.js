import { setJson } from './localStorage';

const resetPlayer = (actionPlayer) => {
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

export default resetPlayer;
