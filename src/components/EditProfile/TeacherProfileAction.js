import axios from "axios";
import { API_BASE_URL } from "../../constants/config";
import {  getTeacher } from "../Login/AuthAction";

export const updateTeacherProfile = (name, surname) => {
  return async (dispatch, getState) => {
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
        dispatch(getTeacher(email));
      } 
    } catch (error) {
      if (error.response.status === 404) {
        alert(error.response.data);
      }
      if(error.response.status === 400){
        error.response.data.map(obj => alert(obj.attemptedValue + ": " + obj.errorMessage)) ;
      }    
    }
  };
};

export const deleteTeacherProfile = (password) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/teacher/delete`,
        {params: {password}}
      );
      if (response.status === 200) {
        return true;
   }
    } catch (error) {
      alert(error.response.data);
    }
    return false;
  };
};

