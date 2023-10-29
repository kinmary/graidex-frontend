interface AuthState {
  isAuth: boolean | undefined;
  userRole: number | undefined;
  isNewUser: boolean | undefined;
  email: string | undefined;
  name: string | undefined;
  surname: string | undefined;
  studentId: string | undefined;
  profilePic: string | undefined;
  errors:
    | {
        email?: string | undefined;
        password?: string | undefined;
        repeatPassword?: string | undefined;
      }
    | undefined;
  deleteConfirm: boolean | undefined;
}
export const initialState: AuthState = {
  isAuth: false,
  isNewUser: false,
  profilePic: undefined,
  userRole: 0,
  email: "",
  name: "",
  surname: "",
  studentId: "",
  errors: { email: "", password: "", repeatPassword: "" },
  deleteConfirm: false,
};

export interface Action {
  type:
    | typeof SET_AUTHENTICATION
    | typeof SET_NEW_USER
    | typeof CHANGE_VALUES
    | typeof SET_ERRORS
    | typeof CHANGE_USER_ROLE
    | typeof SET_AUTHENTICATION_TOKEN
    | typeof SET_PROFILE_PIC;
  isAuth?: boolean;
  isNewUser?: boolean;
  userRole?: number;
  email?: string;
  name?: string;
  surname?: string;
  studentId?: string;
  profilePic?: string;
  errors?: {
    email?: string | undefined;
    password?: string | undefined;
    repeatPassword?: string | undefined;
  };
  deleteConfirm?: boolean;
  value?: any;
}

export const AuthReducer = (
  state: AuthState = initialState,
  action: Action
) => {
  switch (action.type) {
    case SET_AUTHENTICATION:
      state = {
        ...state,
        isAuth: action.isAuth,
        email: action.email,
        name: action.name,
        surname: action.surname,
        studentId: action.studentId,
      };
      break;
    case SET_NEW_USER:
      state = {
        ...state,
        isNewUser: action.isNewUser,
      };
      break;
      case SET_PROFILE_PIC:
        state = {
          ...state,
          profilePic: action.profilePic,
        };
        break;
    case CHANGE_VALUES:
      state = {
        ...state,
        [action.name!]: action.value,
      };
      break;
    case SET_ERRORS:
      state = {
        ...state,
        errors: { ...state.errors, [action.name!]: action.value },
      };
      break;
    case CHANGE_USER_ROLE:
      state = {
        ...state,
        userRole: action.userRole,
      };
      break;
    case SET_AUTHENTICATION_TOKEN:
      state = {
        ...state,
        isAuth: action.isAuth,}
        break;

    default:
      break;
  }
  return state;
};

export const SET_AUTHENTICATION = "SET_AUTHENTICATION";
export const SET_NEW_USER = "SET_NEW_USER";
export const CHANGE_VALUES = "CHANGE_VALUES";
export const SET_ERRORS = "SET_ERRORS";
export const SET_AUTHENTICATION_TOKEN = "SET_AUTHENTICATION_TOKEN";
export const SET_PROFILE_PIC = "SET_PROFILE_PIC";
//TODO: add messages
export const CHANGE_USER_ROLE = "CHANGE_USER_ROLE";
export const LOGIN_TEACHER_FAIL = "LOGIN_TEACHER_FAIL";
export const REGISTER_STUDENT_FAIL = "REGISTER_STUDENT_FAIL";
export const LOGIN_STUDENT_FAIL = "LOGIN_STUDENT_FAIL";
