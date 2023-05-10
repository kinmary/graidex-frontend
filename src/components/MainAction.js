import { Logout } from "./Login/AuthAction";
import { SET_AUTHENTICATION } from "./Login/AuthReducer";
import {
  CHANGE_USER_ROLE,
  SET_LOGOUT,
  SET_MESSAGE_OPEN,
  SET_OPEN,
} from "./MainReducer";

export const SetOpen = (name, value) => {
  return (dispatch) => {
    dispatch({ type: SET_OPEN, name, value });
  };
};

export const SetMessageOpen = (mode, message) => {
  return (dispatch) => {
    dispatch({ type: SET_MESSAGE_OPEN, mode: mode, message: message });
  };
};

export const ChangeUserRole = (userRole) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_USER_ROLE, userRole: userRole });
  };
};

export const CheckAuthorization = (status) => {
  return (dispatch) => {
    if (status === 401) {
      dispatch(Logout());
    }
  };
};
