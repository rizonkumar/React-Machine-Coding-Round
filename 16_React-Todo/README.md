# Code Notes: Todo List Implementation

## Code Flow

1. **`Todo` Component**:

   - The `Todo` component manages the main todo list functionality.
   - It uses `useState` to manage the current task input (`task`) and the list of todos (`todos`).
   - The `todos` state is initialized from `localStorage` if available, otherwise defaults to an empty array.
   - When todos change, `useEffect` automatically saves them to `localStorage`.
   - The component handles adding, completing, and deleting todos.

2. **`Item` Component**:

   - The `Item` component renders individual todo items.
   - It receives `todo`, `handleComplete`, and `handleDelete` as props.
   - It uses `useState` to manage editing state (though editing functionality is not fully implemented).
   - Each item displays the todo text and action buttons for completing and deleting.

3. **`App` Component**:

   - The `App` component is the root component that renders the `Todo` component.
   - It serves as the entry point for the application.

---

## Key Concepts

### 1. **`useState` Hook**

- **Purpose**: The `useState` hook is used to manage component-level state in functional components.
- **How it works**:
  - `useState("")` initializes the `task` state to an empty string for the input field.
  - `useState(JSON.parse(localStorage.getItem("todos")) || [])` initializes the `todos` state by reading from `localStorage` or defaulting to an empty array.
  - State updates trigger re-renders, updating the UI to reflect changes.

```javascript
const [task, setTask] = useState("");
const [todos, setTodos] = useState(
  JSON.parse(localStorage.getItem("todos")) || []
);
```

---

### 2. **`useEffect` Hook**

- **Purpose**: The `useEffect` hook is used to perform side effects, such as saving data to `localStorage`.
- **How it works**:
  - The effect runs whenever the `todos` array changes (dependency array `[todos]`).
  - It saves the todos to `localStorage` using `JSON.stringify()` to convert the array to a string.
  - This ensures todos persist across page refreshes.

```javascript
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
```

---

### 3. **`localStorage` API**

- **Purpose**: `localStorage` provides persistent storage in the browser, allowing data to survive page refreshes.
- **How it works**:
  - `localStorage.getItem("todos")` retrieves stored todos as a string.
  - `JSON.parse()` converts the string back to a JavaScript array.
  - `localStorage.setItem("todos", JSON.stringify(todos))` saves the todos array as a string.
  - The `|| []` fallback ensures we always have an array, even if `localStorage` is empty.

```javascript
// Reading from localStorage
const [todos, setTodos] = useState(
  JSON.parse(localStorage.getItem("todos")) || []
);

// Writing to localStorage
localStorage.setItem("todos", JSON.stringify(todos));
```

---

### 4. **Array Methods**

#### **`.map()` Method**

- **Purpose**: Creates a new array by transforming each element.
- **Usage in Todo**:
  - Used to create a copy of todos before adding a new one (immutability pattern).
  - Used to render multiple `Item` components from the todos array.

```javascript
// Creating a copy for immutability
const newTodo = todos.map((todo) => ({ ...todo }));

// Rendering items
{todos.map((todo) => (
  <Item key={todo.id} todo={todo} ... />
))}
```

#### **`.filter()` Method**

- **Purpose**: Creates a new array containing only elements that pass a test.
- **Usage in Todo**: Removes a todo by filtering out the one with the matching ID.

```javascript
const handleDelete = (id) => {
  setTodos(todos.filter((todo) => todo.id !== id));
};
```

---

### 5. **Event Handling**

#### **Input Change Handler**

- **Purpose**: Updates the `task` state as the user types.
- **How it works**:
  - `onChange` event fires on every keystroke.
  - `e.target.value` contains the current input value.
  - Updates state, triggering a re-render with the new value.

```javascript
const handleChange = (e) => {
  setTask(e.target.value);
};
```

#### **Keyboard Event Handler**

- **Purpose**: Allows adding todos by pressing Enter key.
- **How it works**:
  - `onKeyDown` event fires when a key is pressed.
  - Checks if the pressed key is "Enter".
  - Calls `handleAddTask()` if Enter is pressed.

```javascript
const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    handleAddTask();
  }
};
```

---

### 6. **Immutability Pattern**

- **Purpose**: React requires state updates to be immutable (creating new objects/arrays instead of mutating existing ones).
- **How it works**:
  - When adding a todo, we create a new array using `.map()` to copy existing todos.
  - When updating a todo, we use `.map()` to create a new array with the updated item.
  - When deleting, we use `.filter()` to create a new array without the deleted item.

```javascript
// Adding a todo (immutable)
const newTodo = todos.map((todo) => ({ ...todo }));
newTodo.push({ value: task, isCompleted: false, id: new Date().getTime() });
setTodos(newTodo);

// Updating a todo (immutable)
setTodos(
  todos.map((todo) =>
    todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
  )
);

// Deleting a todo (immutable)
setTodos(todos.filter((todo) => todo.id !== id));
```

---

### 7. **Unique ID Generation**

- **Purpose**: Each todo needs a unique identifier for React's `key` prop and for operations like delete/update.
- **How it works**:
  - Uses `new Date().getTime()` to generate a timestamp-based unique ID.
  - This ensures each todo has a unique identifier.

```javascript
{
  value: task,
  isCompleted: false,
  id: new Date().getTime(),
}
```

---

### 8. **Conditional Rendering**

- **Purpose**: Display different content based on state or conditions.
- **How it works**:
  - The todo text receives a conditional class based on `isCompleted` status.
  - Empty task validation prevents adding blank todos.

```javascript
// Conditional class
<span className={`todo-text ${todo?.isCompleted ? "completed" : ""}`}>

// Conditional validation
if (!task.trim()) return; // Prevent empty tasks
```

---

## Code Breakdown

### `Todo` Component

```javascript
import { useEffect, useState } from "react";
import Item from "./Item.jsx";

function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    if (!task.trim()) return;
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
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
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
        {todos.map((todo) => {
          return (
            <Item
              key={todo.id}
              todo={todo}
              handleComplete={handleComplete}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Todo;
```

- **State**:
  - `task`: String state for the input field value.
  - `todos`: Array state containing all todo items, initialized from `localStorage`.

- **Functions**:
  - `handleChange`: Updates `task` state on input change.
  - `handleAddTask`: Adds a new todo to the array, validates for empty input, generates unique ID.
  - `handleKeyDown`: Allows adding todos with Enter key.
  - `handleDelete`: Removes a todo by filtering it out.
  - `handleComplete`: Toggles the `isCompleted` property of a todo.

- **Effect**:
  - `useEffect` saves todos to `localStorage` whenever the todos array changes.

- **Rendering**:
  - Maps over `todos` array to render `Item` components.
  - Each `Item` receives `todo`, `handleComplete`, and `handleDelete` as props.

---

### `Item` Component

```javascript
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
          ×
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
```

- **Props**:
  - `todo`: Object containing `value`, `isCompleted`, and `id` properties.
  - `handleComplete`: Function to toggle completion status.
  - `handleDelete`: Function to delete the todo.

- **State**:
  - `isEditing`: Boolean state for editing mode (not fully implemented).

- **Rendering**:
  - Displays todo text with conditional class based on completion status.
  - Provides buttons for completing and deleting todos.
  - Uses optional chaining (`todo?.isCompleted`) to safely access properties.

---

### `App` Component

```javascript
import './App.css'
import Todo from "./components/Todo.jsx";

function App() {
  return (
   <>
     <Todo />
   </>
  )
}

export default App
```

- **Purpose**: Root component that renders the main `Todo` component.
- **Structure**: Simple wrapper component that serves as the application entry point.

---

## Summary

- **Code Flow**:

  1. The `App` component renders the `Todo` component.
  2. The `Todo` component initializes `todos` from `localStorage` or defaults to an empty array.
  3. User types a task in the input field, updating the `task` state.
  4. User clicks "Add Task" or presses Enter, triggering `handleAddTask()`.
  5. A new todo object is created with a unique ID and added to the `todos` array.
  6. The `useEffect` hook detects the change and saves todos to `localStorage`.
  7. The todos array is mapped to render `Item` components.
  8. User can complete or delete todos, which updates the state and triggers re-renders.

- **Key Takeaways**:
  - `useState` manages component-level state for interactive UI elements.
  - `useEffect` handles side effects like persisting data to `localStorage`.
  - `localStorage` provides persistent storage that survives page refreshes.
  - Array methods (`.map()`, `.filter()`) are used for immutable state updates.
  - Event handlers (`onChange`, `onClick`, `onKeyDown`) enable user interaction.
  - Immutability is crucial for React state updates - always create new arrays/objects.
  - Unique IDs are essential for React's reconciliation algorithm and for identifying items in operations.
  - Conditional rendering allows dynamic UI updates based on state.

---

