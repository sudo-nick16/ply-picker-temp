import React from "react";
import "./FormBottomButton.scss";

const FormBottomButton = ({ text, onClick, className }) => {
  return (
    <button className={`form-bottom-button ${className && className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default FormBottomButton;
