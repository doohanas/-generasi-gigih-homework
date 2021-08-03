import React from "react";
import "./user.css";

const UserProfile = ({userId}) => {
    return (
      <>
        <div className="userProfile">
          <h2> USER PROFILE</h2>
          <img
            src={userId.images[0].url}
            alt="User Profile"
            className="display_picture"
          />
          <p>{userId.display_name}</p>
        </div>
      </>
    );
}

export default UserProfile