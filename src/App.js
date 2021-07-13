import './App.css';
import data from './data/data';

function App() {
  return (
    <div className="App">
      <h1>My Playlist</h1>
      <div className="container-playlist">
        <img src={data.album.images[1].url} alt="Queen"></img>
        <p id="playlist-title">{data.album.name}</p> 
        <p id="playlist-artist">{data.album.artists[0].name}</p> 
        <p id="playlist-album">{data.album.album_type}</p>
        <button id="playlist-btn" type="button">Select</button>
        </div>
     </div>
  );
}

export default App;
