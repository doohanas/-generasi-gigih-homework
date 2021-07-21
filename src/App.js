import './App.css';
import Header from './header/header';
import PlaylistCard from './playlist/playlist-card';
import Login from './pages/login';


function App() { 
  return (
    <div className="App">
        <Header/>
        <div className="body">
          {/*  Tampilkan login button  */}
            <Login />
            {/* <PlaylistCard /> */}
        </div> 
    </div>
  );
};

export default App;