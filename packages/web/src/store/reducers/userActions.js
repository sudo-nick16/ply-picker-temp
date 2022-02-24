export const setUser = (accessToken, auth) => {
  return {
    type: "SET_USER",
    payload: { accessToken, auth },
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
