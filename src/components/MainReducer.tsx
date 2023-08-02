import { IOutgoingSubjectRequest } from "../interfaces/OutgoingSubjectRequests";
import { ISubject } from "../interfaces/Subject";
import { IIncomingSubjectRequest } from "../interfaces/SubjectRequests";
import ITestGrid from "../interfaces/TestGrid";

interface MainState {
  editPage: boolean;
  createTestPage: boolean;
  testOfStudentPage: boolean;
  openSubjectModal: boolean;
  selectedSubjectId: string;
  allSubjects: ISubject[];
  subjectRequests: IIncomingSubjectRequest[] | undefined; 
  pendingSubjRequests: IOutgoingSubjectRequest[] | undefined;
  studentsList: any[];
  openTestModal: boolean;
  messageModal: boolean;
  deleteConfirmModal: boolean;
  editTestPage: boolean;
  startConfirmModal: boolean;
  sendTestModal: boolean;
  changePassModal: boolean;
  changeImgModal: boolean;
  deleteSubjectModal: boolean;
  manageStudentsModal: boolean;
  addQuestionModal: boolean;
  message: string;
  studentName: string;
  addStudentModal: boolean;
  tests: ITestGrid[];
  selectedTest: ITestGrid | undefined;
}

const initialState: MainState = {
  editPage: false,
  createTestPage: false,
  testOfStudentPage: false,
  openSubjectModal: false,
  selectedSubjectId: "",
  allSubjects: Array<ISubject>(),
  subjectRequests: Array<IIncomingSubjectRequest>(),
  pendingSubjRequests: Array<IOutgoingSubjectRequest>(),
  studentsList: [],
  openTestModal: false,
  messageModal: false,
  deleteConfirmModal: false,
  editTestPage: false,
  startConfirmModal: false,
  sendTestModal: false,
  changePassModal: false,
  changeImgModal: false,
  addQuestionModal: false,
  deleteSubjectModal: false,
  manageStudentsModal: false,
  message: "",
  studentName: "",
  addStudentModal: false,
  selectedTest: undefined,
  tests: [
    {
      status: 0,
      examName: "Planned Exam",
      lastTimeEdit: "2021-02-02",
      date: "2023-04-05",
      avgScore: 0,
      answered: "0/10",
    },
    {
      status: 2,
      examName: "Closed Exam",
      lastTimeEdit: "2021-02-02",
      date: "2023-04-05",
      avgScore: 9.55,
      answered: "3/3",
    },
    {
      status: 1,
      examName: "In Progress Exam",
      lastTimeEdit: "2021-02-02",
      date: "2023-04-05",
      avgScore: 0,
      answered: "3/10",
    },
  ],
};

interface MainAction {
  type:
    | typeof SET_OPEN
    | typeof SET_MESSAGE_OPEN
    | typeof SET_LOGOUT
    | typeof GET_ALL_SUBJECTS
    | typeof GET_SUBJECT_REQUESTS
    | typeof GET_PENDING_SUBJECT_REQUESTS;
  name?: string;
  value?: any;
  mode?: boolean;
  message?: string;
  allSubjects?: ISubject[];
  subjectRequests?: IIncomingSubjectRequest[];
  pendingSubjectRequests?: IOutgoingSubjectRequest[];
}

export const MainReducer = (state: MainState = initialState, action: MainAction) => {
  switch (action.type) {
    case SET_OPEN:
      state = {
        ...state,
        [action.name!]: action.value,
      };
      break;
    case SET_MESSAGE_OPEN:
      state = {
        ...state,
        messageModal: action.mode!,
        message: action.message!,
      };
      break;
    case GET_ALL_SUBJECTS:
      state = {
        ...state,
        allSubjects: action.allSubjects!,
      };
      break;
    case GET_SUBJECT_REQUESTS: 
      state = {
        ...state,
        subjectRequests: action.subjectRequests
      }
      break;
    case GET_PENDING_SUBJECT_REQUESTS: 
      state = {
        ...state,
        pendingSubjRequests: action.pendingSubjectRequests
      }
      break;
    case SET_LOGOUT:
      state = initialState;
      break;
    default:
      break;
  }
  return state;
};

export const SET_OPEN = "SET_OPEN";
export const SET_MESSAGE_OPEN = "SET_MESSAGE_OPEN";
export const SET_LOGOUT = "SET_LOGOUT";
export const GET_ALL_SUBJECTS = "GET_ALL_SUBJECTS";
export const GET_SUBJECT_REQUESTS = "GET_SUBJECT_REQUESTS";
export const GET_PENDING_SUBJECT_REQUESTS = "GET_PENDING_SUBJECT_REQUESTS";
