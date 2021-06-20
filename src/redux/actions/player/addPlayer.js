import actions from '..';

const addPlayer = (payload) => ({
  type: actions.ADD_PLAYER,
  payload,
});

export default addPlayer;
