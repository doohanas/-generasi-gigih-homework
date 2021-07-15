import './App.css';
import data from './data/data';
import Image from './images/images';
import TitleName from './songTitle/songTitle';
import Album from './album/album';
import ArtistName from './artists/artists';
import Button from './button/button';

function App() {
  return (
    <div className="App">
      <h1> My Playlist </h1>
      <div className="Playlist">
        <div className="Playlist-Card">
          <Image url={data.album.images[1].url} />
          <TitleName name={data.album.name} />
          <Album album_type={data.album.album_type} />
          <ArtistName name={data.artists[0].name} />
         <Button />
        </div>
      </div>
    </div>
  );
};

export default App;