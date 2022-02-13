import React from "react";
import "./FormButton.scss";

const FormButton = ({ text, onClick, className }) => {
  return (
    <button className={`form-main-button ${className && className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default FormButton;
