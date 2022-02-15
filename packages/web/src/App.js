import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_URL } from "./constants";
import Routes from "./Routes";
import { setUser } from "./store/reducers/userReducer";
import { useStore } from "./store/store";
import useAxios from "./utils/useAxios";

function App() {
  const [state, dispatch] = useStore();
  const api = useAxios();
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const refreshToken = async () => {
      const response = await api.post(
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
        // console.log("refreshToken", response.data.accessToken);
        dispatch(setUser(response.data.accessToken, true));
      }else{
        throw new Error(response.data.error);
      }
    };
    try{
      await refreshToken();
    }catch(err){
      console.log(err);
    }
    setLoading(false);

  }, []);

  return loading ? <div>Hello</div> : <Routes />
}

export default App;