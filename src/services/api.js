const tokenURL = 'https://opentdb.com/api_token.php?command=request';

export const fetchToken = async () => {
  const response = await fetch(tokenURL);
  const json = await response.json();
  return json;
};

export const fetchQuestions = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const json = await response.json();
  return json;
};
