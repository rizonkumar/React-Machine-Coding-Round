import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./css/TrelloCard.css";

const TrelloCard = ({ card, index }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`trello-card ${snapshot.isDragging ? "is-dragging" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="card-content">{card.content}</div>
        </div>
      )}
    </Draggable>
  );
};

export default TrelloCard;
