import React from "react";
import "../button/button.css";
import "./form.css";

const NewPlaylist = ({
  submitNewPlaylistForm,
  getTitleValue,
  getDescriptionValue,
  handleCreateNewPlaylist
}) => {
  return (
    <div className="container-newPlaylist">
      <form id="formCreatePlaylist" onSubmit={submitNewPlaylistForm}>
        <h2>Create New Playlist</h2>
        <label htmlFor="playlistTitle">Title: </label>
        <input
          name="playlistTitle"
          onChange={getTitleValue}
          type="text"
          minLength="10"
          required
        />
        <label htmlFor="playlistDescription">Description: </label>
        <input
          name="playlistDescription"
          onChange={getDescriptionValue}
          type="text"
          minLength="20"
          required
        />
        <div className="create-button">
          <button
            className="btn"
            onClick={handleCreateNewPlaylist}
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPlaylist;
