import React, { useState, useEffect } from "react";
import { CLIENT_ID, AUTHORIZE_URL, REDIRECT_URL_AFTER_LOGIN, REACT_APP_SCOPES } from './data/spotifyAuth'
import axios from "axios";

import './components/button/button.css';
import "./components/playlist/playlist-card/playlist-card.css";
import "./login.css"
import './App.css';

import Header from "./components/header/header";
import Image from "./components/playlist/images/images";
import TitleName from './components/playlist/songTitle/songTitle';
import Album from './components/playlist/album/album';
import ArtistName from './components/playlist/artists/artists';
import Button from './components/button/button';

function App() { 
  const [ data, setData ] = useState([]);
  const [ token, setToken ] = useState("");
  const [ keyword, setKeyword] = useState('');
  
  const tokenFromURL = (hash) => {
      const stringAfterHashtag = hash.substring(1);
      const paramsInUrl = stringAfterHashtag.split("&");
      const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
      // console.log(currentValue);
      const [key, value] = currentValue.split("=");
        accumulator[key] = value;
        return accumulator;
      }, {});

      return paramsSplitUp;
  };
  
  const handleLogin = () => {
       window.location = `${AUTHORIZE_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${REACT_APP_SCOPES}&response_type=token&show_dialog=true&state=123`;
   };

  async function hadleSearchPlaylist() {
      await axios.get("https://api.spotify.com/v1/search", { 
            headers: {  
                'Authorization': `Bearer ${token}`,
                'Accept': "application/json",
                'Content-Type': "application/json", 
            },
            params: {
                api_key: process.env.REACT_APP_CLIENT_ID,
                q: keyword,
                type: "track",
               
            },
        }).then((response) => {
           setData(response.data.tracks.items);
        }).catch((error) => {
            console.log(error);
        });
    };
  
  const handleSetSearchPlaylist = (event) => {
        setKeyword(hadleSearchPlaylist(event.target.value))
  }

  const showTrackPage = () => {
    if(token) {
      let renderTrackPage = (
      <div>

        <div className="search-bar">
            <input className="search-input" onChange={handleSetSearchPlaylist} type="text" placeholder="Input text"></input>
            <button className="search-input" onClick={hadleSearchPlaylist}>Search</button>
        </div>

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

      </div> 
      )
      return renderTrackPage
    }
  }

  const loginButton = () => {
    if(!token) { 
      return (
        <div className="login-bar">
         <button type="submit" onClick={handleLogin}> Login to spotify</button>
        </div>
      )  
    }
  }

  useEffect(() => {
      if (window.location.hash) {
        const { access_token, expires_in, token_type } = tokenFromURL(window.location.hash);
        console.log({access_token, expires_in, token_type});
        setToken(access_token);
      }
    }, [token]);

  // console.log(data)
  return (
    <div className="App">
      <Header />
        <div className="body">
          {loginButton()}     
          {showTrackPage()}
        </div> 
    </div>
  );
};

export default App;