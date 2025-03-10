import "./css/TrelloCard.css";

const TrelloCard = ({ card }) => {
  return (
    <div className="trello-card" id={card.id}>
      <div className="card-content">{card?.content}</div>
    </div>
  );
};

export default TrelloCard;
