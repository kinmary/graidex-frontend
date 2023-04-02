import {
  ADD_ANSWER,
  ADD_QUESTION,
  CHANGE_QUESTIONS,
  CHANGE_TEST_TITLE,
  INPUT_CHANGE,
  RESET_STATE,
  CHANGE_ANSWERS,
  ADD_FILES,
  REMOVE_FILE,
} from "./CreateTestReducer";

export const ChangeTitle = (testTitle) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_TEST_TITLE, testTitle });
  };
};
export const ChangeQuestions = (questions) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_QUESTIONS, questions });
  };
};
export const AddQuestion = (question) => {
  return (dispatch) => {
    dispatch({ type: ADD_QUESTION, question });
  };
};

export const ResetCreateTestState = () => {
  return (dispatch) => {
    dispatch({ type: RESET_STATE });
  };
};

export const SetSelectedQ = (id) => {
  return (dispatch, getState) => {
    let questions = getState().createTest.questions;
    let updated = questions.map((question) =>
      question.id.toString() === id.toString()
        ? { ...question, selected: true }
        : { ...question, selected: false }
    );
    dispatch({ type: CHANGE_QUESTIONS, questions: updated });
  };
};

export const InputChange = (id, name, value) => {
  return (dispatch, getState) => {
    dispatch({ type: INPUT_CHANGE, id, name, value });
  };
};

export const AddAnswer = (id, answer) => {
  return (dispatch) => {
    dispatch({ type: ADD_ANSWER, id, answer });
  };
};
export const ChangeAnswers = (id, answerOptions) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_ANSWERS, id, answerOptions });
  };
};

export const addFiles = (id, files, previews) => {
  return (dispatch) => {
    dispatch({
      type: ADD_FILES,
      id,
      files,
      previews,
    });
  };
};

export const removeFile = (id, index) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_FILE,
      id,
      index,
    });
  };
};
