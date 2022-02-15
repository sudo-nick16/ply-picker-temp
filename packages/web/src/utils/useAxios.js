import axios from "axios";
import { API_URL } from "../constants";
import { useStore } from "../store/store";
import { setUser } from "../store/reducers/userReducer";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const useAxios = () => {
  const [state, dispatch] = useStore();
  console.log(state, "state");

  const axiosA = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.accessToken}`,
    },
  });

  const refreshToken = async () => {
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
      console.log("refreshToken", response.data.accessToken);
      dispatch(setUser(response.data.accessToken, true));
    }
  };

  axiosA.interceptors.request.use(
    async (request) => {
      console.log("request", request, state.accessToken);
      request.headers["Authorization"] = `Bearer ${state.accessToken}`;
      let isExpired = true;
      try {
        const { exp } = await jwt_decode(state.accessToken);
        isExpired = Date.now() >= exp * 1000;
      } catch (err) {
        isExpired = true;
      }
      if (!isExpired) {
        return request;
      }
      request.headers["Authorization"] = `Bearer ${state.accessToken}`;
      return request;
    },
    function (error) {
      console.log("axios error req", error);
      return Promise.resolve(error);
    }
  );

  axiosA.interceptors.response.use(
    async (response) => {
      console.log("response", response);
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
