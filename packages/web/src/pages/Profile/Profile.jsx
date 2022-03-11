import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants.js";
import { setAuth } from "../../store/reducers/userActions.js";
import { useStore } from "../../store/store";
import useAxios from "../../utils/useAxios.js";

const Profile = () => {
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
      dispatch(setAuth("", false));
      navigate("/login");
    }
  };

  useEffect(async () => {
      setEmail(state.user.email);
      setName(state.user.name);
  }, []);
  return (
    <div>
      Name : {name} <br />
      Email : {email}<br />
      <button onClick={() => navigate("/me")}>Me</button>
      <button onClick={() => navigate("/profile/edit")}>Edit Profile</button>
      <button onClick={logout}>Logout</button>
      <button onClick={() => navigate("/signup")}>SignUp</button>
      <button onClick={() => navigate("/login")}>Login</button>
      <br />
      <button onClick={() => navigate("/products")}>See Products</button>
      <button onClick={() => navigate("/cart")}>Go to Cart</button>
      <button onClick={() => navigate("/wishlist")}>Go to Wishlist</button>
      <button onClick={() => navigate("/orders")}>Go to Orders</button>
    </div>
  );
};

export default Profile;
