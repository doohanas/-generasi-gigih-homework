import React from "react";
import PropTypes from "prop-types";
import styles from "./user.module.css";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const UserProfile = ({ userId }) => {
  return (
    <>
      <div className={styles.userProfile}>
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
  userId: PropTypes.any.isRequired,
};

export default UserProfile;
