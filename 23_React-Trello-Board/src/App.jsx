import React from "react";
import "./App.css";
import TrelloBoard from "./components/Trello/TrelloBoard";

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Trello Clone</h1>
      </header>
      <TrelloBoard />
    </div>
  );
};

export default App;
