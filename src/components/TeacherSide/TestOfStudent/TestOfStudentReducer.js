const initialState = {
  //TODO: get request from backend
  studentAnswers: [
    {
      Id: 0,
      studentName: "Mariia Kindratyshyn",
      mark: 9.55,
      questions: [
        {
          id: 0,
          title: "Question 1: What is right?",
          comment: "Right answer is at the moon",
          points: 0,
          maxPoints: 1,
          type: 0,
          selected: true,
          answerOptions: [
            { id: 0, text: "left", isRight: false, selected: false },
            { id: 1, text: "right", isRight: false, selected: true },
            {
              id: 2,
              text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",

              isRight: true,
              selected: false,
            },
          ],
        },
        {
          id: 1,
          title: "Question 2: How are you today?",
          comment: "",
          points: 0,
          maxPoints: 3,
          type: 2,
          selected: false,
          answerOptions: [{ id: 0, text: "Great!" }],
        },
        {
          id: 2,
          title: "Question 3: Lorem ipsum dolor?",
          comment: "",
          points: 3,
          maxPoints: 3,
          type: 1,
          selected: false,
          answerOptions: [
            { id: 0, text: "lorem", isRight: true, selected: true },
            { id: 1, text: "ipsum", isRight: true, selected: true },
            { id: 2, text: "dolor", isRight: false, selected: false },
          ],
        },
        {
          id: 3,
          title: "Question 4: Lorem ipsum dolor?",
          comment: "Provide explanation on lorem ipsum",
          points: 0,
          maxPoints: 3,
          type: 2,
          selected: false,
          answerOptions: [
            {
              id: 0,
              text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",
            },
          ],
        },
        {
          id: 4,
          title: "Question 5: What is right?",
          comment: "Right answer is at the moon",
          points: 1,
          maxPoints: 1,
          type: 0,
          selected: false,
          answerOptions: [
            { id: 0, text: "left", isRight: false, selected: false },
            { id: 1, text: "right", isRight: true, selected: true },
            { id: 2, text: "wrong", isRight: false, selected: false },
          ],
        },
        {
          id: 5,
          title: "Question 6: What is right?",
          comment: "Right answer is at the moon",
          points: 0,
          maxPoints: 1,
          type: 0,
          selected: false,
          answerOptions: [
            { id: 0, text: "left", isRight: false, selected: false },
            { id: 1, text: "right", isRight: false, selected: true },
            { id: 2, text: "wrong", isRight: true, selected: false },
          ],
        },
        {
          id: 6,
          title: "Question 7: What is right?",
          comment: "Right answer is at the moon",
          points: 0,
          maxPoints: 1,
          type: 0,
          selected: false,
          answerOptions: [
            { id: 0, text: "left", isRight: false, selected: false },
            { id: 1, text: "right", isRight: false, selected: true },
            { id: 2, text: "wrong", isRight: true, selected: false },
          ],
        },
      ],
    },
    {
      Id: 1,
      studentName: "Barys Shauchuk",
      mark: 9.87,
      questions: [
        {
          id: 0,
          title: "Question 1: What is right?",
          comment: "Right answer is at the moon",
          points: 0,
          maxPoints: 1,
          type: 0,
          selected: true,
          answerOptions: [
            { id: 0, text: "left", isRight: false, selected: false },
            { id: 1, text: "right", isRight: false, selected: true },
            {
              id: 2,
              text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",

              isRight: true,
              selected: false,
            },
          ],
        },
        {
          id: 1,
          title: "Question 2: How are you today?",
          comment: "",
          points: 0,
          maxPoints: 3,
          type: 2,
          selected: false,
          answerOptions: [{ id: 0, text: "Great!" }],
        },
        {
          id: 2,
          title: "Question 3: Lorem ipsum dolor?",
          comment: "",
          points: 3,
          maxPoints: 3,
          type: 1,
          selected: false,
          answerOptions: [
            { id: 0, text: "lorem", isRight: true, selected: true },
            { id: 1, text: "ipsum", isRight: true, selected: true },
            { id: 2, text: "dolor", isRight: false, selected: false },
          ],
        },
        {
          id: 3,
          title: "Question 4: Lorem ipsum dolor?",
          comment: "Provide explanation on lorem ipsum",
          points: 0,
          maxPoints: 3,
          type: 2,
          selected: false,
          answerOptions: [
            {
              id: 0,
              text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",
            },
          ],
        },
        {
          id: 4,
          title: "Question 5: What is right?",
          comment: "Right answer is at the moon",
          points: 1,
          maxPoints: 1,
          type: 0,
          selected: false,
          answerOptions: [
            { id: 0, text: "left", isRight: false, selected: false },
            { id: 1, text: "right", isRight: true, selected: true },
            { id: 2, text: "wrong", isRight: false, selected: false },
          ],
        },
        {
          id: 5,
          title: "Question 6: What is right?",
          comment: "Right answer is at the moon",
          points: 0,
          maxPoints: 1,
          type: 0,
          selected: false,
          answerOptions: [
            { id: 0, text: "left", isRight: false, selected: false },
            { id: 1, text: "right", isRight: false, selected: true },
            { id: 2, text: "wrong", isRight: true, selected: false },
          ],
        },
        {
          id: 6,
          title: "Question 7: What is right?",
          comment: "Right answer is at the moon",
          points: 0,
          maxPoints: 1,
          type: 0,
          selected: false,
          answerOptions: [
            { id: 0, text: "left", isRight: false, selected: false },
            { id: 1, text: "right", isRight: false, selected: true },
            { id: 2, text: "wrong", isRight: true, selected: false },
          ],
        },
      ],
    },
    {
      Id: 2,
      studentName: "Ilaryon Saladkou",
      mark: 10,
      questions: [
        {
          id: 0,
          title: "Question 1: What is right?",
          comment: "Right answer is at the moon",
          points: 0,
          maxPoints: 1,
          type: 0,
          selected: true,
          answerOptions: [
            { id: 0, text: "left", isRight: false, selected: false },
            { id: 1, text: "right", isRight: false, selected: true },
            {
              id: 2,
              text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",

              isRight: true,
              selected: false,
            },
          ],
        },
        {
          id: 1,
          title: "Question 2: How are you today?",
          comment: "",
          points: 0,
          maxPoints: 3,
          type: 2,
          selected: false,
          answerOptions: [{ id: 0, text: "Great!" }],
        },
        {
          id: 2,
          title: "Question 3: Lorem ipsum dolor?",
          comment: "",
          points: 3,
          maxPoints: 3,
          type: 1,
          selected: false,
          answerOptions: [
            { id: 0, text: "lorem", isRight: true, selected: true },
            { id: 1, text: "ipsum", isRight: true, selected: true },
            { id: 2, text: "dolor", isRight: false, selected: false },
          ],
        },
        {
          id: 3,
          title: "Question 4: Lorem ipsum dolor?",
          comment: "Provide explanation on lorem ipsum",
          points: 0,
          maxPoints: 3,
          type: 2,
          selected: false,
          answerOptions: [
            {
              id: 0,
              text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",
            },
          ],
        },
        {
          id: 4,
          title: "Question 5: What is right?",
          comment: "Right answer is at the moon",
          points: 1,
          maxPoints: 1,
          type: 0,
          selected: false,
          answerOptions: [
            { id: 0, text: "left", isRight: false, selected: false },
            { id: 1, text: "right", isRight: true, selected: true },
            { id: 2, text: "wrong", isRight: false, selected: false },
          ],
        },
        {
          id: 5,
          title: "Question 6: What is right?",
          comment: "Right answer is at the moon",
          points: 0,
          maxPoints: 1,
          type: 0,
          selected: false,
          answerOptions: [
            { id: 0, text: "left", isRight: false, selected: false },
            { id: 1, text: "right", isRight: false, selected: true },
            { id: 2, text: "wrong", isRight: true, selected: false },
          ],
        },
        {
          id: 6,
          title: "Question 7: What is right?",
          comment: "Right answer is at the moon",
          points: 0,
          maxPoints: 1,
          type: 0,
          selected: false,
          answerOptions: [
            { id: 0, text: "left", isRight: false, selected: false },
            { id: 1, text: "right", isRight: false, selected: true },
            { id: 2, text: "wrong", isRight: true, selected: false },
          ],
        },
      ],
    },
  ],
};

export const TestOfStudentReducer = (state, action) => {
  state = state || initialState;
  switch (action.type) {
    case CHANGE_QUESTION_ATTR:
      state = {
        ...state,
        studentAnswers: state.studentAnswers.map((s) => {
          if (s.studentName === action.studentName) {
            return {
              ...s,
              questions: s.questions.map((question) => {
                if (question.id === action.id) {
                  return { ...question, [action.name]: action.value };
                }
                return question;
              }),
            };
          }
          return s;
        }),
      };
      break;

    
    case CHANGE_QUESTIONS:
      state = {
        studentAnswers: state.studentAnswers.map((s) => {
            if (s.studentName === action.studentName) {
              return {
                ...s,
                questions: action.questions}
            }  return s
        }
        )
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

export const CHANGE_QUESTION_ATTR = "CHANGE_QUESTION_ATTR";
export const CHANGE_QUESTIONS = "CHANGE_QUESTIONS";
export const RESET_STATE = "RESET_STATE";

