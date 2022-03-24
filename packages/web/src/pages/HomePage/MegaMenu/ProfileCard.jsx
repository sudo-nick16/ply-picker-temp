import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../store/reducers/userActions";
import { useStore } from "../../../store/store";
import "./ProfileCard.scss";

const ProfileCard = ({ setShowProfileCard }) => {
    const navigate= useNavigate();
    const [state, dispatch] = useStore();
    
  return (
    <div
      className="profileCardContainer"
      onMouseOver={() => setShowProfileCard(true)}
    >
      <ul>
        <li onClick={() => {navigate("/edit/profile"); setShowProfileCard(false)}}>Edit profile</li>
        <li onClick={() => {navigate("/orders"); setShowProfileCard(false)}}>My Orders</li>
        <li onClick={() => {dispatch(logout()); setShowProfileCard(false)}}>Logout</li>
      </ul>
    </div>
  );
};

export default ProfileCard;
