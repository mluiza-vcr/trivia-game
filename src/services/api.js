const tokenURL = 'https://opentdb.com/api_token.php?command=request';

const fetchToken = async () => {
  const response = await fetch(tokenURL);
  const json = await response.json();
  return json;
};

export default fetchToken;
