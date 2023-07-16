import { AppDispatch, RootState } from "../../../app/store";
import IAnswerOption from "../../../interfaces/AnswerOption";
import { IQuestion } from "../../../interfaces/Questions";
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

export const ChangeTitle = (testTitle: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: CHANGE_TEST_TITLE, testTitle });
  };
};
export const ChangeQuestions = (questions: IQuestion[]) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: CHANGE_QUESTIONS, questions });
  };
};
export const AddQuestion = (question: IQuestion) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: ADD_QUESTION, question });
  };
};

export const ResetCreateTestState = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: RESET_STATE });
  };
};

export const SetSelectedQ = (id: number) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    let questions = getState().createTest.questions;
    let updated = questions?.map((question: any) =>
      question.id.toString() === id.toString()
        ? { ...question, selected: true }
        : { ...question, selected: false }
    );
    dispatch({ type: CHANGE_QUESTIONS, questions: updated });
  };
};

export const InputChange = (id: number, name: string, value: any) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch({ type: INPUT_CHANGE, id, name, value });
  };
};

export const AddAnswer = (id: number, answer: IAnswerOption) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch({ type: ADD_ANSWER, id, answer });
  };
};
export const ChangeAnswers = (id: number, answerOptions: IAnswerOption[]) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch({ type: CHANGE_ANSWERS, id, answerOptions });
  };
};

export const addFiles = (id: number, files: any[], previews: any[]) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch({
      type: ADD_FILES,
      id,
      files,
      previews,
    });
  };
};

export const removeFile = (id: number, index: number) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch({
      type: REMOVE_FILE,
      id,
      index,
    });
  };
};
