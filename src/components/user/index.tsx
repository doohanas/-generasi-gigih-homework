import React from "react";
import styles from "./user.module.css";

interface Profile {
  images: {
    url: string;
  }[];
  display_name: string;
}

interface UserProfileProps {
  userId: Profile;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }): JSX.Element => {
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

export default UserProfile;
