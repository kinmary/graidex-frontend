import axios from "axios";
import { AppDispatch, RootState } from "../../../app/store";
import IAnswerOption from "../../../interfaces/AnswerOption";
import { API_BASE_URL } from "../../../constants/config";
import { IQuestion } from "../../../interfaces/Questions";
import { CHANGE_STUD_ANSWERS, CHANGE_STUD_QUESTIONS, INPUT_STUD_CHANGE, RESET_STUD_STATE, SET_TEST_RESULT_ID } from "./TakeTestReducer";
import { GetMultipleChoiceAnswerForStudentDto, GetOpenAnswerForStudentDto, GetSingleChoiceAnswerForStudentDto, TestAttemptMultipleChoiceQuestionForStudentDto, TestAttemptOpenQuestionForStudentDto, TestAttemptSingleChoiceQuestionForStudentDto } from "../../../constants/StudentTestBackendTypes";


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
            let questions: IQuestion[] = mapToFrontendQuestionsStudent(response.data.answers).filter(x => x!==undefined) as IQuestion[];
            dispatch({ type: CHANGE_STUD_QUESTIONS, questions: questions });
            dispatch({ type: SET_TEST_RESULT_ID, testResultId: testResultid });
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
        if (response.data.length !== 0) {
          let questions: IQuestion[] = mapToFrontendQuestionsStudent(response.data.answers).filter(x => x!==undefined) as IQuestion[];
          dispatch({ type: CHANGE_STUD_QUESTIONS, questions: questions });
        } 
        dispatch({ type: SET_TEST_RESULT_ID, testResultId: response.data.id });
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
            $type: GetSingleChoiceAnswerForStudentDto,
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
            $type: GetMultipleChoiceAnswerForStudentDto,
            choiceOptionIndexes: selectedIndexes
          };
          break;
        case 2:
          answerDto = {
            $type: GetOpenAnswerForStudentDto,
            text: question.answerOptions[0].text
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
            $type: GetSingleChoiceAnswerForStudentDto,
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
            $type: GetMultipleChoiceAnswerForStudentDto,
            choiceOptionIndexes: selectedIndexes
          };
          break;
        case 2:
          answerDto = {
            $type: GetOpenAnswerForStudentDto,
            text: question.answerOptions[0].text
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

const mapToFrontendQuestionsStudent = (questions: any[]): (IQuestion | undefined)[] => {
  return questions.map((element: any, idx: number) => {
    switch (element.question.$type) {
      case TestAttemptSingleChoiceQuestionForStudentDto:
        let options: IAnswerOption[] = element.question.options.map(
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
          title: element.question.text,
          comment: element.question.defaultComment,
          maxPoints: element.question.maxPoints,
          type: getQuestionTypeStudent(element.question.$type),
          selected: false,
          answerOptions: options,
        };
        return single;
      case TestAttemptMultipleChoiceQuestionForStudentDto:
        let answerOptions: IAnswerOption[] = element.question.options.map(
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
          title: element.question.text,
          comment: element.question.defaultComment,
          maxPoints: element.question.pointsPerCorrectAnswer,
          type: getQuestionTypeStudent(element.question.$type),
          selected: false,
          answerOptions: answerOptions,
        };
        return multiple;
      case TestAttemptOpenQuestionForStudentDto:
        let open: IQuestion = {
          id: idx,
          title: element.question.text,
          comment: element.question.defaultComment,
          maxPoints: element.question.maxPoints,
          type: getQuestionTypeStudent(element.question.$type),
          selected: false,
          answerOptions: [{id: 0, text: ""}],
        };
        return open;
        default:
          return undefined;
    }
  });
}

const getQuestionTypeStudent = (backendType: string): number => {
  switch (backendType) {
      case TestAttemptSingleChoiceQuestionForStudentDto:
          return 0; 
      case TestAttemptMultipleChoiceQuestionForStudentDto:
          return 1; 
      case TestAttemptOpenQuestionForStudentDto:
          return 2; 
      default:
          return -1; 
  }
} 