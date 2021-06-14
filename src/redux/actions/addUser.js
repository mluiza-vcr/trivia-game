import actions from '.';

const addUser = (payload) => ({
  type: actions.ADD_USER,
  payload,
});

export default addUser;
