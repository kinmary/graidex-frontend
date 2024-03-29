import axios from "axios";
import { API_BASE_URL } from "../../constants/config";
import {  getTeacher } from "../Auth/AuthAction";
import { CheckAuthorization } from "../MainAction";
import { AppDispatch, RootState } from "../../app/store";

export const updateTeacherProfile = (name: string, surname: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      let email = getState().auth.email;
      const teacherInfoDto = {
        name: name,
        surname: surname,
      };
      const response = await axios.put(
        `${API_BASE_URL}/api/teacher/update-info`,
        teacherInfoDto
      );
      if (response.status === 200) {
        dispatch(getTeacher(email!));
      } 
    } catch (error: any) {
      dispatch(CheckAuthorization(error.response.status));
      if (error.response.status === 404) {
        alert(error.response.data);
      }
      if(error.response.status === 400){
        error.response.data.map((obj: any) => alert(obj.attemptedValue + ": " + obj.errorMessage)) ;
      }    
    }
  };
};

export const deleteTeacherProfile = (password: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/teacher/delete`,
        {params: {password}}
      );
      if (response.status === 200) {
        return true;
   }
    } catch (error: any) {
      dispatch(CheckAuthorization(error.response.status));
      alert(error.response.data);
    }
    return false;
  };
};
