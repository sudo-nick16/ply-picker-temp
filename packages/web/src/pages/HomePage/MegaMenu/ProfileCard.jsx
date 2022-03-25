import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../store/reducers/userActions";
import { useStore } from "../../../store/store";
import useAxios from "../../../utils/useAxios";
import "./ProfileCard.scss";

const ProfileCard = ({ setShowProfileCard }) => {
    const navigate= useNavigate();
    const [state, dispatch] = useStore();
    const api = useAxios();

    const logoutHandler = async () => {
      const response = await api.post(
        `/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
  
      if (!response.data.error) {
        dispatch(logout());
        navigate("/");
      }
    };
    
  return (
    <div
      className="profileCardContainer"
      onMouseOver={() => setShowProfileCard(true)}
    >
      {
        state.authenticated?
      <ul>
        <li onClick={() => {navigate("/edit/profile"); setShowProfileCard(false)}}>Edit profile</li>
        <li onClick={() => {navigate("/orders"); setShowProfileCard(false)}}>My Orders</li>
        <li onClick={() => {logoutHandler(); setShowProfileCard(false)}}>Logout</li>
      </ul>
      :
      <ul>
        <li onClick={() => navigate("/login")}>Login</li>
        <li onClick={() => navigate("/signup")}>Sign Up</li>
      </ul>
      }
    </div>
  );
};

export default ProfileCard;
