import React from "react";
import { useDispatch } from "react-redux";
import { getTokenAction } from "redux/token/sliceToken";
import styles from "./logout.module.css";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Logout: React.FC = (): JSX.Element => {
  // Login Page
  const dispatch = useDispatch();

  const handleLogout = (): void => {
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
