import React from "react";
import { useDispatch } from "react-redux";
import { getTokenAction } from "../../redux/token/sliceToken";
import styles from "./logout.module.css";

const Logout = () => {
  // Login Page
 const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(getTokenAction.emptyToken());
  };
  return (
    <div className={styles.logout_button}>
      <button type="submit" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
