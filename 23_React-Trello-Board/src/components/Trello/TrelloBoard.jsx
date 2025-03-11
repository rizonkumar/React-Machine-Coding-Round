import { useSelector } from "react-redux";
import TrelloList from "./TrelloList";
import "./css/TrelloBoard.css";
import AddList from "../AddList";
import { useDispatch } from "react-redux";
import { moveCard } from "../../redux/actions";
import { DragDropContext } from "react-beautiful-dnd";

const TrelloBoard = () => {
  const lists = useSelector((state) => state.lists);
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return; // dropped outside the list

    // if dropped in the same list
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // handle the card movement in the store
    dispatch(
      moveCard(
        draggableId,
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index
      )
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="trello-board">
        <div className="lists-container">
          {lists.map((list) => (
            <TrelloList key={list.id} list={list} />
          ))}
          <AddList />.
        </div>
      </div>
    </DragDropContext>
  );
};

export default TrelloBoard;
