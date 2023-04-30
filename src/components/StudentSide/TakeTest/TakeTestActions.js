import { CHANGE_ANSWERS, CHANGE_QUESTIONS, INPUT_CHANGE, RESET_STATE } from "./TakeTestReducer";


export const ResetTakeTestState = () => {
  return (dispatch) => {
    dispatch({ type: RESET_STATE });
  };
};

export const SetSelectedQ = (id) => {
  return (dispatch, getState) => {
    let questions = getState().takeTest.questions;
    let updated = questions.map((question) =>
      question.id.toString() === id.toString()
        ? { ...question, selected: true }
        : { ...question, selected: false }
    );
    dispatch({ type: CHANGE_QUESTIONS, questions: updated });
  };
};

export const InputChange = (id,  text) => {
  return (dispatch, getState) => {
    dispatch({ type: INPUT_CHANGE, id, text });
  };
};

export const ChangeAnswers = (id, answerOptions) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_ANSWERS, id, answerOptions });
  };
};
