/* eslint-disable no-undef */
import React from "react";
import { screen, render } from "@testing-library/react";
import TracksCard from "./tracks";

test("render input query", () => {
  render(<TracksCard />);
  //const image = screen.getByTestId("image");
  screen.debug();
  // expect(image).toBeInTheDocument();
});
// test("render search button", () => {
//   render(<TracksCard />);
//   const searchButton = screen.getByTestId("buttonSearch");
//   expect(searchButton).toBeInTheDocument();
// });
