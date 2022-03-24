import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useNavigationType } from "react-router-dom";
import FormBottomButton from "../../components/Buttons/FormBottomButton";
import FormButton from "../../components/Buttons/FormButton";
import InputField from "../../components/InputField/InputField";
import { API_URL } from "../../constants";
import { setAuth, setUser } from "../../store/reducers/userActions";
import { useStore } from "../../store/store";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [_, dispatch] = useStore();

  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    if(!emailOrMobile || !password) {
      // TODO: show error
      return;
    }
    const data = {
      emailOrMobile,
      password,
    };
    console.log(data);
    const response = await axios.post(API_URL + "/auth/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(response, "response");
    if (!response.data.error && response.data.accessToken && response.data.user) {
      console.log(response.data.accessToken, true);
      dispatch(setUser(response.data.user));
      dispatch(setAuth(response.data.accessToken, true));
      navigate("/");
    } else {
      alert(response.data.error);
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
