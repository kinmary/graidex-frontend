import axios from "axios";
import { SET_NEW_USER } from "./AuthReducer";

export const SetNewUser = (isNewUser) => {
  return (dispatch) => {
    dispatch({ type: SET_NEW_USER, isNewUser });
  };
};
