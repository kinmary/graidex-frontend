import { takeTestExample } from "../../../constants/TakeTestExample";

const initialState = {
    questions: takeTestExample
  };
  
  export const TakeTestReducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case CHANGE_QUESTIONS:
            state = {
              ...state,
              questions: action.questions,
            };
            break;
      case INPUT_CHANGE:
        state = {
          ...state,
          questions: state.questions.map((obj) => {
            if (obj.id === action.id) {
              return { ...obj, answerOptions: [{id: 0, text: action.text }]};
            }
            return obj;
          }),
        };
        break;
      case CHANGE_ANSWERS:
        state = {
          ...state,
          questions: state.questions.map((obj) => {
            if (obj.id === action.id) {
              return { ...obj, answerOptions: action.answerOptions };
            }
            return obj;
          }),
        };
        break;
      case RESET_STATE:
        state = initialState;
        break;
      default:
        break;
    }
    return state;
  };
  

  export const RESET_STATE = "RESET_STATE";
  export const INPUT_CHANGE = "INPUT_CHANGE";
  export const CHANGE_QUESTIONS = "CHANGE_QUESTIONS";
  export const CHANGE_ANSWERS = "CHANGE_ANSWERS";
  