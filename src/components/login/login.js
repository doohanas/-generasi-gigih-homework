import React from "react";
import {
  CLIENT_ID,
  AUTHORIZE_URL,
  REDIRECT_URL_AFTER_LOGIN,
  REACT_APP_SCOPES,
} from "../../data/spotifyAuth";

const Login = () => {
  // Login Page
  const handleLogin = () => {
    window.location = `${AUTHORIZE_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${REACT_APP_SCOPES}&response_type=token&show_dialog=true&state=123`;
  };
  return (
    <div className="login-bar">
      <button type="submit" onClick={handleLogin}>
        Login to spotify
      </button>
    </div>
  );
};

export default Login;
