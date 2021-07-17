import './App.css';
import Header from './header/header';
import PlaylistCard from './playlist/playlist-card';

function App() {
   
  return (
    <div className="App">
        <Header/>

        {/* {imageUrls};
          {titleNames};
          {albums};
          {artists};
          {buttons}; */}
          <PlaylistCard />
    </div>
  );
};

export default App;