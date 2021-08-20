import React from "react";
import { useSelector } from "react-redux";
import { selectToken } from "redux/token/sliceToken";

import Header from "components/header/header";
import Mainpage from "pages/mainpage/mainpage";
import Homepage from "pages/homepage/homepage";

import "./App.css";

const App: React.FC = (): JSX.Element => {
  const accessToken = useSelector(selectToken);
  return (
    <div className="App">
      <Header />
      {!accessToken && <Homepage />}
      <Mainpage />
    </div>
  );
};

export default App;
