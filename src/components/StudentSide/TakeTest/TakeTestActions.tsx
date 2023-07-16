import { AppDispatch, RootState } from "../../../app/store";
import IAnswerOption from "../../../interfaces/AnswerOption";
import { CHANGE_ANSWERS, CHANGE_QUESTIONS, INPUT_CHANGE, RESET_STATE } from "./TakeTestReducer";


export const ResetTakeTestState = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: RESET_STATE });
  };
};

export const SetSelectedQ = (id: number) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    let questions = getState().takeTest.questions;
    let updated = questions?.map((question: any) =>
      question.id.toString() === id.toString()
        ? { ...question, selected: true }
        : { ...question, selected: false }
    );
    dispatch({ type: CHANGE_QUESTIONS, questions: updated });
  };
};

export const InputChange = (id: number,  text: string) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch({ type: INPUT_CHANGE, id, text });
  };
};

export const ChangeAnswers = (id: number, answerOptions: IAnswerOption[]) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch({ type: CHANGE_ANSWERS, id, answerOptions });
  };
};
