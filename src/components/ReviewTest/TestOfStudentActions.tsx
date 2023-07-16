import { AppDispatch, RootState } from "../../app/store"
import { CHANGE_QUESTIONS, CHANGE_QUESTION_ATTR, RESET_STATE } from "./TestOfStudentReducer"

export const ChangeQuestionAttr = (studentName: string, id: number, name: string, value: any) => {
    return (dispatch: AppDispatch) => {
        dispatch({type: CHANGE_QUESTION_ATTR, studentName, id, name, value })
    }
}

export const SetSelectedQ = (name: string, id: number) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        let studentAnswers = getState().testOfStudent.studentAnswers;
        let questions = studentAnswers.find((student: any) => student.studentName === name )!.questions || [];
        let updated = questions!.map((question: any) =>
          question.id.toString() === id.toString()
            ? { ...question, selected: true }
            : { ...question, selected: false }
        );
        dispatch({ type: CHANGE_QUESTIONS, studentName: name, questions: updated });
      };
}

export const ResetTestOfStudentState = () => {
    return (dispatch: AppDispatch) => {
      dispatch({ type: RESET_STATE });
    };
  };
  