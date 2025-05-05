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

![Chips Input Component UI](image.png)

The component displays:

1. An input field at the end of the chip list
2. Existing chips as small labeled elements with "X" buttons
3. Horizontal layout that wraps as needed
