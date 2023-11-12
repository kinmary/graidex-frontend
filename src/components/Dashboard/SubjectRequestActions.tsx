import axios from "axios";
import { AppDispatch } from "../../app/store";
import { API_BASE_URL } from "../../constants/config";
import { GET_PENDING_SUBJECT_REQUESTS, GET_SUBJECT_REQUESTS } from "../MainReducer";
import { CheckAuthorization } from "../MainAction";
import { getAllSubjects, getStudentsList } from "./SubjectActions";

export const getSubjectRequests = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/SubjectRequest/all`
      );
      if (response.status === 200) {
        dispatch({
          type: GET_SUBJECT_REQUESTS,
          subjectRequests: response.data,
        });
      }
    } catch (error: any) {
      dispatch(CheckAuthorization(error.response.status));
      //alert(error.message);
    }
  };
};

export const joinSubjectRequest = (subjectRequestId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/SubjectRequest/join/` + subjectRequestId
      );
      if (response.status === 200) {
        dispatch(getSubjectRequests());
        dispatch(getAllSubjects());
      }
    } catch (error: any) {
      dispatch(CheckAuthorization(error.response.status));
      //alert(error.message);
    }
  };
};

export const rejectSubjectRequest = (subjectRequestId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/SubjectRequest/reject/` + subjectRequestId
      );
      if (response.status === 200) {
        dispatch(getSubjectRequests());
        dispatch(getAllSubjects());
      }
    } catch (error: any) {
      dispatch(CheckAuthorization(error.response.status));
      //alert(error.message);
    }
  };
};

export const addStudent = (id: string, studentEmail: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let subjectId = parseInt(id);
      const response = await axios.post(
        `${API_BASE_URL}/api/SubjectRequest/create/${subjectId}?studentEmail=` +
          studentEmail
      );
      if (response.status === 200) {
        dispatch(getSubjRequestsOfTeacher(id));
        dispatch(getStudentsList(subjectId));
      }
    } catch (error: any) {
      dispatch(CheckAuthorization(error.response.status));
      alert(error.response.data);
    }
  };
};

export const deleteSubjectRequest = (id: string, subjectRequestId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let subjectId = parseInt(id);
      const response = await axios.delete(
        `${API_BASE_URL}/api/SubjectRequest/delete/${subjectRequestId}`
      );
      if (response.status === 200) {
        dispatch(getSubjRequestsOfTeacher(id));
        dispatch(getStudentsList(subjectId));
      }
    } catch (error: any) {
      dispatch(CheckAuthorization(error.response.status));
      alert(error.response.data);
    }
  };
};

export const getSubjRequestsOfTeacher = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
          let subjectId = parseInt(id);
          const response = await axios.get(
            `${API_BASE_URL}/api/SubjectRequest/of-teacher/${subjectId}`
          );
          if (response.status === 200) {
            // TODO: remove this when backend is fixed
            response.data.forEach((element: { date: string; }) => {
              element.date += "Z";
            });
            
            dispatch({type: GET_PENDING_SUBJECT_REQUESTS, pendingSubjectRequests: response.data })
            //dispatch(getStudentsList(subjectId)); ?
          }
        } catch (error: any) {
          dispatch(CheckAuthorization(error.response.status));
          alert(error.response.data);
        }
      };
}