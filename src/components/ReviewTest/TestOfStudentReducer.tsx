import { GetResultAnswerForTeacherDto } from "../../interfaces/GetResultAnswerForTeacherDto";
import { IQuestion } from "../../interfaces/Questions";
import { ITestResultForTeacher } from "../../interfaces/TestResultForTeacherDto";

interface TestOfStudentState {
  testResult: ITestResultForTeacher;
}
const initialState: TestOfStudentState = {
  testResult: {
    resultAnswers: [{
      question: {
        id: 0,
        title: "Question 1: What skills does a front-end developer need??",
        comment: "",
        points: 3,
        maxPoints: 1,
        type: 1,
        selected: true,
        answerOptions: [
          { id: 0, text: "HTML", isCorrect: false, selected: false },
          { id: 1, text: "CSS", isCorrect: false, selected: false },
          { id: 2, text: "SQL", isCorrect: false, selected: false },
          { id: 3, text: "JavaScript", isCorrect: false, selected: false },
        ],
      },
      answer: {
        choiceOptionIndexes: [0,1,2],
        points: 0,
        feedback: "",
        questionIndex: 0,
      },
    },
    {
      question: {
        id: 1,
        title: "Question 2: What is React?",
        comment: "",
        points: 0,
        maxPoints: 3,
        type: 2,
        selected: false,
        answerOptions: [{ id: 0, text: "" }],
      },
      answer: {
        text: "React is a JavaScript library for building user interfaces.",
        points: 0,
        feedback: "",
        questionIndex: 0,
      },
    },
    {
      question: {
        id: 2,
        title: "Question 3: What is React?",
        comment: "",
        points: 0,
        maxPoints: 1,
        type: 0,
        selected: false,
        answerOptions: [
          { id: 0, text: "JavaScript framework", isCorrect: false, selected: false },
          { id: 1, text: "Database management system", isCorrect: false, selected: false },
          { id: 2, text: "Backend framework", isCorrect: false, selected: false },
        ],
      },
      answer: {
        choiceOptionIndex: 0,
        points: 0,
        feedback: "",
        questionIndex: 0,
      },
    },
    {
      question: {
        id: 3,
        title: "Question 4: How to align text to the left in CSS?",
        comment: "",
        points: 0,
        maxPoints: 1,
        type: 0,
        selected: false,
        answerOptions: [
          { id: 0, text: "text-align: left", isCorrect: false, selected: false },
          { id: 1, text: "align: left", isCorrect: false, selected: false },
          { id: 2, text: "align-items: left", isCorrect: false, selected: false },
        ],
      },
      answer: {
        choiceOptionIndex: 0,
        points: 0,
        feedback: "",
        questionIndex: 0,
      },
    },
    {
      question: {
        id: 4,
        title: "Question 5: Explain usage of useEffect() hook in React?",
        comment: "",
        points: 0,
        maxPoints: 1,
        type: 2,
        selected: false,
        answerOptions: [
          { id: 0, text: "", },
        ],
      },
      answer: {
        text: "The Effect Hook lets you perform side effects in function components: useEffect(()=>{...}, [dependencies])",
        points: 0,
        feedback: "",
        questionIndex: 0,
      },
    },
    ],
    isAutoChecked: false,
    canReview: false,
    startTime: new Date(),
    endTime: new Date(),
    testId: 43,
    studentEmail: "m.kind@vdu.lt",
    totalPoints: 0,
    grade: 0,
  },
};

export interface Action {
  type:
    | typeof CHANGE_REVIEW_QUESTION_ATTR
    | typeof CHANGE_REVIEW_QUESTIONS
    | typeof RESET_REVIEW_STATE;
  studentName?: string;
  id?: number;
  name?: string;
  value?: any;
  questions?: GetResultAnswerForTeacherDto[];
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
          ...state.testResult,
          resultAnswers: state.testResult.resultAnswers.map(
            (resultAnswer: GetResultAnswerForTeacherDto) => {
              if (resultAnswer.question.id === action.id) {
                return {
                  ...resultAnswer,
                  answer: {
                    ...resultAnswer.answer,
                    [action.name!]: action.value,
                  },
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
        testResult: {...state.testResult, resultAnswers: action.questions!},
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
