import { useEffect, useState } from "react";

function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || [],
  );

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    if (!task.trim()) return; // Prevent empty tasks
    const newTodo = todos.map((todo) => ({ ...todo }));
    newTodo.push({
      value: task,
      isCompleted: false,
      id: new Date().getTime(),
    });
    setTodos(newTodo);
    setTask("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <button onClick={handleAddTask} className="add-button">
          Add Task
        </button>
      </div>
      <div className="todos-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <span
              className={`todo-text ${todo.isCompleted ? "completed" : ""}`}
              onClick={() => handleComplete(todo.id)}
            >
              {todo.value}
            </span>
            <div className="todo-actions">
              <button
                className="action-button complete"
                onClick={() => handleComplete(todo.id)}
                title="Mark as complete"
              >
                ✓
              </button>
              <button
                className="action-button delete"
                onClick={() => handleDelete(todo.id)}
                title="Delete task"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
