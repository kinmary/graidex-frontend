import axios from "axios";
import {
  CHANGE_VALUES,
  SET_AUTHENTICATION,
  SET_ERRORS,
  SET_NEW_USER,
} from "./AuthReducer";
import { API_BASE_URL } from "../../constants/config";
import { SET_LOGOUT } from "../MainReducer";
import { getAllSubjects } from "../Dashboard/SubjectActions";

export const SetNewUser = (isNewUser) => {
  return (dispatch) => {
    dispatch({ type: SET_NEW_USER, isNewUser });
  };
};

export const ChangeInputValues = (name, value) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_VALUES, name, value });
  };
};

export const setError = (name, val) => {
  return (dispatch) => {
    dispatch({
      type: SET_ERRORS,
      name: name,
      value: val,
    });
  };
};

// Register a student
export const registerStudent = (student) => {
  var studentDto = {
    email: student.email,
    password: student.password,
    name: student.name,
    surname: student.surname,
    customId: student.customId,
  };
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/student/create`,
        studentDto
      );
      if (response.status === 200) {
        dispatch(loginStudent(studentDto));

      } 
    } catch (error) {
      if (error.response.status === 409) { //Conflict
        alert(error.response.data);
      }
      if(error.response.status === 400){ //Bad Request
        error.response.data.map(obj => alert(obj.attemptedValue + ": " + obj.errorMessage)) ;
      }
    }
  };
};

// Login a student
export const loginStudent = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/student/login`,
        user
      );
      if (response.status === 200) {
        const token = response.data;
        sessionStorage.setItem("token", token);
        setAuthorizationHeader(token);
        dispatch(getStudent(user.email));
      } 
    } catch (error) {
      alert(error.response.data);
    }
  };
};

export const getStudent = (email) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/student/me`);
      if (response.status === 200) {
        dispatch({
          type: SET_AUTHENTICATION,
          isAuth: true,
          name: response.data.name,
          surname: response.data.surname,
          studentId: response.data.customId,
          email: email,
        });
        dispatch(getAllSubjects());
      } 
    } catch (error) {
      alert(error.response.data);
    }
  };
};

// Register a teacher
export const registerTeacher = (teacher) => {
  var teacherDto = {
    email: teacher.email,
    password: teacher.password,
    name: teacher.name,
    surname: teacher.surname,
  };
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/teacher/create`,
        teacherDto
      );
      if (response.status === 200) {
        dispatch(loginTeacher(teacherDto));
      }
    } catch (error) {
        if (error.response.status === 409) {
        alert(error.response.data);
      }
      if(error.response.status === 400){
        error.response.data.map(obj => alert(obj.attemptedValue + ": " + obj.errorMessage)) ;
      }
     
    }
  };
};

// Login a teacher
export const loginTeacher = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/teacher/login`,
        user
      );
      if (response.status === 200) {
        const token = response.data;
        sessionStorage.setItem("token", token);
        setAuthorizationHeader(token);
        dispatch(getTeacher(user.email));
      } 
    } catch (error) {
      //dispatch({ type: LOGIN_TEACHER_FAIL });
      alert(error.response.data);
    }
  };
};

export const getTeacher = (email) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/teacher/me`);
      if (response.status === 200) {
        dispatch({
          type: SET_AUTHENTICATION,
          isAuth: true,
          name: response.data.name,
          surname: response.data.surname,
          email: email,
        });
        dispatch(getAllSubjects());
      } 
    } catch (error) {
      alert(error.response.data);
    }
  };
};

export const Logout = () => {
  return (dispatch) => {
    sessionStorage.clear();
    dispatch({type: SET_LOGOUT});
    dispatch({type: SET_AUTHENTICATION, isAuth: false})
  }
}
export function setAuthorizationHeader(token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

