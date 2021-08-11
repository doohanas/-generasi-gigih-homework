/* eslint-disable no-undef */
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import TracksCard from "./tracks";

const track = {
  uri: "trackUri",
  name: "trackName",
  album: {
    images: [{}, {},
      {
        url: "trackImageUrl",
      },
    ],
    album_type: "trackAlbumType",
  },
  artists: [
    {
      name: "trackArtistName",
    },
  ],
};

test("render image query of track card", () => {
  render(<TracksCard track={track} />);
  // screen.debug();
  const imageAlbum = screen.getByTestId("trackImage");
  expect(imageAlbum).toBeInTheDocument();
});
test("render track title query of track card", () => {
  render(<TracksCard track={track} />);
  // screen.debug();
  const trackTitle = screen.getByTestId("trackTitle");
  expect(trackTitle).toBeInTheDocument();
});
test("render album type query of track card", () => {
  render(<TracksCard track={track} />);
  // screen.debug();
  const albumType = screen.getByTestId("albumType");
  expect(albumType).toBeInTheDocument();
});
test("render artist name query of track card", () => {
  render(<TracksCard track={track} />);
  // screen.debug();
  const trackArtist = screen.getByTestId("trackArtist");
  expect(trackArtist).toBeInTheDocument();
});
