import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./tracksCard.module.css";

function TracksCard({ track }) {
  const [tracksSelected, setTrackSelected] = useState("Select");

  const handleButtonTrack = () => {
    tracksSelected === "Select"
      ? setTrackSelected("Deselect")
      : setTrackSelected("Select");
  };

  return (
      <div className={styles.track_card}>
        <div className={styles.track_card_image}>
          <img src={track.album.images[2].url} alt={`${track.songTitle}`} />
        </div>

        <div className={styles.track_card_text}>
          <p className={styles.albumName}>Title: {track.album.name}</p>
          <p className={styles.albumType}>Album: {track.album.album_type}</p>
          <p className={styles.artist}>Artist: {track.artists[0].name}</p>
        </div>
        <div className={styles.button_tracks_container}>
          <button className={styles.button_tracks} onClick={handleButtonTrack}>
            {tracksSelected}
          </button>
        </div>
      </div>
  );
}

TracksCard.propTypes = {
  track: PropTypes.any.isRequired,
};

export default TracksCard;
