import axios from "axios";
import { API_BASE_URL } from "../../constants/config";
import { Logout, getStudent } from "../Login/AuthAction";
import { CheckAuthorization, SetOpen } from "../MainAction";
export const updateStudentProfile = (name, surname, studentId) => {
  return async (dispatch, getState) => {
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
        dispatch(getStudent(email));
      }
    } catch (error) {
      dispatch(CheckAuthorization(error.response.status));
      if (error.response.status === 404) {
        alert(error.response.data);
      }
      if (error.response.status === 400) {
        error.response.data.map((obj) =>
          alert(obj.attemptedValue + ": " + obj.errorMessage)
        );
      }
    }
  };
};

export const deleteStudentProfile = (password) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/student/delete`,
        { params: { password } }
      );
      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      dispatch(CheckAuthorization(error.response.status));
      alert(error.response.data);
    }
    return false;
  };
};

