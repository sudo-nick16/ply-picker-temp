let accessToken = null;
let authenticated = false;

export const setAccessToken = (token, auth) => {
    accessToken = token;
    authenticated = auth;
}

export const getAccessToken = (token, auth) => {
    return {
        accessToken,
        authenticated
    }
}