// GET https://accounts.spotify.com/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09
import React, { useState, useEffect } from "react";
import axios from "axios";
import './login.css';

// http://localhost:3000/#access_token=BQBIGPaKMdgGIytEoxpGP4-v-4-5EfK0o1Mj4WBC05ATFqd1uzlEnE36byPsb2MqRjwgoxNk9JQeZTLtQQbgTlh7OyjkW-VBHQfBYIqsdJJVZ1dxRFc_v-YuUGdQo-sYsQ9yo1arTOLB2cL-mnbA_vQ9bzLBAhTPjr89-nrda_SRe9uWKGElcNMJik12SEo&token_type=Bearer&expires_in=3600

    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const AUTHORIZE_URL = process.env.REACT_APP_AUTHORIZE_URL;
    const REDIRECT_URL_AFTER_LOGIN = process.env.REACT_APP_REDIRECT_URL_AFTER_LOGIN;
    const REACT_APP_SCOPES = 'playlist-modify-private';

function Login() {

    const [ token, setToken ] = useState("");
    const [ data, setData ] = useState([]) ;

    const tokenFromURL = (hash) => {
        const stringAfterHashtag = hash.substring(1);
        const paramsInUrl = stringAfterHashtag.split("&");
        const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
            console.log(currentValue);
            const [key, value] = currentValue.split("=");
            accumulator[key] = value;
            return accumulator;
        }, {});
        return paramsSplitUp;
    };

    const handleLogin = () => {
        window.location = `${AUTHORIZE_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${REACT_APP_SCOPES}&response_type=token&show_dialog=true`;
    };

    useEffect(() => {
        if (window.location.hash) {
        const { access_token, expires_in, token_type } = tokenFromURL(window.location.hash);
        console.log({access_token, expires_in, token_type});
        setToken(access_token);
        }

    }, []);

    function handleGetPlaylist() {
        axios.get("https://api.spotify.com/v1/me/playlists??offset=0&limit=10", { 
            headers: {  
                Authorization: "Bearer " + token,
                Limit: 10, 
            },
        }).then((response) => {
           setData(response.data);
        }).catch((error) => {
            console.log(error);
        });
    };
     console.log(data);
    return (
        <div>
        <div className="login-bar">
            <button type="submit" onClick={() => {handleLogin()} }> Login to spotify</button>
        </div>

        <div className="search-bar">
            <input className="search-input" type="text" placeholder="Input text"></input>
            <button className="search-input">Search</button>
            <button className="playlist-btn" onClick={() => {handleGetPlaylist()} }> Get Playlist </button>
        </div>
            
       </div>
    )
    };

export default Login;