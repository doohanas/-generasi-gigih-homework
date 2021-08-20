import React from "react";
import styles from "./homepage.module.css";
import photo from "assets/musicPlayer.jpg";

const Homepage: React.FC = (): JSX.Element => {
  return (
    <>
      <div className={styles.homepage}>
        <div className={styles.homepage_content}>
          <div className={styles.homepage_content_inner}>
            <div className={styles.title}>
              <h1>Welcome to Music App</h1>
            </div>
            <div className={styles.homepage_greet}>
              <p className={styles.greet}>
                Music is a create playlist web application. Please, login use
                your spotify account. Thank you for visiting my Web Application.
                <br />
                Enjoy.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.homepage_outer_img}>
          <div className={styles.homepage_img}>
            <img src={photo} alt="music photo" width="800px" height="400px" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
