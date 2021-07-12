import logo from './logo.svg';
import './App.css';
// import axios from 'axios';

function App() {
  console.log(process.env.REACT_APP_GIPHY);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

// Client ID = 60f93733c8844192821a380b56f57304
// Client Secret ddc58c9a1cdd44028b66ebba97d6abc6
// Redirect URIs http://localhost:8888/callback

// 1. Req Authorization
// GET https://accounts.spotify.com/authorize

