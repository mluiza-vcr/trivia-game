import actions from '..';
import { fetchQuestions } from '../../../services/api';

const addQuestion = (payload) => ({
  type: actions.ADD_QUESTION,
  payload,
});

const setRedirect = () => ({
  type: actions.SET_REDIRECT,
});

const fetchGameThunk = (token) => async (dispatch) => {
  const { results } = await fetchQuestions(token);
  dispatch(addQuestion(results));
  dispatch(setRedirect());
};

export default fetchGameThunk;
