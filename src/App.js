import React, { useState, useEffect } from "react";
import { CLIENT_ID, AUTHORIZE_URL, REDIRECT_URL_AFTER_LOGIN, REACT_APP_SCOPES } from './data/spotifyAuth'
import axios from "axios";

import "./components/button/button.css";
import "./components/playlist/playlist-card/playlist-card.css";
import "./login.css";
import './App.css';

import Header from "./components/header/header";
import NewPlaylist from "./components/forms";
import TracksCard from "./components/playlist/playlist-card";
import SearchData from "./components/searchInput";
import UserProfile from "./components/user";

function App() { 
  const [ data, setData ] = useState([]);
  const [ userData, setUserData ] =useState();
  const [ token, setToken ] = useState("");
  const [ keyword, setKeyword] = useState('');
  const [ trackSelected, SetTrackSelected ] = useState(false);
  const [ selectedTracks, setSelectedTracks ] = useState([]);
  const [ myPlaylistData, setMyPlaylistData ] = useState();
  const [ newPlaylistForm, setNewPlaylistForm] = useState({
    playlistTitle: " ",
    playlistDescription: " "
  });

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

  const hadleSearchPlaylist = async () => {
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
                limit: 12
               
            },
        }).then((response) => {
           setData(response.data.tracks.items);
        }).catch((error) => {
            console.log(error);
        });
  };

  const handleGetProfileUse = async () => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/users", {
        header: {
          "Authorization" : `Bearer ${token}`,
          "Accept" : "application/json",
          "Content-Type" : "application/json"
        }    
      })
      setUserData(response.data)
    }
    catch(error) {
      console.error(error);
    }
  };

    const handleAppendTracksToPlaylist = async (playlist_id) => {
    try {
      await axios({
        method : "post",
        url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
        data: {
          uris: selectedTracks
        },
        headers: {
          'Authorization': `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      })
    }
    catch (err) {
      console.error(err)
    }
  }

  const handleCreatePlaylist = async () => {
    try{
      const response = await axios.post("https://api.spotify.com/v1/users/doohanas/playlists", {
      data : {
        name: newPlaylistForm.playlistTitle,
        description: newPlaylistForm.playlistDescription,
        public: false,
        collaborative: false
      },
        headers: {
          "Authorization" : `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      })
      setMyPlaylistData(response.data)
      handleAppendTracksToPlaylist(myPlaylistData.data)
    }
    catch(error) {
      console.error(error)
    }
  };

  const handleSubmitNewPlaylistForm = e => {
    e.preventDefault();
    handleCreatePlaylist();
  }

  const handleChangeNewPlaylistInput = e => {
    setNewPlaylistForm({...newPlaylistForm, [e.target.name]: e.target.value })
  };

  const handleSetSearchPlaylist = (event) => {
      setKeyword(event.target.value)
  };

  // const addSelectedTrackToList = (uri) => {
  //   const selectedItem = uri;
  //   setSelectedTracks([...selectedTracks, selectedItem])
  // };

  const getSelectTrackButtonState = (uri) => {
    let status = false;
    for(let i = 0; i < selectedTracks.length; i++) {
      if(selectedTracks[i] === uri) {
        status = true;
      }
    }
    return status;
  };

  const pushToSelectedTracks = (uri) => {
    const currentList = selectedTracks;
    currentList.push(uri);
    setSelectedTracks(currentList);
  }

  const deleteFromSelectedTracks = (uri) => {
    const currentList = selectedTracks;
    for(let i = 0; i < selectedTracks.length; i++) {
      if(selectedTracks[i] === uri) {
        currentList.splice(i, 1);
      }
    }
    setSelectedTracks(currentList);
  };

  const showUserProfile = () => {
    return userData ? <UserProfile userData={userData} /> : null;
  };

  const showTrackPage = () => {
    if(token) {
      let renderTrackPage = (
      <div>

        <div>
          {showUserProfile()}
        </div>

        <NewPlaylist 
          handleSubmitNewPlaylistForm={handleSubmitNewPlaylistForm}
          handleChangeNewPlaylistInput={handleChangeNewPlaylistInput}
          newPlaylistForm={newPlaylistForm}
        />

        <div className="search-bar">
            <SearchData 
              onChange={handleSetSearchPlaylist}
              onClick={hadleSearchPlaylist}
              placeholder="Search Tracks"
            />
        </div>

        <div className="tracks">
       
        {data && data.map((track) => { 
          const btnState = getSelectTrackButtonState(track.uri)
          return (
          <TracksCard 
            key={track.id}
            data={track}
            btnState={btnState}
            trackSelected={trackSelected}
            pushToSelectedTracks={pushToSelectedTracks}
            deleteFromSelectedTracks={deleteFromSelectedTracks}
          />
          )
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
  };

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = tokenFromURL(window.location.hash);
      console.log({access_token, expires_in, token_type});
      setToken(access_token);
    } if(token) {
      handleGetProfileUse()
    }
  }, [token]);

  // console.log(data);
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