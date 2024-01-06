import { AppDispatch, RootState } from "../../app/store"
import { CHANGE_REVIEW_QUESTIONS, CHANGE_REVIEW_QUESTION_ATTR, RESET_REVIEW_STATE } from "./TestOfStudentReducer"

export const ChangeQuestionAttr = (id: number, name: string, value: any) => {
    return (dispatch: AppDispatch) => {
        dispatch({type: CHANGE_REVIEW_QUESTION_ATTR, id, name, value })
    }
}

export const SetSelectedQ = (id: number) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        let testResult = getState().testOfStudent.testResult;
        let updated = testResult.resultAnswers.map((resultAnswer: any) =>
          resultAnswer.question.id.toString() === id.toString()
            ? { ...resultAnswer, question: {...resultAnswer.question, selected: true }}
            : { ...resultAnswer, question: {...resultAnswer.question, selected: false }}
        );
        dispatch({ type: CHANGE_REVIEW_QUESTIONS, questions: updated });
      };
}

export const ResetTestOfStudentState = () => {
    return (dispatch: AppDispatch) => {
      dispatch({ type: RESET_REVIEW_STATE });
    };
  };
  