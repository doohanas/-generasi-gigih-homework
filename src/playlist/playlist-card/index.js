import "../playlist-card/playlist-card.css";
import data from '../../data/data';
import Image from '../../playlist/images/images';
import TitleName from '../../playlist/songTitle/songTitle';
import Album from '../../playlist/album/album';
import ArtistName from '../../playlist/artists/artists';
import Button from '../../button/button';

function PlaylistCard () {
  return (
    <div className="playlist">
      {data.map((playlist) => { 
        return (
            <div key={playlist.id} className="playlist-card" >

            <div className="playlist-card-image">
              <Image url={playlist.album.images[1].url} />
            </div>

            <div className="playlist-card-text">
              <TitleName name={playlist.album.name} />
              <Album album_type={playlist.album.album_type} />
              <ArtistName name={playlist.artists[0].name} />
              <Button />
            </div>
            
          </div>
        ); 
      })};
    </div>
    
  );
};

export default PlaylistCard;