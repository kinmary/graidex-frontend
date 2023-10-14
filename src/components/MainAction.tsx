import { AppDispatch } from "../app/store";
import { Logout } from "./Auth/AuthAction";
import { CHANGE_USER_ROLE } from "./Auth/AuthReducer";
import { SET_MESSAGE_OPEN, SET_OPEN, SHOW_LOADER } from "./MainReducer";

export const SetOpen = (name: string, value: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: SET_OPEN, name, value });
  };
};

export const SetMessageOpen = (mode: any, message: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: SET_MESSAGE_OPEN, mode: mode, message: message });
  };
};

export const ChangeUserRole = (userRole: number) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: CHANGE_USER_ROLE, userRole: userRole });
  };
};

export const CheckAuthorization = (status: any) => {
  return (dispatch: AppDispatch) => {
    if (status === 401) {
      dispatch(Logout());
    }
  };
};

export const showLoader = () => {
  return (dispatch: AppDispatch) => {
      dispatch({type: SHOW_LOADER, showLoader: true})
  }
}
export const hideLoader = () => {
  return (dispatch: AppDispatch) => {
      dispatch({type: SHOW_LOADER, showLoader: false})
  }
}