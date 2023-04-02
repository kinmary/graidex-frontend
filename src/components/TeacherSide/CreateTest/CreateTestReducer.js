const initialState = {
  testTitle: "",
  questions: [
    {
      id: 0,
      title: "Question 1",
      comment: "",
      maxPoints: 1,
      shuffleOptions: true,
      aiCheck: true,
      plagiarismCheck: true,
      allowFiles: false,
      type: 0,
      selected: true,
      files: [],
      previews: [],
      answerOptions: [{ id: 0, text: "", isRight: false }],
    },
  ],
};

export const CreateTestReducer = (state, action) => {
  state = state || initialState;
  switch (action.type) {
    case CHANGE_TEST_TITLE:
      state = {
        ...state,
        testTitle: action.testTitle,
      };
      break;
    case CHANGE_QUESTIONS:
      state = {
        ...state,
        questions: action.questions,
      };
      break;
    case ADD_QUESTION:
      state = {
        ...state,
        questions: [...state.questions, action.question],
      };
      break;
    case INPUT_CHANGE:
      state = {
        ...state,
        questions: state.questions.map((obj) => {
          if (obj.id === action.id) {
            return { ...obj, [action.name]: action.value };
          }
          return obj;
        }),
      };
      break;
    case ADD_ANSWER:
      state = {
        ...state,
        questions: state.questions.map((obj) => {
          if (obj.id === action.id) {
            return {
              ...obj,
              answerOptions: [...obj.answerOptions, action.answer],
            };
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
    case ADD_FILES:
      state =  {
        ...state,
        questions: state.questions.map((obj) => {
          if (obj.id === action.id) {
            return {
              ...obj,
              files: [...obj.files, ...action.files],
              previews: [...obj.previews, ...action.previews]
            };
          }
          return obj;
        }),
      };
      break;
    case REMOVE_FILE:
      state =  {
        ...state,
        questions: state.questions.map((obj) => {
          if (obj.id === action.id) {
            const newFiles = [...obj.files];
            newFiles.splice(action.index, 1);
            const newPreviews = [...obj.previews];
            newPreviews.splice(action.index, 1);
            return {
              ...obj,
              files: newFiles,
              previews: newPreviews,
            };
          }
          return obj;
        }),
      };
      break;
    default:
      break;
  }
  return state;
};

export const CHANGE_QUESTIONS = "CHANGE_QUESTIONS";
export const CHANGE_TEST_TITLE = "CHANGE_TEST_TITLE";
export const ADD_QUESTION = "ADD_QUESTION";
export const RESET_STATE = "RESET_STATE";
export const INPUT_CHANGE = "INPUT_CHANGE";
export const ADD_ANSWER = "ADD_ANSWER";
export const CHANGE_ANSWERS = "CHANGE_ANSWERS";
export const ADD_FILES = "ADD_FILES";
export const REMOVE_FILE = "REMOVE_FILES";
