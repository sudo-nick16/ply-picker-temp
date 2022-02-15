import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormBottomButton from "../../components/Buttons/FormBottomButton";
import FormButton from "../../components/Buttons/FormButton";
import InputField from "../../components/InputField/InputField";
import { API_URL } from "../../constants";
import { setUser, test } from "../../store/reducers/userReducer";
import { useStore } from "../../store/store";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [_, dispatch] = useStore();

  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    const data = {
      emailOrMobile,
      password,
    };
    const response = await axios.post(API_URL + "/auth/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(response, "response");
    if (response.data.error && !response.data.accessToken) {
      alert(response.data.error);
    } else {
      console.log(response.data.accessToken, true);
      dispatch(setUser(response.data.accessToken, true));
      navigate("/me");
    }
  };

  return (
    <div className="login-container">
      <img
        src="https://ii1.pepperfry.com/media/wysiwyg/banners/Web_IMG_17Dec_02022022.jpg"
        alt="ply-picker"
      />
      <div className="login-form">
        <div>
          <InputField
            value={emailOrMobile}
            setValue={setEmailOrMobile}
            type="tel"
            placeholder="Email ID/Mobile"
          />
          <InputField
            value={password}
            setValue={setPassword}
            placeholder="Password"
            type="password"
          />
          <FormButton
            className="form-login-btn"
            text="Login"
            onClick={loginHandler}
          />
          <p className="" onClick={() => navigate("/reset-password")}>
            Forgot Password
          </p>
        </div>
        <FormBottomButton
          className="form-btm-btn"
          text="New to Pepperfry? Register Here"
          onClick={() => navigate("/signup")}
        />
        {/* <button onClick={() => dispatch(test())}>Test</button> */}
      </div>
    </div>
  );
};

export default Login;
