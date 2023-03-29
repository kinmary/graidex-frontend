import { SET_MESSAGE_OPEN, SET_OPEN } from "./MainReducer";

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

