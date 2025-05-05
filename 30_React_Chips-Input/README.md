# Chips Input Component

## Description

A React component that allows users to input and manage tags/keywords as interactive "chips".

## Features

### 1. Input Field

- Text input field for entering new tags
- Standard text input type

### 2. Add Chips

- Pressing "Enter" key adds the current text as a new chip
- Empty or whitespace-only inputs are ignored
- Uses `onKeyDown` event handler (not deprecated `onKeyPress`)

### 3. Remove Chips

- Each chip has an "X" button for removal
- Clicking "X" removes only that specific chip
- Duplicate chip names are handled properly (removing one doesn't affect others)

### 4. Display

- Chips are displayed horizontally in a list
- Clean, compact visual design

### 5. Data Persistence

- Chip list persists through component re-renders

## Implementation Notes

- Built with React
- Uses state management to track chips
- Proper event handling for keyboard interactions
- Accessible UI with clear interaction patterns

## Example Usage

```jsx
<ChipsInput />
```

## Visual Reference

The component displays:

1. An input field at the end of the chip list
2. Existing chips as small labeled elements with "X" buttons
3. Horizontal layout that wraps as needed

## Component Overview

This React component creates an interactive tags/chips input system where users can:

- Add tags by typing and pressing Enter
- Remove tags by clicking the "X" button
- View tags in a horizontal, wrap-able layout

## State Management

### `useState` Hooks

```jsx
const [inputText, setInputText] = useState("");
const [chips, setChips] = useState(["rizon", "hello"]);
```

1. **inputText State**:

   - Tracks the current value of the input field
   - Updated via `onChange` handler
   - Reset to empty string after chip creation

2. **chips State**:
   - Stores the array of chips/tags
   - Initialized with default values ["rizon", "hello"]
   - Modified through `setChips` when adding/removing chips

## Event Handlers

### `handleKeyDown` Function

```jsx
const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (inputText.trim() !== "") {
      setChips([...chips, inputText.trim()]);
      setInputText("");
    }
  }
};
```

- **Purpose**: Handles Enter key press in input field
- **Key Details**:
  - `e.preventDefault()` prevents default form submission behavior
  - `trim()` removes whitespace from both ends
  - Spread operator (`...`) creates new array with existing chips + new one
  - Empty check prevents adding blank chips

### `handleDelete` Function

```jsx
const handleDelete = (chipToDelete) => {
  setChips(chips.filter((chip) => chip !== chipToDelete));
};
```

- **Purpose**: Removes a specific chip when its "X" is clicked
- **Key Details**:
  - Uses `filter()` to create new array without the deleted chip
  - Compares each chip to find the one to remove
  - Preserves all other chips in the array

## Rendering Logic

### Chip Display

```jsx
{
  chips.map((chip, index) => (
    <div key={`${chip}-${index}`}>{/* Chip content */}</div>
  ));
}
```

- **`map()` Method**: Iterates over chips array to render each one
- **`key` Prop**: Combines chip text and index for stable identity
  - Crucial for React's reconciliation algorithm
  - Prevents issues with duplicate chip values

### Input Field

```jsx
<input
  type="text"
  value={inputText}
  onChange={(e) => setInputText(e.target.value)}
  onKeyDown={handleKeyDown}
/>
```

- **Controlled Component**: `value` tied to `inputText` state
- **Two-way Binding**: `onChange` updates state as user types
- **Keyboard Handling**: `onKeyDown` captures Enter key press

## Key Concepts Explained

### 1. `useState` Hook

- **Purpose**: Manage component state between renders
- **Behavior**:
  - Returns current state value and updater function
  - Triggers re-render when state changes
  - Preserves state between re-renders

### 2. `filter()` Method

- **Purpose**: Create new array with elements that pass test
- **In Our Case**:
  - Returns new array excluding the chip to delete
  - Pure function (doesn't modify original array)
  - Better than `splice()` for React state updates

### 3. Event Handling

- **onKeyDown vs onKeyPress**:
  - `onKeyDown` detects all keys (including Enter, modifiers)
  - `onKeyPress` is deprecated and less reliable
- **Synthetic Events**:
  - React's cross-browser wrapper around native events
  - `e` contains event properties like `key`, `target`

### 4. Spread Operator (`...`)

- **Purpose**: Expand iterables into individual elements
- **In State Updates**:
  - Creates new array reference (required for React state)
  - More readable than array concatenation
  - Preserves immutability principle
