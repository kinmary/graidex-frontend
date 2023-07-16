import axios from "axios";
import {
  CHANGE_USER_ROLE,
  CHANGE_VALUES,
  SET_AUTHENTICATION,
  SET_AUTHENTICATION_TOKEN,
  SET_ERRORS,
  SET_NEW_USER,
} from "./AuthReducer";
import { AppDispatch } from "../../app/store";
import { API_BASE_URL } from "../../constants/config";
import { getAllSubjects } from "../Dashboard/SubjectActions";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
//import { SET_LOGOUT } from "../MainReducer";
//import { getAllSubjects } from "../Dashboard/SubjectActions";

export const SetNewUser = (isNewUser: boolean) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: SET_NEW_USER, isNewUser });
  };
};

export const ChangeInputValues = (name: string, value: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: CHANGE_VALUES, name, value });
  };
};

export const setError = (name: string, val: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: SET_ERRORS,
      name: name,
      value: val,
    });
  };
};

// Register a student
export const registerStudent = (student: any) => {
  var studentDto = {
    email: student.email,
    password: student.password,
    name: student.name,
    surname: student.surname,
    customId: student.customId,
  };
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/student/create`,
        studentDto
      );
      if (response.status === 200) {
        dispatch(loginStudent(studentDto));
      }
    } catch (error: any) {
      //   if (error.response.status === 409) { //Conflict
      //     alert(error.response.data);
      //   }
      //   if(error.response.status === 400){ //Bad Request
      //     error.response.data.map(obj => alert(obj.attemptedValue + ": " + obj.errorMessage)) ;
      //   }
    }
  };
};

// Login a student
export const loginStudent = (user: any) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/student/login`,
        user
      );
      if (response.status === 200) {
        const token = response.data;
        localStorage.setItem("token", token);
        setAuthorizationHeader(token);
        dispatch(getStudent(user.email));
      }
    } catch (error: any) {
      //alert(error.response.data);
    }
  };
};

export const getStudent = (email: string) => {
  return async (dispatch: AppDispatch) => {
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
    } catch (error: any) {
      //alert(error.response.data);
    }
  };
};

// Register a teacher
export const registerTeacher = (teacher: any) => {
  var teacherDto = {
    email: teacher.email,
    password: teacher.password,
    name: teacher.name,
    surname: teacher.surname,
  };
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/teacher/create`,
        teacherDto
      );
      if (response.status === 200) {
        dispatch(loginTeacher(teacherDto));
      }
    } catch (error: any) {
      //     if (error.response.status === 409) {
      //     alert(error.response.data);
      //   }
      //   if(error.response.status === 400){
      //     error.response.data.map(obj => alert(obj.attemptedValue + ": " + obj.errorMessage)) ;
      //   }
    }
  };
};

// Login a teacher
export const loginTeacher = (user: any) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/teacher/login`,
        user
      );
      if (response.status === 200) {
        const token = response.data;
        localStorage.setItem("token", token);
        setAuthorizationHeader(token);
        dispatch(getTeacher(user.email));
      }
    } catch (error: any) {
      //dispatch({ type: LOGIN_TEACHER_FAIL });
      //alert(error.response.data);
    }
  };
};

export const getTeacher = (email: string) => {
  return async (dispatch: AppDispatch) => {
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
    } catch (error: any) {
      //alert(error.response.data);
    }
  };
};

export const Logout = () => {
  return (dispatch: AppDispatch) => {
    //localStorage.clear();
    localStorage.removeItem("token");
    //dispatch({type: SET_LOGOUT});
    dispatch({ type: SET_AUTHENTICATION, isAuth: false });
  };
};

export function setAuthorizationHeader(token: string) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const ChangeUserRole = (userRole: number) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: CHANGE_USER_ROLE, userRole: userRole });
  };
};

export const CheckAuthentication = () => {
  return (dispatch: AppDispatch) => {
    const authToken = localStorage.token;
    if (authToken) {
      const decodedToken: any = jwtDecode(authToken);
      if (decodedToken.exp * 1000 < Date.now()) {
        dispatch(Logout());
      } else {
        dispatch({ type: SET_AUTHENTICATION_TOKEN, isAuth: true,  });
        setAuthorizationHeader(authToken);
        dispatch(getAllSubjects());
      }
    }
  };
};
