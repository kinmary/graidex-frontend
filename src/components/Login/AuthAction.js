import axios from "axios";
import {
  CHANGE_VALUES,
  LOGIN_STUDENT_FAIL,
  LOGIN_TEACHER_FAIL,
  REGISTER_STUDENT_FAIL,
  REGISTER_TEACHER_FAIL,
  SET_AUTHENTICATION,
  SET_ERRORS,
  SET_NEW_USER,
} from "./AuthReducer";
import { API_BASE_URL } from "../../constants/config";
import { authHeader } from "../../utils/AuthHeader";

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
  return  (dispatch) => {
      dispatch({
        type: SET_ERRORS,
        name: name,
        value:  val,
      });
  };
};

// Register a student
export const registerStudent = (student) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/Auth/register-student`,
        student
      );
      if (response.status === 200) {
        dispatch({ type: "REGISTER_STUDENT_SUCCESS" });
      } else {
        //dispatch({ type: REGISTER_STUDENT_FAIL });
        alert(response.data);
      }
    } catch (error) {
      //dispatch({ type: REGISTER_STUDENT_FAIL });
      alert(error.response.data);
    }
  };
};

// Login a student
export const loginStudent = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/Auth/login-student`,
        user
      );
      if (response.status === 200) {
        sessionStorage.setItem("token", response.data);
        axios.defaults.headers.common = authHeader();
        dispatch({ type: "LOGIN_STUDENT_SUCCESS" });
      } else {
        //dispatch({ type: LOGIN_STUDENT_FAIL });
        alert(response.data);
      }
    } catch (error) {
      //dispatch({ type: LOGIN_STUDENT_FAIL });
      alert(error.response.data);

    }
  };
};

// Register a teacher
export const registerTeacher = (teacher) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/Auth/register-teacher`,
        teacher
      );
      if (response.status === 200) {
        let user = {email: teacher.email, password: teacher.password}
        dispatch(loginTeacher(user));
      } else {
        //dispatch({ type: REGISTER_TEACHER_FAIL });
        alert(response.data);
      }
    } catch (error) {
      //dispatch({ type: REGISTER_TEACHER_FAIL });
      alert(error.response.data);
      //alert(error);

    }
  };
};

// Login a teacher
export const loginTeacher = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/Auth/login-teacher`,
        user
      );
      if (response.status === 200) {
        const token = response.data;
        sessionStorage.setItem("token", token);
        setAuthorizationHeader(token);
        dispatch({ type: SET_AUTHENTICATION, isAuth: true, });
      } else {
        //dispatch({ type: LOGIN_TEACHER_FAIL });
        alert(response.data);
      }
    } catch (error) {
      //dispatch({ type: LOGIN_TEACHER_FAIL });
      alert(error.response.data);
    }
  };
};

export function setAuthorizationHeader(token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// export const loginWithToken = (token) => {
//   return async (dispatch) => {
//     try {
//       setAuthorizationHeader(token);
//       const response = await axios.get(`${API_BASE_URL}/api/user`);
//       if (response.status === 200) {
//         dispatch({ type: SET_AUTHENTICATION, isAuth: true });
//       } else {
//         dispatch({ type: LOGIN_TEACHER_FAIL });
//       }
//     } catch (error) {
//       dispatch({ type: LOGIN_TEACHER_FAIL });
//     }
//   };
// };