import { useEffect, useState } from "react";

import { API_URL } from "./constants";
import Routes from "./utils/Routes";
import { logout, setUser } from "./store/reducers/userReducer";
import { useStore } from "./store/store";
import axios from "axios";

function App() {
  const [, dispatch] = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try{
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
        // console.log("refreshToken fetched");
        dispatch(setUser(response.data.accessToken, true));
      } else {
        console.log(response.data.error);
        dispatch(logout());
      }
    }catch(err){
      console.log(err);
    }

    setLoading(false);
  }, []);

  return loading ? <div>Hello</div> : <Routes />;
}

export default App;
