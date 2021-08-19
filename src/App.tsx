import React from "react";
import Header from "components/header/header";
import Mainpage from "pages/mainpage/mainpage";

import "./App.css";

const App: React.FC = (): JSX.Element => {
  return (
    <div className="App">
      <Header />
      <Mainpage />
    </div>
  );
}

export default App;
