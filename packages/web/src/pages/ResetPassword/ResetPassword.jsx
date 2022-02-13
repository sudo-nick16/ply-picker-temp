import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormButton from "../../components/Buttons/FormButton";
import InputField from "../../components/InputField/InputField";
import { API_URL } from "../../constants";
import "./ResetPassword.scss";

const ResetPassword = (props) => {
  const { id, token } = useParams();
  if (!(id && token)) {
    props.history.push("/");
  }
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordHandler = async () => {
    if (confirmPassword !== password) {
      return;
    }
    const response = await axios.post(
      `${API_URL}/auth/reset-password/${id}/${token}`,
      { id, token, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response, "response");
    if (response.data.error) {
      alert(response.data.error);
    } else {
      alert("Password reset successfully.");
    }
  };

  return (
    <div className="reset-password-container">
      <div>
        <InputField
          value={password}
          setValue={setPassword}
          type="password"
          placeholder="Password"
          className={password === confirmPassword ? "match" : "mismatch"}
        />
        <InputField
          value={confirmPassword}
          setValue={setConfirmPassword}
          type="password"
          placeholder="Confirm Password"
          className={password === confirmPassword ? "match" : "mismatch"}
        />
        <FormButton
          className="form-login-btn"
          text="Reset Password"
          onClick={resetPasswordHandler}
        />
      </div>
    </div>
  );
};

export default ResetPassword;
