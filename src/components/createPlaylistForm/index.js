import React from "react";
import "../button/button.css";

const NewPlaylist = ({
  handleSubmitNewPlaylistForm,
  handleCreatePlaylist,
  handleTitle,
  handleDescription,
}) => {
  
  return (
    <div className="newPlaylist-form">
      <form id="form" className="" onSubmit={handleSubmitNewPlaylistForm}>
        <h2>Create New Playlist</h2>
        <label htmlFor="playlistTitle">Title</label>
        <input
          name="playlistTitle"
          type="text"
          minLength="10"
          onChange={handleTitle}
          required
        />
        <br />
        <br />
        <label htmlFor="playlistDescription">Description</label>
        <input
          name="playlistDescription"
          type="text"
          minLength="20"
          onChange={handleDescription}
          required
        />
        <div>
          <br />
          <button onClick={handleCreatePlaylist} className="btn" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPlaylist;
