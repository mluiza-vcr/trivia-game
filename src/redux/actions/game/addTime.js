import actions from '..';

const addTime = (payload) => ({
  type: actions.ADD_TIME,
  payload,
});

export default addTime;
