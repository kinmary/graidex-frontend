import axios from "axios";
import { AppDispatch, RootState } from "../../app/store";
import {
  CHANGE_REVIEW_QUESTIONS,
  CHANGE_REVIEW_QUESTION_ATTR,
  RESET_REVIEW_STATE,
  SET_TEST_RESULT,
} from "./TestOfStudentReducer";
import { API_BASE_URL } from "../../constants/config";
import { IQuestion } from "../../interfaces/Questions";
import { TestBaseMultipleChoiceQuestionDto, TestBaseOpenQuestionDto, TestBaseSingleChoiceQuestionDto } from "../../constants/TestBackendTypes";
import IAnswerOption from "../../interfaces/AnswerOption";
import { ITestResultForTeacher } from "../../interfaces/TestResultForTeacherDto";

export const ChangeQuestionAttr = (id: number, name: string, value: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: CHANGE_REVIEW_QUESTION_ATTR, id, name, value });
  };
};

export const SetSelectedQ = (id: number) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    let testResult = getState().testOfStudent.testResult;
    let updated = testResult.resultAnswers.map((resultAnswer: any) =>
      resultAnswer.id.toString() === id.toString()
        ? {
            ...resultAnswer, selected: true 
          }
        : {
            ...resultAnswer, selected: false 
          }
    );
    dispatch({ type: CHANGE_REVIEW_QUESTIONS, questions: updated });
  };
};

export const ResetTestOfStudentState = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: RESET_REVIEW_STATE });
  };
};

export const LeaveFeedbackOnAnswer = (testResultId: string, questionId: string,points: number, feedback?: string ) => {
  return async (dispatch: AppDispatch) => {
    try {
      let feedbackDto = {
        feedback: feedback || "",
        points: points || 0
      }
      const response = await axios.put(
        `${API_BASE_URL}/api/TestResult/leave-feedback-on-answer/${testResultId}?index=${questionId}`,
          feedbackDto
      );
      if (response.status === 200) {
        return true;
      }
    } catch (error: any) {
      // alert(error.message);
      return false;
    }
  };

}

export const GetTestResultForTeacher = (testResultid: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/TestResult/get-test-result/` +
          testResultid
      );
      dispatch({ type: RESET_REVIEW_STATE });
      if (response.data.length !== 0) {
        let questions: IQuestion[] = mapToFrontendQuestions(response.data.resultAnswers).filter(x => x!==undefined) as IQuestion[];
        let testResult : ITestResultForTeacher = {
          resultAnswers: questions,
          isAutoChecked: response.data.isAutoChecked,
          canReview: response.data.canReview,
          startTime: response.data.startTime, //FIX TIME
          endTime: response.data.endTime, //FIX TIME
          testId: response.data.testId,
          studentEmail: response.data.studentEmail,
          totalPoints: response.data.totalPoints,
          grade: response.data.grade
        }
        dispatch({ type: SET_TEST_RESULT, testResult: testResult });
        return true;
      }
    } catch (error: any) {
      // alert(error.message);
      return false;
    }
  };
};



const mapToFrontendQuestions = (questions: any[]): (IQuestion | undefined)[] => {
  return questions.map((element: any, idx: number) => {
    switch (element.question.$type) {
      case TestBaseSingleChoiceQuestionDto:
        let options: IAnswerOption[] = element.question.options.map(
          (x: any, idx: number) => {
            return {
              id: idx,
              text: x.text,
              isCorrect: element.question.correctOptionIndex === idx,
              selected: element.answer.choiceOptionIndex === idx || false,
            };
          }
        );
        let single: IQuestion = {
          id: idx,
          title: element.question.text,
          maxPoints: element.question.maxPoints,
          type: getQuestionType(element.question.$type),
          selected: false,
          answerOptions: options,
          points: element.answer.points,
          feedback : element.answer.feedback  === null ? (element.question.defaultFeedback === null ? "" : element.question.defaultFeedback) : element.answer.feedback
        };
        return single;
      case TestBaseMultipleChoiceQuestionDto:
        let answerOptions: IAnswerOption[] = element.question.options.map(
          (x: any, idx: number) => {
            return {
              id: idx,
              text: x.option.text,
              isCorrect: x.isCorrect,
              selected: element.answer.choiceOptionIndexes?.includes(idx) || false,
            };
          }
        );
        let multiple: IQuestion = {
          id: idx,
          title: element.question.text,
          maxPoints: element.question.pointsPerCorrectAnswer,
          type: getQuestionType(element.question.$type),
          selected: false,
          answerOptions: answerOptions,
          points: element.answer.points,
          feedback : element.answer.feedback  === null ? (element.question.defaultFeedback === null ? "" : element.question.defaultFeedback) : element.answer.feedback
        };
        return multiple;
      case TestBaseOpenQuestionDto:
        let open: IQuestion = {
          id: idx,
          title: element.question.text,
          maxPoints: element.question.maxPoints,
          type: getQuestionType(element.question.$type),
          selected: false,
          answerOptions: [{id: 0, text: element.answer.text || ""}],
          points: element.answer.points,
          feedback : element.answer.feedback  === null ? (element.question.defaultFeedback === null ? "" : element.question.defaultFeedback) : element.answer.feedback
        };
        return open;
        default:
          return undefined;
    }
  });
}

const getQuestionType = (backendType: string): number => {
  switch (backendType) {
      case TestBaseSingleChoiceQuestionDto:
          return 0; 
      case TestBaseMultipleChoiceQuestionDto:
          return 1; 
      case TestBaseOpenQuestionDto:
          return 2; 
      default:
          return -1; 
  }
} 