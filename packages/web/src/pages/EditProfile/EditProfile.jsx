import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants.js";
import { setAuth } from "../../store/reducers/userActions";
import { useStore } from "../../store/store";
import useAxios from "../../utils/useAxios.js";

const EditProfile = () => {
  const [state, dispatch] = useStore();
  const api = useAxios();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const logout = async () => {
    const response = await api.post(
      `${API_URL}/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    if (!response.data.error) {
      dispatch(setAuth(null, false));
      navigate("/login");
    }
  };

  useEffect(async () => {
    const response = await api.post(`${API_URL}/me`);
    if (!response.data.error && response.data.accessToken) {
      const data = response.data;
      setEmail(data.email);
      setName(data.name);
    }
  }, []);
  return (
    <div>
      Name : {name} <br />
      Email : {email}
      <br />
      <button onClick={() => navigate("/me")}>Me</button>
      <button onClick={() => navigate("/profile/edit")}>Edit Profile</button>
      <button onClick={logout}>Logout</button>
      <button onClick={() => navigate("/signup")}>SignUp</button>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
};

export default EditProfile;
