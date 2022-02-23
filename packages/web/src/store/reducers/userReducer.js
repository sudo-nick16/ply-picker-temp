export const initialState  = {
    accessToken: null,
    authenticated: false,
}

export const setUser = (accessToken, auth) => {
    return {
        type: "SET_USER",
        payload: {accessToken, auth}
    }
}

export const logout = () => {
    return {
        type: "LOGOUT",
    }
}

export const test = () => {
    return {
        type: "TEST",
    }
}

export const userReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                accessToken: action.payload.accessToken,
                authenticated: action.payload.auth,
            };
        case "LOGOUT":
            return {
                ...state,
                accessToken: null,
                authenticated: false,
            };
        case "TEST": {
            alert("test");
            return state
        }
        default:
            return state;
    }
}