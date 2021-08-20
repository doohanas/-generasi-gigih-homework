import styles from "./playlistForm.module.css";

interface NewPlaylistProps {
  getTitleValue: () => string;
  getDescriptionValue: () => string;
  handleCreateNewPlaylist: () => string;
}

const NewPlaylist: React.FC<NewPlaylistProps> = ({
  getTitleValue,
  getDescriptionValue,
  handleCreateNewPlaylist,
}): JSX.Element => {
  return (
    <div className={styles.container_newPlaylist}>
      <h3>Playlist</h3>
      <form id={styles.form_createPlaylist} onSubmit={handleCreateNewPlaylist}>
        <div className={styles.button_newPlaylist}>
          <button className={styles.playlist_button} type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 20 20"
              height="24px"
              viewBox="0 0 20 20"
              width="24px"
              fill="#000000"
            >
              <g>
                <rect fill="none" height="20" width="20" />
              </g>
              <g>
                <g>
                  <rect height="1.5" width="9" x="3" y="5" />
                  <rect height="1.5" width="6" x="3" y="11.25" />
                  <rect height="1.5" width="9" x="3" y="8.12" />
                  <polygon points="14.75,11.25 14.75,8 13.25,8 13.25,11.25 10,11.25 10,12.75 13.25,12.75 13.25,16 14.75,16 14.75,12.75 18,12.75 18,11.25" />
                </g>
              </g>
            </svg>
          </button>
        </div>
        <div className={styles.newPlaylist_input}>
          <label htmlFor="playlistTitle"></label>
          <input
            id={styles.playlist_title}
            name="playlistTitle"
            onChange={getTitleValue}
            placeholder="Title..."
            type="text"
            minLength={10}
            required
          />
          <label htmlFor="playlistDescription"></label>
          <input
            id={styles.playlist_description}
            name="playlistDescription"
            onChange={getDescriptionValue}
            placeholder="Description..."
            type="text"
            minLength={20}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default NewPlaylist;
