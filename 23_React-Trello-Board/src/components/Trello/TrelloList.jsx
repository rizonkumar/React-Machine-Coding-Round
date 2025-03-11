import { useDispatch } from "react-redux";
import "./css/TrelloList.css";
import { useState } from "react";
import TrelloCard from "./TrelloCard";
import { addCard } from "../../redux/actions";
import ListActions from "../ListActions";

const TrelloList = ({ list }) => {
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [cardContent, setCardContent] = useState("");
  const [showActions, setShowActions] = useState(false);

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

      <div className="cards-container">
        {list?.cards?.map((card) => (
          <TrelloCard key={card.id} card={card} />
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
