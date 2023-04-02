const initialState = {
    editPage: false,
    createTestPage: false,
    openSubjectModal: false,
    selectedSubjectId: "",
    openTestModal: false,
    messageModal: false,
    message: ""
}

export const MainReducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case SET_OPEN:
            state = {
                ...state,
                [action.name]: action.value
            };
            break;
            case SET_MESSAGE_OPEN:
            state = {
                ...state,
                messageModal: action.mode,
                message: action.message
            };
            break;
        default:
            break;
    };
    return state;
}

export const SET_OPEN = "SET_OPEN";
export const SET_MESSAGE_OPEN = "SET_MESSAGE_OPEN";