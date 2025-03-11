import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import TrelloBoard from "./components/Trello/TrelloBoard";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <header className="app-header">
          <h1>Trello Clone</h1>
        </header>
        <TrelloBoard />
      </div>
    </DndProvider>
  );
};

export default App;
