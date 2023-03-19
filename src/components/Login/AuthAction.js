import axios from "axios";
import { CHANGE_VALUES, SET_NEW_USER } from "./AuthReducer";

export const SetNewUser = (isNewUser) => {
  return (dispatch) => {
    dispatch({ type: SET_NEW_USER, isNewUser });
  };
};

export const ChangeInputValues = (name, value) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_VALUES, name, value });
  };
}