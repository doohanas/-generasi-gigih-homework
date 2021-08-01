import React from "react";

const Login = ({handleLogin}) => {
    return (
       <div className="login-bar">
          <button type="submit" onClick={handleLogin}>
            Login to spotify
          </button>
        </div>
    )
};

export default Login;