# MUSIC - CREATE PLAYLIST

This is my Final Project Submission in [#GenerasiGIGIH](https://sites.google.com/anakbangsabisa.org/generasigigih-landingpage/home?authuser=1).

## PROBLEMS

```
The main problem in this app is how to create new playlist in spotify by using API Spotify.
```
The list challanges:

- [x] How to create connection to Api Spotify
- [x] How to get accessToken from Api Soptify
- [x] How to get userProfile from Api Spotify
- [x] How to search music
- [x] How to create new playlist after selected our favorite music
## FEATURES

- Feature Login, use user account developers spotify
- Feature search music
- Feature create new playlist
- Feature logout 
- Feature show user profile (image and user name)

## Built using

- [Create React App](https://create-react-app.dev/) to initialize the project.
- Written in [typescript](https://typescriptlang.org) and javascript.
- [Jest](https://jestjs.io/) and [react testing-library](https://testing-library.com/) for testing.
- [React redux](https://react-redux.js.org/) for state management.
- [Vercel](https://vercel.com/) for the hosting in this project.


## How to setup environment variables to run this project

To run this project, you have to add the following environtment variables to you .env file.
- Create `.env` file,
- Update your `.env` file as your local configs :

```
    REACT_APP_CLIENT_ID = {Your client id in account developer spotify}
    REACT_APP_REDIRECT_URL_AFTER_LOGIN  = {http://localhost:3000/}, for flow callback.
```

## Run the app

You can run this project: 

### `npm start`

Run the app in the development mode. 
open [http://localhost:3000](http://localhost:3000) to view the app in browser.

### `npm run test`

Launches the test runner mode.