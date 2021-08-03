import React from "react";
import PropTypes from "prop-types";
import "./user.css";

const UserProfile = ({ userId }) => {
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
};

UserProfile.propTypes = {
  userId: PropTypes.node.isRequired,
};

export default UserProfile;
