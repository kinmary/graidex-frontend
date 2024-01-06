import { IQuestion } from "../interfaces/Questions";

export const takeTestExample: IQuestion[] =[
    {
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
    {
      id: 1,
      title: "Question 2: What is React?",
      comment: "",
      points: 0,
      maxPoints: 3,
      type: 2,
      selected: false,
      answerOptions: [{ id: 0, text: "" }],
    },
    {
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
    {
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
    
    {
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
  ]