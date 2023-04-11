const initialState = {
    isAuth: false,
    isNewUser: false,
    name: "Bob",
    surname: "Marley",
    errors: { email : "", password: "", repeatPassword: ""}
}

//TODO: Logout,
export const AuthReducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case SET_AUTHENTICATION:
            state = {
                ...state,
                isAuth: action.isAuth,
                //name: action.name,
                //surname: action.surname,
            };
            break;
        case SET_NEW_USER:
            state = {
                ...state,
                isNewUser: action.isNewUser
            }
            break;
            case CHANGE_VALUES:
            state = {
                ...state,
                [action.name]: action.value
            }
            break;
            case SET_ERRORS:
                state = {
                    ...state,
                    errors: {...state.errors,
                        [action.name]: action.value
                    }
                    
                }
                break;
        default:
            break;
    };
    return state;
}

export const SET_AUTHENTICATION = "SET_AUTHENTICATION";
export const SET_NEW_USER = "SET_NEW_USER";
export const CHANGE_VALUES = "CHANGE_VALUES";
export const SET_ERRORS = "SET_ERRORS";
//TODO: add messages 
export const REGISTER_TEACHER_FAIL = "REGISTER_TEACHER_FAIL";
export const LOGIN_TEACHER_FAIL = "LOGIN_TEACHER_FAIL";
export const REGISTER_STUDENT_FAIL = "REGISTER_STUDENT_FAIL";
export const LOGIN_STUDENT_FAIL = "LOGIN_STUDENT_FAIL";
