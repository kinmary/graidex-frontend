import { takeTestExample } from "../../../constants/TakeTestExample";
import IAnswerOption from "../../../interfaces/AnswerOption";
import { IQuestion } from "../../../interfaces/Questions";
interface TakeTestState {
  questions?: IQuestion[] | undefined;
  testResultId?: string | number | undefined;

}
export const initialState: TakeTestState = {
  questions: takeTestExample,
  testResultId: 0,
};

export interface Action {
  type:
    | typeof RESET_STUD_STATE
    | typeof INPUT_STUD_CHANGE
    | typeof CHANGE_STUD_QUESTIONS
    | typeof CHANGE_STUD_ANSWERS
    | typeof SET_TEST_RESULT_ID;
  questions?: IQuestion[];
  id?: number;
  text?: string;
  answerOptions?: IAnswerOption[];
  testResultId?: string | number; 
}

  
  export const TakeTestReducer = (state: TakeTestState = initialState,
    action: Action) => {
    state = state || initialState;
    switch (action.type) {
        case CHANGE_STUD_QUESTIONS:
            state = {
              ...state,
              questions: action.questions,
            };
            break;
      case INPUT_STUD_CHANGE:
        state = {
          ...state,
          questions: state.questions!.map((obj) => {
            if (obj.id === action.id) {
              return { ...obj, answerOptions: [{id: 0, text: action.text! }]};
            }
            return obj;
          }),
        };
        break;
      case CHANGE_STUD_ANSWERS:
        state = {
          ...state,
          questions: state.questions!.map((obj) => {
            if (obj.id === action.id) {
              return { ...obj, answerOptions: action.answerOptions! };
            }
            return obj;
          }),
        };
        break;
      case RESET_STUD_STATE:
        state = initialState;
        break;
      case SET_TEST_RESULT_ID:
        state = {
          ...state,
          testResultId: action.testResultId,
        };
        break;
      default:
        break;
    }
    return state;
  };
  

  export const RESET_STUD_STATE = "RESET_STUD_STATE";
  export const INPUT_STUD_CHANGE = "INPUT_STUD_CHANGE";
  export const CHANGE_STUD_QUESTIONS = "CHANGE_STUD_QUESTIONS";
  export const CHANGE_STUD_ANSWERS = "CHANGE_STUD_ANSWERS";
  export const SET_TEST_RESULT_ID = "SET_TEST_RESULT_ID";
  