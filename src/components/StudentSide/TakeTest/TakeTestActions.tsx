import axios from "axios";
import { AppDispatch, RootState } from "../../../app/store";
import IAnswerOption from "../../../interfaces/AnswerOption";
import { API_BASE_URL } from "../../../constants/config";
import { IQuestion } from "../../../interfaces/Questions";
import { CHANGE_STUD_ANSWERS, CHANGE_STUD_QUESTIONS, INPUT_STUD_CHANGE, RESET_STUD_STATE } from "./TakeTestReducer";


export const ResetTakeTestState = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: RESET_STUD_STATE });
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
    dispatch({ type: CHANGE_STUD_QUESTIONS, questions: updated });
  };
};

export const InputChange = (id: number,  text: string) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch({ type: INPUT_STUD_CHANGE, id, text });
  };
};

export const ChangeAnswers = (id: number, answerOptions: IAnswerOption[]) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch({ type: CHANGE_STUD_ANSWERS, id, answerOptions });
  };
};

export const getAllQuestionsWithAnswers = (testResultid: string) => {    
      return async (dispatch: AppDispatch) => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/api/TestResult/get-all-questions-with-answers/` + testResultid
          );
          dispatch({ type: RESET_STUD_STATE });
          if (response.data.length !== 0) {
            let questions: IQuestion[] = [];
            response.data.answers.forEach((question: any, idx: number) => {
              switch (question.$type) {
                case 'TestAttemptSingleChoiceQuestionForStudentDto':
                  let options: IAnswerOption[] = question.options.map(
                    (x: any, idx: number) => {
                      return {
                        id: idx,
                        text: x.text,
                        isCorrect: false,
                        selected: false,
                      };
                    }
                  );
                  let single: IQuestion = {
                    id: idx,
                    title: question.text,
                    comment: question.defaultComment,
                    maxPoints: question.maxPoints,
                    type: 0,
                    selected: false,
                    answerOptions: options,
                  };
                  questions.push(single);
                  break;
                case 'TestAttemptMultipleChoiceQuestionForStudentDto':
                  let answerOptions: IAnswerOption[] = question.options.map(
                    (x: any, idx: number) => {
                      return {
                        id: idx,
                        text: x.option.text,
                        isCorrect: false,
                        selected: false,
                      };
                    }
                  );
                  let multiple: IQuestion = {
                    id: idx,
                    title: question.text,
                    comment: question.defaultComment,
                    maxPoints: question.pointsPerCorrectAnswer,
                    type: 1,
                    selected: false,
                    answerOptions: answerOptions,
                  };
                  questions.push(multiple);
                  break;
                case 'TestAttemptOpenQuestionForStudentDto':
                  let open: IQuestion = {
                    id: idx,
                    title: question.text,
                    comment: question.defaultComment,
                    maxPoints: question.maxPoints,
                    type: 2,
                    selected: false,
                    answerOptions: [],
                  };
                  questions.push(open);
                  break;
              }
            });
            dispatch({ type: CHANGE_STUD_QUESTIONS, questions: questions });
            // dispatch({ type: CHANGE_QUESTIONS, questions: response.data });
            return true;
          }
        } catch (error: any) {
          alert(error.message);
          return false;
        }
      };
};

export const startTestAttempt = (testid: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/TestResult/start-test-attempt/` + testid
      );
      if (response.status === 200) {
        
       return response.data;
      }
      return false;
    } catch (error: any) {
      if (error.response.status === 400) {
        //Bad Request
        // alert("Error");
        return false;
      } else {
        //   dispatch(CheckAuthorization(error.response.status));
        alert(error.message);
        return false;
      }
    }
  };
};


export const updateTestAttempt = (testResultid: string, question: IQuestion, index: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      let answerDto = {};
      switch (question.type) {
        case 0:
          let choiceOptionIndex: number = question.answerOptions.findIndex((x: IAnswerOption) => x.selected === true);
          answerDto = {
            choiceOptionIndex: choiceOptionIndex
          };
          break;
        case 1:
          let selectedIndexes: number[] = question.answerOptions.reduce((indexes: number[], option: IAnswerOption, index: number) => {
            if (option.selected === true) {
              indexes.push(index);
            }
            return indexes;
          }, []);
          answerDto = {
            choiceOptionIndexes: selectedIndexes
          };
          break;
        case 2:
          answerDto = {
            choiceOptionIndexes: question.answerOptions[0].text
          };
          break;
        }
      const response = await axios.put(
        `${API_BASE_URL}/api/TestResult/update-test-attempt/` + testResultid +`?index=` +
        index, answerDto
      );
      if (response.status === 200) {
       return response.data;
      }
      return false;
    } catch (error: any) {
      if (error.response.status === 400) {
        //Bad Request
        // alert("Error");
        return false;
      } else {
        //   dispatch(CheckAuthorization(error.response.status));
        alert(error.message);
        return false;
      }
    }
  };
};


export const submitTestAttempt = (testResultid: string, question: IQuestion, index: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      let answerDto = {};
      switch (question.type) {
        case 0:
          let choiceOptionIndex: number = question.answerOptions.findIndex((x: IAnswerOption) => x.selected === true);
          answerDto = {
            choiceOptionIndex: choiceOptionIndex
          };
          break;
        case 1:
          let selectedIndexes: number[] = question.answerOptions.reduce((indexes: number[], option: IAnswerOption, index: number) => {
            if (option.selected === true) {
              indexes.push(index);
            }
            return indexes;
          }, []);
          answerDto = {
            choiceOptionIndexes: selectedIndexes
          };
          break;
        case 2:
          answerDto = {
            choiceOptionIndexes: question.answerOptions[0].text
          };
          break;
        }
      const response = await axios.put(
        `${API_BASE_URL}/api/TestResult/submit-test-attempt/` + testResultid +`?index=` +
        index, answerDto
      );
      if (response.status === 200) {
       return response.data;
      }
      return false;
    } catch (error: any) {
      if (error.response.status === 400) {
        //Bad Request
        // alert("Error");
        return false;
      } else {
        //   dispatch(CheckAuthorization(error.response.status));
        alert(error.message);
        return false;
      }
    }
  };
};