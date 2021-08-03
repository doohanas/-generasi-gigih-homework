import React, { useState } from "react";
import PropTypes from "prop-types";
import "./button.css";

const Button = () => {
  const [btn, setBtn] = useState("Select");

  const handleBtn = () => {
    btn === "Select" ? setBtn("Deselect") : setBtn("Select");
  };
  return (
    <button className="btn" onClick={handleBtn}>
      {btn}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
