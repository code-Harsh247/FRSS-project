import React from "react";
import "./CustomButton.css";

const CustomButton = ({ btnText, handleClick, Btnwidth}) => {
    return (
        <button className="custom-button" onClick={handleClick} style={{ width: Btnwidth }}>
            {btnText}
        </button>
    );
};

export default CustomButton;
