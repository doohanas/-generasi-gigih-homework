import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTokenAction, selectToken } from "./redux/token/sliceToken";
import {
  CLIENT_ID,
  AUTHORIZE_URL,
  REDIRECT_URL_AFTER_LOGIN,
  REACT_APP_SCOPES,
} from "./data/spotifyAuth";
import axios from "axios";

import "./components/button/button.css";
import "./components/tracks/playlist-card.css";
import "./login.css";
import "./App.css";

import Login from "./components/login/login";
import NewPlaylist from "./components/createPlaylistForm";
import TracksCard from "./components/tracks";
import SearchData from "./components/searchInput";
import UserProfile from "./components/user";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [userID, setUserID] = useState("");
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const accessToken = useSelector(selectToken);
  const dispatch = useDispatch();

  // authentication page
  const handleLogin = () => {
    window.location = `${AUTHORIZE_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${REACT_APP_SCOPES}&response_type=token&show_dialog=true&state=123`;
  };

  // Login Page
  const loginButton = () => {
    if (!accessToken) {
      return <Login handleLogin={handleLogin} />;
    }
  };

  // Get Token
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
  console.log(accessToken);

  // Handle search API
  const hadleSearchPlaylist = async () => {
    await axios
      .get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        params: {
          api_key: process.env.REACT_APP_CLIENT_ID,
          q: keyword,
          type: "track",
          limit: 12,
        },
      })
      .then((response) => {
        setData(response.data.tracks.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle get user API
  const handleGetUserId = async () => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setUserID(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle Search Playlist
  const handleSetSearchPlaylist = (event) => {
    setKeyword(event.target.value);
  };

  //handle create playlist
  console.log(userID);
  const handleCreatePlaylist = async () => {
    const userId = userID.id;
    try {
      await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        data: {
          name: title,
          description: description,
          public: false,
          collaborative: false,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  // handle submit playlist form
  const handleSubmitNewPlaylistForm = (e) => {
    e.preventDefault();
    handleCreatePlaylist();
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  // get uri to push tracks in a playlist
  const pushToSelectedTracks = (uri) => {
    const currentTracks = selectedTracks;
    currentTracks.push(uri);
    setSelectedTracks(currentTracks);
  };

  // delete selected track
  const deleteFromSelectedTracks = (uri) => {
    const currentTracks = selectedTracks;
    for (let i = 0; i < selectedTracks.length; i++) {
      if (currentTracks[i] === uri) {
        currentTracks.splice(i, 1);
      }
    }
    setSelectedTracks(currentTracks);
  };

  // Select track button state
  const getSelectTrackButtonState = (uri) => {
    let status = false;
    for (let i = 0; i < selectedTracks.length; i++) {
      if (selectedTracks[i] === uri) {
        status = true;
      }
    }
    return status;
  };

  // To show user profile
  const showUserProfile = () => {
    return userID ? <UserProfile userId={userID} /> : null;
  };
  //console.log(userID);

  // To Show Track Page
  const showTrackPage = () => {
    if (accessToken) {
      let renderTrackPage = (
        <div>
          <div>{showUserProfile()}</div>
          <NewPlaylist
            handleSubmitNewPlaylistForm={handleSubmitNewPlaylistForm}
            handleTitle={handleTitle}
            handleDescription={handleDescription}
            handleCreatePlaylist={handleCreatePlaylist}
          />
          <br /> <br />
          <div>
            <h2>Put selected Tracks in here</h2>
          </div>
          <div className="search-bar">
            <SearchData
              onChange={handleSetSearchPlaylist}
              onClick={hadleSearchPlaylist}
              placeholder="Search Tracks"
            />
          </div>
          <div className="tracks">
            {data !== null &&
              data.map((track) => {
                const buttonState = getSelectTrackButtonState(track.uri);
                return (
                  <TracksCard
                    key={track.id}
                    data={track}
                    uri={track.uri}
                    buttonState={buttonState}
                    pushToSelectedTracks={pushToSelectedTracks}
                    deleteFromSelectedTracks={deleteFromSelectedTracks}
                  />
                );
              })}
            ;
          </div>
        </div>
      );
      return renderTrackPage;
    }
  };

  // To set token from URL into accessToken state
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = tokenFromURL(
        window.location.hash
      );
      console.log({ access_token, expires_in, token_type });
      dispatch(getTokenAction.getToken(access_token));
    }
    if (accessToken) {
      handleGetUserId();
    }
  }, [accessToken]);

  return (
    <>
      <div className="body">
        {loginButton()}
        {showTrackPage()}
      </div>
    </>
  );
};

export default HomePage;
