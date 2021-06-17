import actions from '.';

const addScore = (payload) => ({
  type: actions.ADD_SCORE,
  payload,
});

export default addScore;
