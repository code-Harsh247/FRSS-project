import React, { useState } from "react";
import "./InputBox.css";

const InputBox = ({ type = "text", onInputChange, autocomplete }) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
        onInputChange(inputValue);
    };

    return (
        <div>
            <input className="InputBox"
                type= {type}
                value={inputValue}
                onChange={handleChange}
                placeholder=""
                autoComplete = {autocomplete}
            />
        </div>
    );
}

export default InputBox;