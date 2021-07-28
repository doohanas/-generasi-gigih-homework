import React, {useState} from "react";
import "./playlist-card.css";
// import data from '../../../data/data';
import Image from '../images/images';
import TitleName from '../songTitle/songTitle';
import Album from '../album/album';
import ArtistName from '../artists/artists';
import Button from '../../button/button';

function TracksCard ({btnState, data, trackSelected, pushToSelectedTracks, deleteFromSelectedTracks }) {
  const [ tracksSelected, setTrackSelected ] = useState(btnState);

  const handleSelectTrack = () => {
    setTrackSelected(!tracksSelected)
    if (!tracksSelected) {
      pushToSelectedTracks(data.uri);
    } else {
      deleteFromSelectedTracks(data.uri);
    }
  }

  let selectBtn
  if(tracksSelected) {
    selectBtn = <Button onClick={handleSelectTrack}>Select</Button>
  } else {
    selectBtn = <Button onClick={handleSelectTrack}>Deselect</Button>
  }

  return (
    <div className="track">
      <div className="track-card" >
        <div className="track-card-image">
            <Image url={data.album.images[1].url} />
        </div>

          <div className="track-card-text">
            <TitleName name={data.album.name} />
            <Album album_type={data.album.album_type} />
            <ArtistName name={data.artists[0].name} />
            {selectBtn }

          </div>
        </div>  
    </div>  
  )
  
};
export default TracksCard;