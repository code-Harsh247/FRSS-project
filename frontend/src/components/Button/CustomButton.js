import React from "react";
import "./CustomButton.css";

const CustomButton = ({ btnText, handleClick }) => {
    return (
        <button className="custom-button" onClick={handleClick}>
            {btnText}
        </button>
    );
};

export default CustomButton;
