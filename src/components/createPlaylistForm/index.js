import React from "react";
import PropTypes from "prop-types";
import styles from "./form.module.css";

const NewPlaylist = ({
  submitNewPlaylistForm,
  getTitleValue,
  getDescriptionValue,
  handleCreateNewPlaylist,
}) => {
  return (
    <div className={styles.container_newPlaylist}>
      <form id={styles.formCreatePlaylist} onSubmit={submitNewPlaylistForm}>
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
        <div className={styles.create_button}>
          <button
            className={styles.create_button_playlist}
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

NewPlaylist.propTypes = {
  submitNewPlaylistForm: PropTypes.any.isRequired,
  getTitleValue: PropTypes.any.isRequired,
  getDescriptionValue: PropTypes.any.isRequired,
  handleCreateNewPlaylist: PropTypes.any.isRequired,
};

export default NewPlaylist;
