import "./App.css";
import React from "react";
import Header from "./components/header/header";
import HomePage from "./pages/homePage";

function App() {
  return (
    <div className="App">
      <Header />
      <HomePage />
    </div>
  );
}

export default App;
