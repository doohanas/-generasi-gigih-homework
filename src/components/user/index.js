const UserProfile = ({userData}) => {
    return (
        <>
            <div>
                <img src={userData.images[0].url} alt="User Profile" className="display_picture"/>
                <p>{userData.display_name}</p>
            </div>
        </>
    )
}

export default UserProfile