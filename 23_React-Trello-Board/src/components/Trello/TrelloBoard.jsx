import { useSelector } from "react-redux";
import TrelloList from "./TrelloList";
import "./css/TrelloBoard.css";

const TrelloBoard = () => {
  const lists = useSelector((state) => state.lists);
  return (
    <div className="trello-board">
      <div className="lists-container">
        {lists.map((list) => (
          <TrelloList key={list.id} list={list} />
        ))}
        {/* TODO: Implement AddList */}
        <div className="add-list-placeholder">+ Add another list</div>
      </div>
    </div>
  );
};

export default TrelloBoard;
