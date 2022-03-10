export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: { user },
  };
};

export const setAuth = (accessToken, auth) => {
  return {
    type: "SET_AUTH",
    payload: { accessToken, auth },
  };
}

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const addAddress = (address) => {
  return {
    type: "ADD_ADDRESS",
    payload: { address },
  };
}