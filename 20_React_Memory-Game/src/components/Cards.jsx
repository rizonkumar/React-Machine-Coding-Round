const Card = ({ number, isFlipped, onClick }) => (
  <div className="cards" onClick={onClick}>
    {isFlipped ? number : "?"}
  </div>
);

export default Card;
