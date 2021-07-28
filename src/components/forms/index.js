import "../button/button.css";

const NewPlaylist = ({handleSubmitNewPlaylist,handleChangeNewPlaylistInput, playlistForm }) => {
    return(
       <div className="newPlaylist-form">
           <form id="form" className="" onSubmit={handleSubmitNewPlaylist}>
               <h2>Create New Playlist</h2>
                <label htmlFor="playlistTitle">Title</label>
                <input 
                name="playlistTitle"
                type="text"
                minLength="10"
                onChange={handleChangeNewPlaylistInput}
                />
                <br/><br/>
                <label htmlFor="playlistDescription">Description</label>
                <input 
                name="playlistDescription"
                type="text"
                minLength="20"             
                onChange={handleChangeNewPlaylistInput}
                />
               <div>
                   <br/>
                   <button className="btn" type="submit">Submit</button>
               </div>
           </form>
       </div>     
    )
};

export default NewPlaylist