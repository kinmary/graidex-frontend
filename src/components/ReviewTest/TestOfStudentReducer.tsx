import { IQuestion } from "../../interfaces/Questions";
import { ITestResultForTeacher } from "../../interfaces/TestResultForTeacherDto";

interface TestOfStudentState {
  testResult: ITestResultForTeacher | undefined;
}
const initialState: TestOfStudentState = {
  testResult: undefined,
};

export interface Action {
  type:
    | typeof CHANGE_REVIEW_QUESTION_ATTR
    | typeof CHANGE_REVIEW_QUESTIONS
    | typeof RESET_REVIEW_STATE
    | typeof SET_TEST_RESULT;
  testResult?: ITestResultForTeacher;
  studentName?: string;
  id?: number;
  name?: string;
  value?: any;
  questions?: IQuestion[];
}

export const TestOfStudentReducer = (
  state: TestOfStudentState = initialState,
  action: Action
) => {
  state = state || initialState;
  switch (action.type) {
    case CHANGE_REVIEW_QUESTION_ATTR:
      state = {
        ...state,
        testResult: {
          ...state.testResult!,
          resultAnswers: state.testResult?.resultAnswers?.map(
            (resultAnswer: IQuestion) => {
              if (resultAnswer.id === action.id) {
                return {
                  ...resultAnswer,
                  [action.name!]: action.value,
                };
              }
              return resultAnswer;
            }
          ),
        },
      };
      break;

    case CHANGE_REVIEW_QUESTIONS:
      state = {
        ...state,
        testResult: { ...state.testResult!, resultAnswers: action.questions! },
      };
      break;
    case SET_TEST_RESULT:
      state = {
        ...state,
        testResult: action.testResult,
      };
      break;
    case RESET_REVIEW_STATE:
      state = initialState;
      break;

    default:
      break;
  }
  return state;
};

export const CHANGE_REVIEW_QUESTION_ATTR = "CHANGE_REVIEW_QUESTION_ATTR";
export const CHANGE_REVIEW_QUESTIONS = "CHANGE_REVIEW_QUESTIONS";
export const RESET_REVIEW_STATE = "RESET_REVIEW_STATE";
export const SET_TEST_RESULT = "SET_TEST_RESULT";
