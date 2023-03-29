const initialState = {
    isAuth: true,
    isNewUser: false,
    name: "Bob",
    surname: "Marley"
}

//TODO: Logout,
export const AuthReducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case SET_AUTHENTICATION:
            state = {
                ...state,
                isAuth: action.isAuth
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
        default:
            break;
    };
    return state;
}

export const SET_AUTHENTICATION = "SET_AUTHENTICATION";
export const SET_NEW_USER = "SET_NEW_USER";
export const CHANGE_VALUES = "CHANGE_VALUES";