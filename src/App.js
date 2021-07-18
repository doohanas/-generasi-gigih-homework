import './App.css';
import Header from './header/header';
import PlaylistCard from './playlist/playlist-card';

function App() { 
  return (
    <div className="App">
        <Header/>
        <div className="body">
          <PlaylistCard />
        </div> 
    </div>
  );
};

export default App;