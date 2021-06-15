import { getStorage } from '../helper/localStorage';

const tokenURL = 'https://opentdb.com/api_token.php?command=request';

export const fetchToken = async () => {
  const response = await fetch(tokenURL);
  const json = await response.json();
  return json;
};

const token = getStorage('token');
const questionsURL = `https://opentdb.com/api.php?amount=5&token=${token}`;

export const fetchQuestions = async () => {
  const response = await fetch(questionsURL);
  const json = await response.json();
  return json;
};
