# Drag and Drop Implementation Guide

## Component Overview

This is a React component implementing drag and drop functionality, typically used for kanban boards or task management interfaces.

## Key Concepts

### State and Refs

```javascript
const [data, setData] = useState(initialData);
const dragItem = useRef();
const dragContainer = useRef();
```

- `data`: Stores the current state of items in different containers
- `dragItem`: Ref to track the item being dragged
- `dragContainer`: Ref to track the source container of dragged item

## Event Handlers

### 1. handleDragStart

```javascript
const handleDragStart = (e, item, container) => {
  dragItem.current = item;
  dragContainer.current = container;
  e.target.style.opacity = 0.5;
};
```

- Triggered when user starts dragging an item
- Stores the dragged item and its container in refs
- Reduces opacity of dragged element for visual feedback

### 2. handleDragEnd

```javascript
const handleDragEnd = (e) => {
  e.target.style.opacity = 1;
};
```

- Triggered when drag operation ends
- Restores opacity of dragged element

### 3. handleDrop

```javascript
const handleDrop = (e, targetContainer) => {
  const item = dragItem.current;
  const sourceContainer = dragContainer.current;
  setData((prev) => {
    const newData = { ...prev };
    // Remove item from source container
    newData[sourceContainer] = newData[sourceContainer].filter(
      (i) => i !== item
    );
    // Add item to target container
    newData[targetContainer] = [...newData[targetContainer], item];
    return newData;
  });
};
```

- Handles the drop event
- Moves item from source to target container
- Updates state with new arrangement

### 4. handleDragOver

```javascript
const handleDragOver = (e) => {
  e.preventDefault();
};
```

- Required to enable dropping
- Prevents default browser behavior

## Render Logic

### Container Structure

```javascript
<div className="board">
  {Object.keys(data).map((container, index) => (
    <div
      key={index}
      className="column"
      onDrop={(e) => handleDrop(e, container)}
      onDragOver={handleDragOver}
    >
```

- Maps through containers
- Sets up drop zone for each container

### Draggable Items

```javascript
<div
  key={idx}
  className="task"
  draggable
  onDragStart={(e) => handleDragStart(e, item, container)}
  onDragEnd={(e) => handleDragEnd(e)}
>
  {item}
</div>
```

- Renders individual draggable items
- Attaches drag event handlers

## Interview Focus Points

1. **HTML5 Drag and Drop API**

   - Native browser API
   - Key events: dragstart, dragend, dragover, drop

2. **React State Management**

   - Immutable state updates
   - Using spread operator for object/array manipulation

3. **React Refs**

   - Purpose of useRef
   - Maintaining values between renders

4. **Event Handling**

   - preventDefault() usage
   - Event parameter in handlers
