import React, {useState} from "react";
import "./playlist-card.css";

function TracksCard ({data, pushToSelectedTracks, deleteFromSelectedTracks }) {
  const [tracksSelected, setTrackSelected] = useState(data.buttonState);
  const handleSelectTrack = () => {
    setTrackSelected(!tracksSelected)
    if (!tracksSelected) {
      pushToSelectedTracks(data.uri);
    } else {
      deleteFromSelectedTracks(data.uri);
    }
  }

  let selectButton
  if(!tracksSelected) {
    selectButton = <button className="btn" onClick={handleSelectTrack}>Select</button>;
  } else {
    selectButton = <button className="btn" onClick={handleSelectTrack}>Deselect</button>;
  }

  return (
    <div className="track">
      <div className="track-card">
        <div className="track-card-image">
          <img src={data.album.images[1].url} alt={`${data.songTitle}`} />
        </div>

        <div className="track-card-text">
          <p className="albumName">Title: {data.album.name}</p>
          <p className="albumType">Type: {data.album.album_type}</p>
          <p className="artist">Artist: {data.artists[0].name}</p>
          {selectButton}
        </div>
      </div>
    </div>
  );
  
};
export default TracksCard;