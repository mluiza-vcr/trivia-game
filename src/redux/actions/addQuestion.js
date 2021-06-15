import actions from '.';
import { fetchQuestions } from '../../services/api';

const addQuestion = (payload) => ({
  type: actions.ADD_QUESTION,
  payload,
});

const fetchGameThunk = () => async (dispatch) => {
  const { results } = await fetchQuestions();
  dispatch(addQuestion(results));
};

export default fetchGameThunk;
