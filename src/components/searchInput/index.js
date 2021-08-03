import React from "react";
import PropTypes from "prop-types";
import "../button/button.css";

const SearchData = ({ placeholder, onChange, onClick }) => {
  return (
    <>
      <input
        className="search-input"
        type="text"
        onChange={onChange}
        placeholder={placeholder}
      ></input>
      <button className="btn" onClick={onClick}>
        Search
      </button>
    </>
  );
};

SearchData.propTypes = {
  placeholder: PropTypes.node.isRequired,
  onChange: PropTypes.node.isRequired,
  onClick: PropTypes.node.isRequired,
};

export default SearchData;
