import axios from "axios";
import { API_URL } from "../constants";
import { useStore } from "../store/store";
import { logout, setUser } from "../store/reducers/userReducer";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";

const useAxios = () => {
  const [state, dispatch] = useStore();

  const axiosA = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.accessToken}`,
    },
  });

  const refreshToken = async () => {
    console.log("refreshing token");
    const response = await axios.post(
      `${API_URL}/auth/refresh-token`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data.error && response.data.accessToken) {
      dispatch(setUser(response.data.accessToken, true));
      return response.data.accessToken;
    } else {
      console.log("logging out because couldn't refresh");
      dispatch(logout());
      return "";
    }
  };

  axiosA.interceptors.request.use(
    async (request) => {
      request.headers["Authorization"] = `Bearer ${state.accessToken}`;

      let isExpired = true;

      try {
        const { exp } = await jwt_decode(state.accessToken);
        // console.log("exp", exp * 1000, Date.now());
        isExpired = Date.now() >= exp * 1000;
        if (!isExpired) {
          console.log("token is not expired");
          return request;
        }
      } catch (err) {
        console.log("expired");
        isExpired = true;
      }
      const accessToken = await refreshToken();
      // console.log("inside recep", state.accessToken);
      request.headers["Authorization"] = `Bearer ${accessToken}`;
      return request;
    },
    function (error) {
      console.log("axios error req", error);
      return Promise.reject(error);
    }
  );

  // can be used if token is not checked on frontend
  axiosA.interceptors.response.use(
    async (response) => {
      // console.log("response", response);
      return response;
    },
    async (error) => {
      console.log("axios error", error);
      // if (error.response.status === 403) {
      //     await refreshToken();
      //     return axiosA(error.config);
      // }
      return Promise.reject(error);
    }
  );

  return axiosA;
};

export default useAxios;
