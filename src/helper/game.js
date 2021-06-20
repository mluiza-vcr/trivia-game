const shuffleAnswers = (currentQuestion) => {
  const {
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers,
  } = currentQuestion;

  const incorrects = incorrectAnswers.map((text, index) => ({
    id: index,
    text,
  }));
  const correct = { text: correctAnswer };

  const answers = [...incorrects, correct];
  const half = 0.5;
  const shuffle = [...answers].sort(() => half - Math.random());
  return shuffle;
};

export default shuffleAnswers;
