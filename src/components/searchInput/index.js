import React from "react";
import PropTypes from "prop-types";
import styles from "./searchBar.module.css";

const SearchData = ({ placeholder, onChange, onClick }) => {
  return (
    <div className={styles.search_bar}>
      <input
        className={styles.search_input}
        type="text"
        onChange={onChange}
        placeholder={placeholder}
      />
      <button className={styles.search_button} onClick={onClick}>
        Search
      </button>
    </div>
  );
};

SearchData.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.any.isRequired,
  onClick: PropTypes.any.isRequired,
};

export default SearchData;
