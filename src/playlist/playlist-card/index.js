import "../playlist-card/playlist-card.css";
import data from '../../data/data';
import Image from '../../playlist/images/images';
import TitleName from '../../playlist/songTitle/songTitle';
import Album from '../../playlist/album/album';
import ArtistName from '../../playlist/artists/artists';
import Button from '../../button/button';

function PlaylistCard () {
  const imageUrls = data.map((img) => { return <Image url={img.album.images[1].url} /> });
  const titleNames = data.map((ttlName) => { return <TitleName name={ttlName.album.name} /> });
  const albums = data.map((albumName) => { return <Album album_type={albumName.album.album_type} /> });
  const artists = data.map((artistName) => { return <ArtistName name={artistName.artists[0].name} /> });
  const buttons = data.map(() => { return <Button /> })
    return(
        <div ClassName="playlist">
            <table>
                <thead>
                <tr>
                    <th>Images</th>
                    <th>Title Name</th>
                    <th>Albums</th>
                    <th>Artists</th>
                    <th>buttons</th>
                </tr>
                </thead>
                <tbody>
                    <td>
                        {imageUrls}
                    </td>
                    <td>
                        {titleNames}
                    </td>
                    <td>
                        {albums}
                    </td>
                    <td>
                        {artists}
                    </td>
                    <td>
                        {buttons}
                    </td>
                </tbody>
            </table>
        </div>
    );
};

export default PlaylistCard;