import React from "react";
import { useSelector } from "react-redux";
import { selectToken } from "redux/token/sliceToken";
import Login from "components/login/login";
import Logout from "components/logout/logout";
import styles from "./header.module.css";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Header: React.FC = (): JSX.Element => {
  const accessToken = useSelector(selectToken);
  return (
    <div className={styles.header}>
      <h2>My WEB APP</h2>
      {!accessToken ? (
        <div className={styles.navigation_login}>
          <Login />
        </div>
      ) : (
        <div className={styles.navigation_logout}>
          <Logout />
        </div>
      )}
    </div>
  );
};

export default Header;
