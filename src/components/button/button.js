import React from "react"
import PropTypes from "prop-types";
import styles from "./button.module.css";

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
