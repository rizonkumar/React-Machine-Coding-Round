import { useDispatch } from "react-redux";
import "./css/TrelloList.css";
import { useState } from "react";
import TrelloCard from "./TrelloCard";
import { addCard, moveCard } from "../../redux/actions";
import ListActions from "../ListActions";
import { useDrop } from "react-dnd";

const ItemTypes = {
  CARD: "card",
};

const TrelloList = ({ list }) => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [cardContent, setCardContent] = useState("");
  const [showActions, setShowActions] = useState(false);

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      const dragIndex = item.index;
      const dragListId = item.listId;
      const hoverIndex = list.cards.length;
      const hoverListId = list.id;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex && dragListId === hoverListId) {
        return;
      }

      // Time to actually perform the action
      dispatch(
        moveCard(item.id, dragListId, hoverListId, dragIndex, hoverIndex)
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const toggleActions = () => {
    setShowActions(!showActions);
  };

  const handleAddCard = () => {
    if (cardContent.trim()) {
      dispatch(addCard(list.id, cardContent));
      setCardContent("");
      setShowForm(false);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setCardContent("");
  };

  const closeActions = () => {
    setShowActions(false);
  };

  return (
    <div className="trello-list">
      <div className="list-header">
        <h2 className="list-title">{list?.title}</h2>
        <button className="list-menu-button" onClick={toggleActions}>
          ...
        </button>
        {showActions && <ListActions listId={list.id} onClose={closeActions} />}
      </div>

      <div
        ref={drop}
        className={`cards-container ${isOver ? "dragging-over" : ""}`}
      >
        {list.cards?.map((card, index) => (
          <TrelloCard
            key={card.id}
            card={card}
            index={index}
            listId={list.id}
          />
        ))}
      </div>

      {showForm ? (
        <div className="add-card-form">
          <textarea
            className="card-text-area"
            placeholder="Enter a title for this card"
            value={cardContent}
            onChange={(e) => setCardContent(e.target.value)}
            autoFocus
          />
          <div className="form-buttons">
            <button className="add-button" onClick={handleAddCard}>
              Add Card
            </button>
            <button className="cancel-button" onClick={toggleForm}>
              x
            </button>
          </div>
        </div>
      ) : (
        <button className="add-card-button" onClick={toggleForm}>
          + Add a card
        </button>
      )}
    </div>
  );
};

export default TrelloList;
