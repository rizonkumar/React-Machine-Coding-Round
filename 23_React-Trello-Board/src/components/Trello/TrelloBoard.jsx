import TrelloList from "./TrelloList";
import "./css/TrelloBoard.css";

const TrelloBoard = () => {
  const lists = []; // TODO: Connect to redux
  return (
    <div className="trello-board">
      <div className="lists-container">
        {lists.map((list) => (
          <TrelloList key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
};

export default TrelloBoard;
