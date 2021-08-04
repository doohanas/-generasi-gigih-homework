import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTokenAction, selectToken } from "../redux/token/sliceToken";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import axios from "axios";

import Login from "../components/login/login";
import NewPlaylist from "../components/createPlaylistForm";
import TracksCard from "../components/tracks";
import SearchData from "../components/searchInput";
import UserProfile from "../components/user";

import styles from "./homePage.module.css";

const HomePage = () => {
  const [dataTrack, setDataTrack] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [userID, setUserID] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const accessToken = useSelector(selectToken);
  const dispatch = useDispatch();

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

  // Handle search API
  const handleSearchPlaylist = async () => {
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
          limit: 36,
        },
      })
      .then((response) => {
        setDataTrack(response.data.tracks.items);
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

  // console.log(userID);
  const userId = userID.id;
  const handleCreateNewPlaylist = async () => {
    await axios
      .post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          name: title,
          description: description,
          public: false,
          collaborative: false,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //handle submit Form CreatePlaylistForm
  const submitNewPlaylistForm = (event) => {
    event.preventDefault();
    handleCreateNewPlaylist();
  };

  //handle get title value from form
  const getTitleValue = (event) => {
    setTitle(event.target.value);
  };

  // handle get description value from form
  const getDescriptionValue = (event) => {
    setDescription(event.target.value);
  };

  // Handle Search Playlist
  const handleSetSearchPlaylist = (event) => {
    setKeyword(event.target.value);
  };

  // To show user profile
  const showUserProfile = () => {
    return userID ? <UserProfile userId={userID} /> : null;
  };

  // To Show Track Page
  const showTrackPage = () => {
    if (accessToken) {
      let renderTrackPage = (
        <>
          <div className={styles.container_grid}>
            <div className={styles.grid_item_one}>
              {showUserProfile()}
              <NewPlaylist
                submitNewPlaylistForm={submitNewPlaylistForm}
                getTitleValue={getTitleValue}
                getDescriptionValue={getDescriptionValue}
                handleCreateNewPlaylist={handleCreateNewPlaylist}
              />
              {/* <div>
                <h2>Put selected Tracks in here</h2>
              </div> */}
            </div>
            <div className={styles.grid_item_two}>
              <SearchData
                onChange={handleSetSearchPlaylist}
                onClick={handleSearchPlaylist}
                placeholder="Search Tracks"
              />
             <div className={styles.tracks}>
                {dataTrack != null &&
                  dataTrack.map((track) => {
                    return <TracksCard key={track.id} track={track} />;
                  })}
              </div>
            </div>
          </div>
        </>
      );
      return renderTrackPage;
    }
  };

  return (
    <Router>
      <div className="body">
        <Switch>
          <Route exact path="/create-playlist">
            {!accessToken && <Redirect to="/" />}
            {showTrackPage()}
          </Route>
          <Route exact path="/">
            {accessToken && <Redirect to="/create-playlist" />}
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default HomePage;
