import md5 from 'crypto-js/md5';

export const checkUser = (email, name) => {
  const checkEmail = !email;
  const checkName = !name;
  return checkEmail || checkName;
};

export const getGravatar = (email) => {
  const gravatar = md5(email).toString();
  const gravatarEmail = `https://www.gravatar.com/avatar/${gravatar}`;
  return gravatarEmail;
};

export const createUser = (email, name) => ({ email, name });

export const createPlayer = (player, user) => ({
  player: {
    ...player,
    name: user.name,
    gravatarEmail: getGravatar(user.email),
  },
});
