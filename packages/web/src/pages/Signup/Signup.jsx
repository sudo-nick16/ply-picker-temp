import { useState } from "react";
import InputField from "../../components/InputField/InputField";
import FormButton from "../../components/Buttons/FormButton";
import validator from "validator";
import axios from "axios";
import "./Signup.scss";
import FormBottomButton from "../../components/Buttons/FormBottomButton";
import { API_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/store";
import { setAuth, setUser } from "../../store/reducers/userActions";

const Signup = () => {
  const navigate = useNavigate();
  const [_, dispatch] = useStore();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState("");

  const setCustomMobile = (val) => {
    console.log(val);
    if ((validator.isNumeric(val) && !otpSent) || (val === "" && !otpSent)) {
      setMobile(val);
    }
  };

  const signUpHandler = async () => {
    switch (true) {
      case !validator.isEmail(email):
        return;
        break;
      case !validator.isMobilePhone(mobile):
        return;
        break;
      case !validator.isLength(password, { min: 6 }):
        return;
        break;
      case !validator.isLength(name, { min: 3 }):
        return;
        break;
      case !otpSent:
        return;
        break;
    }
    console.log(name, mobile, email, password, otp);
    const data = {
      name,
      mobileNumber: mobile,
      email,
      password,
      otp,
    };
    const response = await axios.post(API_URL + "/auth/signup", data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(response, "response");
    if (
      !response.data.error &&
      response.data.accessToken &&
      response.data.user
    ) {
      dispatch(setUser(response.data.user));
      dispatch(setAuth(response.data.accessToken, true));
    } else {
      alert(response.data.error);
    }
  };

  const verifyMobile = async () => {
    if (!validator.isMobilePhone(mobile)) {
      alert("Invalid phone number.");
      return;
    }
    const response = await axios.post(
      API_URL + "/auth/verify-mobile",
      { mobileNumber: mobile },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("response", response);
    if (!response.data.error) {
      setOtpSent(true);
    } else {
      alert(response.data.error);
    }
  };

  return (
    <div className="signup-container">
      <img
        src="https://ii1.pepperfry.com/media/wysiwyg/banners/Web_IMG_17Dec_02022022.jpg"
        alt="ply-picker"
      />
      <div className="signup-form">
        <div>
          <InputField
            value={name}
            setValue={setName}
            placeholder="Name"
            maxLength="20"
          />
          <div className="mobile-number-input">
            <InputField
              value={mobile}
              setValue={setCustomMobile}
              type="tel"
              placeholder="Mobile Number"
              maxLength="10"
            />
            {otpSent ? (
              <InputField
                className="otp-input"
                value={otp}
                setValue={setOtp}
                type="tel"
                placeholder="Enter OTP"
                maxLength="6"
              />
            ) : (
              <span onClick={verifyMobile}>Verify with Otp</span>
            )}
          </div>
          <InputField value={email} setValue={setEmail} placeholder="Email" />
          <InputField
            value={password}
            setValue={setPassword}
            placeholder="Password"
            type="password"
          />
          <FormButton
            className="form-register-btn"
            text="Register"
            onClick={signUpHandler}
          />
          <p className="">
            By registering you agree to our <b>Terms & Conditions</b>
          </p>
        </div>
        <FormBottomButton
          className="form-btm-btn"
          text="Existing User? Log In"
          onClick={() => navigate("/login")}
        />
      </div>
    </div>
  );
};
export default Signup;
