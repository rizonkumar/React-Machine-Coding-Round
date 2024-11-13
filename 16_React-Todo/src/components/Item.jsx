import { useState } from "react";

function Item({ key, todo, handleComplete, handleDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (e) => {};

  return (
    <div key={key} className="todo-item">
      <span
        className={`todo-text ${todo?.isCompleted ? "completed" : ""}`}
        onClick={() => handleComplete(todo?.id)}
      >
        {todo?.value}
      </span>
      <div className="todo-actions">
        <button
          className="action-button complete"
          onClick={() => handleComplete(todo?.id)}
          title="Mark as complete"
        >
          ✓
        </button>
        <button
          className="action-button delete"
          onClick={() => handleDelete(todo?.id)}
          title="Delete task"
        >
          ×📝
        </button>
        {isEditing && <span>✏️</span>}
        <button
          className="action-button edit"
          onClick={() => handleEdit()}
        ></button>
      </div>
    </div>
  );
}

export default Item;
