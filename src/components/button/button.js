import React from "react";
import PropTypes from "prop-types";
import styles from "./button.module.css";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Button = ({ onClick, nameButton, className = styles.button }) => {
  return (
    <button className={className} onClick={onClick}>
      {nameButton}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  nameButton: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Button;
