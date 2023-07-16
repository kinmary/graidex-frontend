import axios from "axios";
import { API_BASE_URL } from "../../constants/config";
import { GET_ALL_SUBJECTS, SET_OPEN } from "../MainReducer";
import { CheckAuthorization, SetOpen } from "../MainAction";
import { AppDispatch } from "../../app/store";

export const getAllSubjects = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/Subject/all`);
      if (response.status === 200) {
        dispatch({
          type: GET_ALL_SUBJECTS,
          allSubjects: response.data,
        });
      }
    } catch (error: any) {
      dispatch(CheckAuthorization(error.response.status));
      alert(error.message);
    }
  };
};

export const createNewSubject = (subjectId: string | undefined, title:string , imageUrl: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let createSubjectDto = {
        title: title,
        customId: subjectId,
        ImageUrl: imageUrl,
      };
      const response = await axios.post(
        `${API_BASE_URL}/api/Subject/create`,
        createSubjectDto
      );
      if (response.status === 200) {
        dispatch(getAllSubjects());
        dispatch(SetOpen("openSubjectModal", false));
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        //Bad Request
        error.response.data.map((obj: any) =>
          alert(obj.attemptedValue + ": " + obj.errorMessage)
        );
      } else {
        dispatch(CheckAuthorization(error.response.status));
        alert(error.message);
      }
    }
  };
};

export const updateSubject = (id: number, subjectId: string, title: string, imageUrl: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let updateSubjectDto = {
        title: title,
        customId: subjectId,
        ImageUrl: imageUrl,
      };
      const response = await axios.put(
        `${API_BASE_URL}/api/Subject/update/` + id,
        updateSubjectDto
      );
      if (response.status === 200) {
        dispatch(getAllSubjects());
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        //Bad Request
        error.response.data.map((obj: any) =>
          alert(obj.attemptedValue + ": " + obj.errorMessage)
        );
      } else {
        dispatch(CheckAuthorization(error.response.status));
        alert(error.message);
      }
    }
  };
};

export const deleteSubject = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/Subject/delete/` + id
      );
      if (response.status === 200) {
        dispatch(getAllSubjects());
        return true;
      }
} catch (error: any) {      dispatch(CheckAuthorization(error.response.status));
      alert(error.message);
    }
    return false;
  };
};

export const getStudentsList = (subjectId: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/Student/all-of-subject/` + subjectId
      );
      if (response.status === 200) {
        dispatch({type: SET_OPEN, name: "studentsList", value: response.data });
      }
} catch (error: any) {        dispatch(CheckAuthorization(error.response.status));
        alert(error.message);
    }
  };
};

export const addStudent = (id: string, studentEmail: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let subjectId = parseInt(id);

      const response = await axios.post(
        `${API_BASE_URL}/api/Student/add-to-subject/${subjectId}?studentEmail=`+studentEmail
      );
     
      if (response.status === 200) {
        dispatch(getStudentsList(subjectId));
      }
} catch (error: any) {        dispatch(CheckAuthorization(error.response.status));
        alert(error.response.data);
    }
  };
};

export const deleteStudent = (id: string, studentEmail: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let subjectId = parseInt(id);
      const response = await axios.delete(
        `${API_BASE_URL}/api/Student/remove-from-subject/${subjectId}?studentEmail=`+studentEmail
      );
      if (response.status === 200) {
        dispatch(getStudentsList(subjectId));
      }
} catch (error: any) {        dispatch(CheckAuthorization(error.response.status));
        alert(error.response.data);
    }
  };
};