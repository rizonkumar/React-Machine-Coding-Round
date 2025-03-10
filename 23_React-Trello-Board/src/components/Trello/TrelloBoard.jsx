import { useSelector } from "react-redux";
import TrelloList from "./TrelloList";
import "./css/TrelloBoard.css";
import AddList from "../AddList";

const TrelloBoard = () => {
  const lists = useSelector((state) => state.lists);

  return (
    <div className="trello-board">
      <div className="lists-container">
        {lists.map((list) => (
          <TrelloList key={list.id} list={list} />
        ))}
        <AddList />.
      </div>
    </div>
  );
};

export default TrelloBoard;
