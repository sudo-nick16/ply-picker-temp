export const initialState  = {
    accessToken: null,
    authenticated: false,
    user: null
}

export const userReducer = (state, action) => {
    switch (action.type) {
        case "SET_AUTH":
            return {
                ...state,
                accessToken: action.payload.accessToken,
                authenticated: action.payload.auth,
            };
        case "SET_USER":
            return {
                ...state,
                user: action.payload.user,
            };
        case "LOGOUT":
            return {
                ...state,
                accessToken: null,
                authenticated: false,
                user: null,
            };
        case "ADD_ADDRESS":{
            let {address} = action.payload;
            address.mobile = `+91${address.mobile}`;
            return {
                ...state,
                user: {
                    ...state.user,
                    addresses: [...state.user.addresses, action.payload.address]
                }
            }
        }
        case "TEST": {
            alert("test");
            return state
        }
        default:
            return state;
    }
}