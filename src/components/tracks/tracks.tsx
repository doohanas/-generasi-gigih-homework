import { useState } from "react";
import styles from "./tracksCard.module.css";

interface Album {
  images: {
    url: string;
  }[];
  album_type: string;
}
interface Artist {
  name: string;
}
interface TrackDataProps {
  album: Album;
  name: string;
  artists: Artist[];
}
interface TrackCardProps {
  track: TrackDataProps;
}

const TracksCard = ({ track }: TrackCardProps) => {
  const [tracksSelected, setTrackSelected] = useState("Select");

  const handleButtonTrack = () => {
    tracksSelected === "Select"
      ? setTrackSelected("Deselect")
      : setTrackSelected("Select");
  };

  return (
    <div className={styles.track_card}>
      <div className={styles.track_card_image}>
        <img src={track.album.images[2].url} alt="album" />
      </div>

      <div className={styles.track_card_text}>
        <p className={styles.albumName}>Title: {track.name}</p>
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
};

export default TracksCard;
