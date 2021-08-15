import React from "react";
import {
  CLIENT_ID,
  AUTHORIZE_URL,
  REDIRECT_URL_AFTER_LOGIN,
  REACT_APP_SCOPES,
} from "data/spotifyAuth";
import styles from "./login.module.css";

const Login: React.FC = (): JSX.Element => {
  // Login Page
  const handleLogin = (): void=> {
    window.location.href = `${AUTHORIZE_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${REACT_APP_SCOPES}&response_type=token&show_dialog=true&state=123`;
  };
  return (
    <div className={styles.login_button}>
      <button type="submit" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;