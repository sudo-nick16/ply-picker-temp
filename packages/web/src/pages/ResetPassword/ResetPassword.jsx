import React from "react";
import FormButton from "../../components/Buttons/FormButton";
import InputField from "../../components/InputField/InputField";
import "./ResetPassword.scss";

const ResetPassword = () => {
  return (
    <div className="reset-password-container">
      <div>
        <InputField
          value=""
          setValue=""
          type="tel"
          placeholder="Email ID"
        />
        <FormButton className="form-login-btn" text="Reset Password" onClick={""} />
      </div>
    </div>
  );
};

export default ResetPassword;
