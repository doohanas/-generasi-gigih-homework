/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
  uri: string;
  album: Album;
  name: string;
  artists: Artist[];
}
interface TrackCardProps {
  track: TrackDataProps;
  selectTrackButton: boolean;
  addSelectedTracks: any;
  removeSelectedTracks: any;
}

function TracksCard({
  track,
  selectTrackButton,
  addSelectedTracks,
  removeSelectedTracks,
}: TrackCardProps) {
  const [tracksSelected, setTrackSelected] = useState(selectTrackButton);

  const handleButtonTrack = (): void => {
    setTrackSelected(!tracksSelected);
    if (!tracksSelected) {
      addSelectedTracks(track.uri);
    } else {
      removeSelectedTracks(track.uri);
    }
  };

  let buttonSelect;
  if (!tracksSelected) {
    buttonSelect = (
      <button className={styles.button_tracks} onClick={handleButtonTrack}>
        {" "}
        select{" "}
      </button>
    );
  } else {
    buttonSelect = (
      <button className={styles.button_tracks} onClick={handleButtonTrack}>
        {" "}
        Deselect{" "}
      </button>
    );
  }

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
      <div className={styles.button_tracks_container}>{buttonSelect};</div>
    </div>
  );
}

export default TracksCard;
