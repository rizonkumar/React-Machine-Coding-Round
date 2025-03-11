# Trello Clone Implementation

### Functional Components

All components in our application are functional components that follow React's modern approach:

```jsx
const TrelloCard = ({ card, index, listId }) => {
  // Component logic here
  return (
    // JSX here
  );
};
```

### React Hooks

#### useState

Used to manage local component state:

```jsx
const [showForm, setShowForm] = useState(false);
const [cardContent, setCardContent] = useState("");
```

Common use cases in our app:

- Toggle form visibility
- Store form input values
- Track UI states like open/closed menus

#### useRef

Used to access and interact with DOM elements directly:

```jsx
const ref = useRef(null);
```

In our app, used primarily for:

- Getting DOM measurements during drag operations
- Creating DOM references for drag and drop functionality

#### useDispatch/useSelector (Redux Hooks)

Used to interact with the Redux store:

```jsx
const dispatch = useDispatch();
const lists = useSelector((state) => state.lists);
```

- `useDispatch`: Dispatches actions to update the store
- `useSelector`: Extracts data from the store

#### Custom Hooks from React DnD

```jsx
const [{ isDragging }, drag] = useDrag({
  // Configuration
});

const [{ isOver }, drop] = useDrop({
  // Configuration
});
```

### Conditional Rendering

Used extensively to show/hide elements based on state:

```jsx
{
  showForm ? (
    <div className="add-card-form">{/* Form elements */}</div>
  ) : (
    <button className="add-card-button" onClick={toggleForm}>
      + Add a card
    </button>
  );
}
```

### Component Composition

Our application follows a hierarchical structure:

- App contains TrelloBoard
- TrelloBoard contains multiple TrelloList components
- TrelloList contains multiple TrelloCard components

## Core JavaScript Concepts Used

### ES6+ Features

#### Arrow Functions

Used for concise function expressions:

```jsx
const toggleForm = () => setShowForm(!showForm);
```

#### Destructuring Assignment

Extract values from objects and arrays:

```jsx
const { source, destination, draggableId } = result;
const [{ isDragging }, drag] = useDrag({...});
```

#### Spread Operator

Used for immutable state updates:

```jsx
return {
  ...state,
  lists: [...state.lists, newList],
};
```

#### Template Literals

Used for dynamic class names:

```jsx
className={`trello-card ${isDragging ? "is-dragging" : ""}`}
```

#### Array Methods

- **map**: Transform lists into components

  ```jsx
  lists.map((list) => <TrelloList key={list.id} list={list} />);
  ```

- **filter**: Remove items

  ```jsx
  state.lists.filter((list) => list.id !== action.payload.listId);
  ```

- **find**: Locate specific items

  ```jsx
  const list = state.lists.find((list) => list.id === sourceListId);
  ```

- **splice**: Modify arrays for card reordering
  ```jsx
  const [movedCard] = sourceCards.splice(sourceIndex, 1);
  destCards.splice(destinationIndex, 0, movedCard);
  ```

### Closures

Used in event handlers and callbacks where functions access variables from their parent scope:

```jsx
const handleAddCard = () => {
  if (cardContent.trim()) {
    dispatch(addCard(list.id, cardContent));
    setCardContent("");
    setShowForm(false);
  }
};
```

### DOM Operations

Used in drag and drop calculations:

```jsx
const hoverBoundingRect = ref.current.getBoundingClientRect();
const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
const clientOffset = monitor.getClientOffset();
const hoverClientY = clientOffset.y - hoverBoundingRect.top;
```

## Redux Implementation

### Store Structure

```javascript
{
  lists: [
    {
      id: "list-1",
      title: "To do",
      cards: [
        { id: "card-1", content: "Project planning" },
        { id: "card-2", content: "Kickoff meeting" },
      ],
    },
    // More lists...
  ];
}
```

### Action Types

Constants defining the available actions:

```javascript
export const ADD_LIST = "ADD_LIST";
export const ADD_CARD = "ADD_CARD";
export const MOVE_CARD = "MOVE_CARD";
export const DELETE_LIST = "DELETE_LIST";
export const EDIT_LIST_TITLE = "EDIT_LIST_TITLE";
```

### Action Creators

Functions that return action objects:

```javascript
export const addCard = (listId, content) => ({
  type: ADD_CARD,
  payload: { listId, content },
});

export const moveCard = (
  cardId,
  sourceListId,
  destinationListId,
  sourceIndex,
  destinationIndex
) => ({
  type: MOVE_CARD,
  payload: {
    cardId,
    sourceListId,
    destinationListId,
    sourceIndex,
    destinationIndex,
  },
});
```

### Reducer

A pure function handling state updates:

```javascript
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST: {
      // Create new list and add to state
    }
    case ADD_CARD: {
      // Add card to specified list
    }
    case MOVE_CARD: {
      // Move card within or between lists
    }
    // Other cases...
    default:
      return state;
  }
};
```

Key patterns in the reducer:

- Always return a new state object
- Use immutable update patterns
- Handle complex state transitions for moves

## React DnD Implementation

### DnD Provider Setup

```jsx
<DndProvider backend={HTML5Backend}>
  <div className="app">{/* Application components */}</div>
</DndProvider>
```

### Card as Drag Source and Drop Target

```jsx
const TrelloCard = ({ card, index, listId }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  // Make the card draggable
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { id: card.id, index, listId, content: card.content },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Make the card a drop target for reordering
  const [{ handlerId }, drop] = useDrop({
    accept: "CARD",
    hover(item, monitor) {
      // Logic for determining card position and reordering
    },
  });

  // Combine drag and drop refs
  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`trello-card ${isDragging ? "is-dragging" : ""}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="card-content">{card.content}</div>
    </div>
  );
};
```

### List as Drop Target

```jsx
const TrelloList = ({ list }) => {
  // Component state and dispatch

  // Make the list a drop target for cards
  const [{ isOver }, drop] = useDrop({
    accept: "CARD",
    drop: (item, monitor) => {
      // Handle card drops on the list (not on other cards)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });

  return (
    <div className="trello-list">
      <div className="list-header">{/* List header content */}</div>

      <div
        ref={drop}
        className={`cards-container ${isOver ? "dragging-over" : ""}`}
      >
        {/* List cards */}
      </div>

      {/* Add card form or button */}
    </div>
  );
};
```

## Application Flow

### Component Hierarchy and Data Flow

1. **App Component**

   - Sets up Redux Provider and DnD Provider
   - Renders the header and TrelloBoard

2. **TrelloBoard Component**

   - Retrieves lists from Redux store
   - Renders TrelloList components
   - Renders AddList component

3. **TrelloList Component**

   - Receives list data as props
   - Manages list-specific state (form visibility, etc.)
   - Acts as a drop target for cards
   - Renders TrelloCard components
   - Renders add card form/button

4. **TrelloCard Component**

   - Receives card data as props
   - Acts as both drag source and drop target
   - Renders card content

5. **ListActions Component**

   - Manages dropdown menu for list operations
   - Triggers list actions (delete, etc.)

6. **AddList Component**
   - Manages form state for creating new lists
   - Dispatches addList action when submitted

### Event Flow for Common Operations

#### Adding a New Card

1. User clicks "+ Add a card" button in a list
2. `toggleForm` function is called, setting `showForm` to true
3. Form renders, user enters card content
4. User clicks "Add Card" button
5. `handleAddCard` function is called
6. Function checks if content is not empty
7. If valid, dispatches `addCard` action with list ID and content
8. Redux reducer handles the action:
   - Creates a new card object with UUID
   - Finds the target list
   - Creates a new state with the card added to the list
9. React re-renders with updated state
10. Form is hidden, ready for next card

#### Dragging a Card Between Lists

1. User starts dragging a card
2. `useDrag` hook activates, setting `isDragging` to true
3. Card's opacity reduces to provide visual feedback
4. As card is dragged over other cards, their `hover` handlers run:
   - Calculate mouse position relative to card
   - Determine if card should be reordered
   - If threshold crossed, dispatch `moveCard` action
5. When card is dragged over a list (not over another card):
   - List's `drop` handler runs
   - Dispatches `moveCard` action to move card to end of list
6. Redux reducer handles the move:
   - For same-list moves: reorders the cards array
   - For between-list moves: removes from source, adds to destination
7. React re-renders with updated state
8. Drag ends, card appears in new position

## Dry Run Example

Let's walk through the process of dragging a card from "To Do" list to "Doing" list:

1. **Initial State**:

   ```
   Lists: [
     { id: "list-1", title: "To do", cards: [
       { id: "card-1", content: "Project planning" },
       { id: "card-2", content: "Kickoff meeting" }
     ] },
     { id: "list-2", title: "Doing", cards: [] },
     { id: "list-3", title: "Done", cards: [] }
   ]
   ```

2. **User Action**: User starts dragging "Kickoff meeting" card.

3. **Component Response**:

   - TrelloCard's `useDrag` hook activates
   - Card opacity reduces to 0.5
   - Drag item created with:
     ```
     { id: "card-2", index: 1, listId: "list-1", content: "Kickoff meeting" }
     ```

4. **Dragging Over Target List**:

   - User drags over "Doing" list
   - TrelloList's `useDrop` hover handler activates
   - Checks if card is from a different list (it is)
   - Determines drop index (0, as list is empty)

5. **Drop Action**:

   - User releases card over "Doing" list
   - Drop handler dispatches action:
     ```
     moveCard("card-2", "list-1", "list-2", 1, 0)
     ```

6. **Reducer Processing**:

   - Identifies this as a between-list move
   - Finds source list ("To do")
   - Finds destination list ("Doing")
   - Creates copies of both card arrays
   - Removes card from source array
   - Adds card to destination array at index 0
   - Creates new state with updated lists

7. **Updated State**:

   ```
   Lists: [
     { id: "list-1", title: "To do", cards: [
       { id: "card-1", content: "Project planning" }
     ] },
     { id: "list-2", title: "Doing", cards: [
       { id: "card-2", content: "Kickoff meeting" }
     ] },
     { id: "list-3", title: "Done", cards: [] }
   ]
   ```

8. **React Re-render**:
   - TrelloBoard re-renders with new state
   - TrelloList components update to show new card arrangements
   - Animation completes, card now appears in "Doing" list
