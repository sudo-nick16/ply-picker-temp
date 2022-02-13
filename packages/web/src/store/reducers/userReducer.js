export const initialState  = {
    accessToken: null,
    authenticated: false,
}

export const setUser = (accessToken) => {
    console.log(accessToken, "accessToken in reducer");
    return {
        type: "SET_USER",
        payload: accessToken
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

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                accessToken: action.payload,
                authenticated: true,
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