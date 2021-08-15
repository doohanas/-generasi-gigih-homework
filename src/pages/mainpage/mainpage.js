/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTokenAction, selectToken } from "redux/token/sliceToken";
import { CLIENT_ID } from "data/spotifyAuth";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import axios from "axios";

import NewPlaylist from "components/createPlaylistForm/playlist";
import TracksCard from "components/tracks/tracks";
import SearchData from "components/searchInput/searchBar";
import UserProfile from "components/user";

import styles from "./mainpage.module.css";

const Mainpage = () => {
  const [dataTrack, setDataTrack] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [userID, setUserID] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTrack, setSelectedTrack] = useState([]);
  const [newPlaylist, setNewPlaylist] = useState();

  const accessToken = useSelector(selectToken);
  const dispatch = useDispatch();

  const tokenFromURL = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
      const [key, value] = currentValue.split("=");
      accumulator[key] = value;
      return accumulator;
    }, {});

    return paramsSplitUp;
  };

  const handleSearchPlaylist = async () => {
    await axios
      .get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        params: {
          api_key: CLIENT_ID,
          q: keyword,
          type: "track",
          limit: 15,
        },
      })
      .then((response) => {
        setDataTrack(response.data.tracks.items);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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

  const handleAddTrackToPlaylist = async (playlist_id) => {
    try {
      await axios.post(
        `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
        {
          uris: selectedTrack,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateNewPlaylist = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `https://api.spotify.com/v1/users/${userID.id}/playlists`,
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
      );
      setNewPlaylist(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSelectTrackButton = (uri) => {
    let statusState = false;
    for (let i = 0; i < selectedTrack.length; i++) {
      if (selectedTrack[i] == uri) {
        statusState = true;
      }
    }
    return statusState;
  };

  const addSelectedTracks = (uri) => {
    const listTracks = selectedTrack;
    listTracks.push(uri);
    setSelectedTrack(listTracks);
  };

  const removeSelectedTracks = (uri) => {
    const listTracks = selectedTrack;
    for (let i = 0; i < selectedTrack.length; i++) {
      if (selectedTrack[i] === uri) {
        listTracks.splice(i, 1);
      }
    }
    setSelectedTrack(listTracks);
  };

  const getTitleValue = (event) => {
    setTitle(event.target.value);
  };

  const getDescriptionValue = (event) => {
    setDescription(event.target.value);
  };

  const handleSetSearchPlaylist = (event) => {
    setKeyword(event.target.value);
  };

  const handleSubmitTracksForm = (event) => {
    event.preventDefault();
    handleSearchPlaylist();
  };

  const showUserProfile = () => {
    return userID ? <UserProfile userId={userID} /> : null;
  };

  const showTrackPage = () => {
    if (accessToken) {
      const renderTrackPage = (
        <>
          <div className={styles.main_content}>
            <div className={styles.sidebar}>
              {showUserProfile()}
              <NewPlaylist
                handleCreateNewPlaylist={handleCreateNewPlaylist}
                getTitleValue={getTitleValue}
                getDescriptionValue={getDescriptionValue}
              />
            </div>
            <div className={styles.tracks_content}>
              <SearchData
                onSubmit={handleSubmitTracksForm}
                onChange={handleSetSearchPlaylist}
                onClick={handleSearchPlaylist}
                placeholder="Search..."
              />
              <div className={styles.tracks}>
                {dataTrack !== null &&
                  dataTrack.map((track) => {
                    const selectTrackButton = getSelectTrackButton(track.uri);
                    return (
                      <TracksCard
                        key={track.id}
                        track={track}
                        selectTrackButton={selectTrackButton}
                        addSelectedTracks={addSelectedTracks}
                        removeSelectedTracks={removeSelectedTracks}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </>
      );
      return renderTrackPage;
    }
  };

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = tokenFromURL(
        window.location.hash
      );
      dispatch(getTokenAction.getToken(access_token));

      localStorage.clear();

      localStorage.setItem("ACCESS_TOKEN", access_token);
      localStorage.setItem("EXPIRES_IN", expires_in);
      localStorage.setItem("TOKEN_TYPE", token_type);
    }
    if (accessToken) {
      handleGetUserId();
    }
    if (newPlaylist) {
      handleAddTrackToPlaylist(newPlaylist.id);
    }
  }, [accessToken, newPlaylist]);

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
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Mainpage;
