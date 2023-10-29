import axios from "axios";
import { API_BASE_URL } from "../../constants/config";
import { getStudent } from "../Auth/AuthAction";
import { CheckAuthorization, } from "../MainAction";
import { AppDispatch, RootState } from "../../app/store";

export const updateStudentProfile = (name: string, surname: string, studentId: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      let email = getState().auth.email;
      const studentInfoDto = {
        name: name,
        surname: surname,
        customId: studentId,
      };
      const response = await axios.put(
        `${API_BASE_URL}/api/student/update-info`,
        studentInfoDto
      );
      if (response.status === 200) {
        dispatch(getStudent(email!));
      }
    } catch (error: any) {
      dispatch(CheckAuthorization(error.response.status));
      if (error.response.status === 404) {
        alert(error.response.data);
      }
      if (error.response.status === 400) {
        error.response.data.map((obj: any) =>
          alert(obj.attemptedValue + ": " + obj.errorMessage)
        );
      }
    }
  };
};

export const deleteStudentProfile = (password: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/student/delete`,
        { params: { password } }
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

export const changeStudentPassword = (newPassword: string, oldPassword: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const changePasswordDto = {
      newPassword: newPassword,
      currentPassword: oldPassword,
    };
    const response = await axios.put(
      `${API_BASE_URL}/api/student/change-password`,
      changePasswordDto
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

export const UpdateProfilePicStudent = (file: File) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      let email = getState().auth.email;
      let f = new FormData();
      f.append("file", file);
      let res = await axios.put(`${API_BASE_URL}/api/student/update-profile-image`, f);
      if (res.status === 200) {
        dispatch(getStudent(email!));
      } 
    } catch (ex) {
      console.log(ex);
    }
  };
};

export const DeleteProfilePicStudent = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      let email = getState().auth.email;
      let res = await axios.delete(`${API_BASE_URL}/api/student/delete-profile-image`);
      if (res.status === 200) {
        dispatch(getStudent(email!));
      } 
    } catch (ex) {
      console.log(ex);
    }
  };
};
