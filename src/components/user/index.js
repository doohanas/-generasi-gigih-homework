import "./user.css";

const UserProfile = ({userId}) => {
    return (
      <>
        <div className="userProfile">
          <h1> USER PROFILE</h1>
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