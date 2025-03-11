import { useState } from "react";
import { useDispatch } from "react-redux";
import { addList } from "../redux/actions";
import "./Trello/css/AddList.css";

const AddList = () => {
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [listTitle, setListTitle] = useState("");

  const handleSubmit = () => {
    if (listTitle.trim()) {
      dispatch(addList(listTitle));
      setListTitle("");
      setShowForm(false);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setListTitle("");
  };

  return (
    <div className={`add-list ${showForm ? "form-open" : ""}`}>
      {showForm ? (
        <div className="add-list-form">
          <input
            type="text"
            className="list-title-input"
            placeholder="Enter list title"
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
            autoFocus
          />
          <div className="form-buttons">
            <button className="add-button" onClick={handleSubmit}>
              Add List
            </button>
            <button className="cancel-button" onClick={toggleForm}>
              x
            </button>
          </div>
        </div>
      ) : (
        <button className="add-list-button" onClick={toggleForm}>
          + Add another list
        </button>
      )}
    </div>
  );
};

export default AddList;
