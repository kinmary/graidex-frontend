import { SET_AUTHENTICATION } from "./Login/AuthReducer";
import { CHANGE_USER_ROLE, SET_LOGOUT, SET_MESSAGE_OPEN, SET_OPEN } from "./MainReducer";

export const SetOpen = (name, value) => {
    return (dispatch) => {
      dispatch({ type: SET_OPEN, name, value });
    };
  }

  export const SetMessageOpen = (mode, message) => {
    return (dispatch) => {
      dispatch({ type: SET_MESSAGE_OPEN, mode: mode, message: message });
    };
  }

export const Logout = () => {
  return (dispatch) => {
    dispatch({type: SET_LOGOUT});
    dispatch({type: SET_AUTHENTICATION, isAuth: false})
  }
}
export const ChangeUserRole = (userRole) => {
  return (dispatch) => {
    dispatch({type: CHANGE_USER_ROLE, userRole: userRole});
  }
}