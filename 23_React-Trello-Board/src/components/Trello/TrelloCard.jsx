import React from "react";
import { useDrag } from "react-dnd";
import "./css/TrelloCard.css";

const ItemTypes = {
  CARD: "card",
};

const TrelloCard = ({ card, index, listId }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: {
      id: card.id,
      index,
      listId,
      content: card.content,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`trello-card ${isDragging ? "is-dragging" : ""}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="card-content">{card.content}</div>
    </div>
  );
};

export default TrelloCard;
