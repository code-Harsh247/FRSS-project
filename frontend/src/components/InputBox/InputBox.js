import React, { useState } from "react";
import "./InputBox.css";

const InputBox = ({ type = "text", onInputChange, autocomplete }) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue); // Update the state with the new value
        onInputChange(newValue); // Pass the new value to the parent component
    };

    return (
        <div>
            <input className="InputBox"
                type={type}
                value={inputValue}
                onChange={handleChange}
                placeholder=""
                autoComplete={autocomplete}
            />
        </div>
    );
}

export default InputBox;
