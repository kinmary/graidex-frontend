const initialState = {
  editPage: false,
  createTestPage: false,
  testOfStudentPage: false,
  openSubjectModal: false,
  selectedSubjectId: "",
  openTestModal: false,
  messageModal: false,
  deleteConfirmModal: false,
  editTestPage: false,
  message: "",
  studentName: "",
  tests: [
    {
      id: 0,
      status: 0,
      examName: "Planned Exam",
      lastTimeEdit: "2021-02-02",
      date: "2023-04-05",
      avgScore: 0,
      Answered: "0/10",
    },
    {
      id: 1,
      status: 2,
      examName: "Closed Exam",
      lastTimeEdit: "2021-02-02",
      date: "2023-04-05",
      avgScore: 9.55,
      Answered: "3/3",
    },
    {
      id: 2,
      status: 1,
      examName: "In Progress Exam",
      lastTimeEdit: "2021-02-02",
      date: "2023-04-05",
      avgScore: 0,
      Answered: "3/10",
    },
  ],
  selectedTest: null,
  userRole:0,
};

export const MainReducer = (state, action) => {
  state = state || initialState;
  switch (action.type) {
    case SET_OPEN:
      state = {
        ...state,
        [action.name]: action.value,
      };
      break;
    case SET_MESSAGE_OPEN:
      state = {
        ...state,
        messageModal: action.mode,
        message: action.message,
      };
      break;
    case SET_LOGOUT:
      state = {
        ...initialState,
      };
      break;
      case CHANGE_USER_ROLE:
        state= {
          ...state,
          userRole: action.userRole
        }
        break;
    default:
      break;
  }
  return state;
};

export const SET_OPEN = "SET_OPEN";
export const SET_MESSAGE_OPEN = "SET_MESSAGE_OPEN";
export const SET_LOGOUT = "SET_LOGOUT";
export const CHANGE_USER_ROLE = "CHANGE_USER_ROLE";
