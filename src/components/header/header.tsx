import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, getTokenAction } from "redux/token/sliceToken";
import {
  CLIENT_ID,
  AUTHORIZE_URL,
  REDIRECT_URL_AFTER_LOGIN,
  REACT_APP_SCOPES,
} from "data/spotifyAuth";

import styles from "./header.module.css";

const Header: React.FC = (): JSX.Element => {
  const accessToken = useSelector(selectToken);
  const dispatch = useDispatch();

  const handleLogin = (): void => {
    window.location.href = `${AUTHORIZE_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${REACT_APP_SCOPES}&response_type=token&show_dialog=true&state=123`;
  };

  const handleLogout = (): void => {
    dispatch(getTokenAction.emptyToken());
  };
  return (
    <div className={styles.header}>
      <h2>My WEB APP</h2>
      {!accessToken && (
        <div className={styles.navigation_login}>
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}
      {accessToken && (
        <div className={styles.navigation_logout}>
          <button type="submit" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
