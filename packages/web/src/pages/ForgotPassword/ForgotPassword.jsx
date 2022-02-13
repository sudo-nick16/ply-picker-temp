import axios from "axios";
import React, { useState } from "react";
import FormButton from "../../components/Buttons/FormButton";
import InputField from "../../components/InputField/InputField";
import { API_URL } from "../../constants";
import "./ForgotPassword.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const forgotPasswordHandler = async () => {
      const response = await axios.post(API_URL + "/auth/reset-password", {email}, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      console.log(response, "response");
      if (response.data.error) {
        alert(response.data.error);
      }else{
        alert("Password reset link sent to your email.");
      }
  }

  return (
    <div className="reset-password-container">
      <div>
        <InputField
          value={email}
          setValue={setEmail}
          type="tel"
          placeholder="Email ID"
        />
        <FormButton className="form-login-btn" text="Reset Password" onClick={forgotPasswordHandler} />
      </div>
    </div>
  );
};

export default ForgotPassword;
