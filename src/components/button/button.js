import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./button.module.css";

const Button = () => {
  const [btn, setBtn] = useState("Select");

  const handleBtn = () => {
    btn === "Select" ? setBtn("Deselect") : setBtn("Select");
  };
  return (
    <button className={styles.btn} onClick={handleBtn}>
      {btn}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
