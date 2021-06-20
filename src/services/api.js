const tokenURL = 'https://opentdb.com/api_token.php?command=request';
const questionURL = (token) => `https://opentdb.com/api.php?amount=5&token=${token}`;

const asyncFetch = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

export const fetchToken = async () => {
  const response = await asyncFetch(tokenURL);
  return response;
};

export const fetchQuestions = async (token) => {
  const response = await asyncFetch(questionURL(token));
  return response;
};
