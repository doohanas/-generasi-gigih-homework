import React, {useState} from "react";
import "./button.css";

const Button = () => {
    const [ btn, setBtn ] = useState('Select');

    const handleBtn = () => { btn === "Select" ? setBtn('Deselect') : setBtn('Select') };
    return (
        <button className="btn" onClick={handleBtn}>{btn}</button>
    );
};

export default Button;