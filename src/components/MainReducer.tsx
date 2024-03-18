import { IOutgoingSubjectRequest } from "../interfaces/OutgoingSubjectRequests";
import { ISubject } from "../interfaces/Subject";
import { IIncomingSubjectRequest } from "../interfaces/SubjectRequests";
import ISubjectContent from "../interfaces/SubjectContent";
import { ITestDto } from "../interfaces/TestDto";
import { GetAttemptsDescDto } from "../interfaces/GetAttemptsDescDto";
import { themes } from "../constants/Themes";
import IAnswerGrid from "../interfaces/AnswerGrid";

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
  studentsListWithImages: any[];
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
  addStudentsToTestModal: boolean;
  tests: ISubjectContent[] | undefined;
  selectedTest: ISubjectContent | undefined;
  showLoader?: boolean;
  currentTestDraft?: ITestDto;
  createTestFromDraft?: boolean;
  attemptsInfo?: GetAttemptsDescDto | undefined;
  theme: string;
  answersGrid?: IAnswerGrid[] | undefined;
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
  studentsListWithImages: [],
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
  addStudentsToTestModal: false,
  message: "",
  studentName: "",
  addStudentModal: false,
  selectedTest: undefined,
  tests: Array<ISubjectContent>(),
  showLoader: false,
  currentTestDraft: undefined,
  createTestFromDraft: false,
  attemptsInfo: undefined,
  theme: themes.light,
  answersGrid: Array<IAnswerGrid>(),
};

interface MainAction {
  type:
    | typeof SET_OPEN
    | typeof SET_MESSAGE_OPEN
    | typeof SET_LOGOUT
    | typeof GET_ALL_SUBJECTS
    | typeof GET_SUBJECT_REQUESTS
    | typeof GET_PENDING_SUBJECT_REQUESTS
    | typeof GET_SUBJECT_CONTENT
    | typeof SHOW_LOADER
    | typeof SET_CURRENT_TEST_DRAFT
    | typeof SET_ATTEMPTS_INFO
    | typeof SET_ANSWERS_GRID;
  name?: string;
  value?: any;
  mode?: boolean;
  message?: string;
  allSubjects?: ISubject[];
  subjectRequests?: IIncomingSubjectRequest[];
  tests?: ISubjectContent[];
  pendingSubjectRequests?: IOutgoingSubjectRequest[];
  showLoader?: boolean;
  currentTestDraft?: ITestDto;
  attemptsInfo?: GetAttemptsDescDto;
  theme?: string;
  answersGrid?: IAnswerGrid[];
}

export const MainReducer = (
  state: MainState = initialState,
  action: MainAction
) => {
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
        subjectRequests: action.subjectRequests,
      };
      break;
    case GET_SUBJECT_CONTENT:
      state = {
        ...state,
        tests: action.tests,
      };
      break;
    case GET_PENDING_SUBJECT_REQUESTS:
      state = {
        ...state,
        pendingSubjRequests: action.pendingSubjectRequests,
      };
      break;
    case SET_LOGOUT:
      state = initialState;
      break;
    case SHOW_LOADER:
      return {
        ...state,
        showLoader: action.showLoader,
      };
    case SET_CURRENT_TEST_DRAFT:
      return {
        ...state,
        currentTestDraft: action.currentTestDraft,
      };
      case SET_ATTEMPTS_INFO:
      return {
        ...state,
        attemptsInfo: action.attemptsInfo,
      };
      case SET_ANSWERS_GRID:
      return {
        ...state,
        answersGrid: action.answersGrid,
      };
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
export const GET_SUBJECT_CONTENT = "GET_SUBJECT_CONTENT";
export const SHOW_LOADER = "SHOW_LOADER";
export const SET_CURRENT_TEST_DRAFT = "SET_CURRENT_TEST_DRAFT";
export const SET_ATTEMPTS_INFO = "SET_ATTEMPTS_INFO";
export const SET_ANSWERS_GRID = "SET_ANSWERS_GRID";
