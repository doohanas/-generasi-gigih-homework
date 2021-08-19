const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/";
const REACT_APP_SCOPES = "playlist-modify-private";

export { CLIENT_ID, AUTHORIZE_URL, REDIRECT_URL_AFTER_LOGIN, REACT_APP_SCOPES };