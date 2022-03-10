import { useEffect, useState } from "react";

import { API_URL } from "./constants";
import Routes from "./utils/Routes";
import { logout, setUser, setAuth } from "./store/reducers/userActions";
import { useStore } from "./store/store";
import axios from "axios";
import useAxios from "./utils/useAxios";

function App() {
  const [, dispatch] = useStore();
  const [loading, setLoading] = useState(true);
  const api = useAxios();

  useEffect(async () => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/refresh-token`,
        {},
        {
          withCredentials: true,
        }
      );

      if (!response.data.error && response.data.accessToken) {
        // console.log("refreshToken fetched");
        dispatch(setAuth(response.data.accessToken, true));
        const res = await api.get("/me");
        console.log("res", res.data);
        if (!res.data.error) {
          dispatch(setUser(res.data.user));
        }
      } else {
        console.log(response.data.error);
        dispatch(logout());
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, []);

  return loading ? <div>hELlo Boi</div> : <Routes />;
}

export default App;
