import { CHANGE_QUESTIONS, CHANGE_QUESTION_ATTR, RESET_STATE } from "./TestOfStudentReducer"

export const ChangeQuestionAttr = (studentName, id, name, value) => {
    return (dispatch) => {
        dispatch({type: CHANGE_QUESTION_ATTR, studentName, id, name, value })
    }
}

export const SetSelectedQ = (name, id) => {
    return (dispatch, getState) => {
        let studentAnswers = getState().testOfStudent.studentAnswers;
        let questions = studentAnswers.find(student => student.studentName === name ).questions;
        let updated = questions.map((question) =>
          question.id.toString() === id.toString()
            ? { ...question, selected: true }
            : { ...question, selected: false }
        );
        dispatch({ type: CHANGE_QUESTIONS, studentName: name, questions: updated });
      };
}

export const ResetTestOfStudentState = () => {
    return (dispatch) => {
      dispatch({ type: RESET_STATE });
    };
  };
  