import React from "react";
import "./CustomButtonSecondary.css";

const CustomButtonSecondary = ({ btnText, handleClick, Btnwidth}) => {
    return (
        <button className="custom-button-secondary" onClick={handleClick} style={{ width: Btnwidth }}>
            {btnText}
        </button>
    );
};

export default CustomButtonSecondary;