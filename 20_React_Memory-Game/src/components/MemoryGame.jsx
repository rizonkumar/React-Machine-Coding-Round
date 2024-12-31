import React from "react";
import { useGameLogic } from "../hooks/useGameLogic";
import Card from "./Cards";

const MemoryGame = () => {
  const { cards, handleCardClick } = useGameLogic();

  return (
    <div>
      <h1>Memory Game</h1>
      <div className="grid-container">
        {cards.map(({ id, number, isFlipped }) => (
          <Card
            key={id}
            number={number}
            isFlipped={isFlipped}
            onClick={() => handleCardClick(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
