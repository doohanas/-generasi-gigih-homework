import React, { useState } from "react";
import PropTypes from "prop-types";
import "./playlist-card.css";

function TracksCard({ track }) {
  const [tracksSelected, setTrackSelected] = useState("Select");

  const handleButtonTrack = () => {
    tracksSelected === "Select"
      ? setTrackSelected("Deselect")
      : setTrackSelected("Select");
  };

  return (
    <div className="track">
      <div className="track-card">
        <div className="track-card-image">
          <img src={track.album.images[1].url} alt={`${track.songTitle}`} />
        </div>

        <div className="track-card-text">
          <p className="albumName">Title: {track.album.name}</p>
          <p className="albumType">Type: {track.album.album_type}</p>
          <p className="artist">Artist: {track.artists[0].name}</p>
          <button className="btn" onClick={handleButtonTrack}>
            {tracksSelected}
          </button>
        </div>
      </div>
    </div>
  );
}

TracksCard.propTypes = {
  track: PropTypes.node.isRequired,
};

export default TracksCard;
