# Complete React Excel Implementation Documentation

## Table of Contents

1. [Overview](#overview)
2. [Component Structure](#component-structure)
3. [Core Functions Deep Dive](#core-functions-deep-dive)
4. [UI Components](#ui-components)
5. [Code Flow](#code-flow)
6. [Improvements](#improvements)

## Overview

```javascript
import React, { useState } from "react";
```

A lightweight Excel-like application built using React that provides:

- Dynamic grid management
- Formula calculation
- Row/column manipulation
- Real-time cell updates

## Component Structure

### State Management

```javascript
const [row, setRow] = useState(2);
const [col, setCol] = useState(2);
const [grid, setGrid] = useState(createGrid(2, 2));
```

## Core Functions Deep Dive

### 1. Array Methods Explained

#### Slice vs Splice

```javascript
// Splice: Modifies original array
const fruits = ["apple", "banana", "orange"];
fruits.splice(1, 1); // Removes 1 element at index 1
console.log(fruits); // ['apple', 'orange']

// Slice: Creates new array
const numbers = [1, 2, 3, 4];
const newNumbers = numbers.slice(1, 3);
console.log(newNumbers); // [2, 3]
console.log(numbers); // Original: [1, 2, 3, 4]
```

#### Map Function

```javascript
// Basic Map
const numbers = [1, 2, 3];
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // [2, 4, 6]

// Grid Creation using Map
const grid = new Array(2).fill("").map(() => new Array(2).fill(""));
/* Result:
[
  ["", ""],
  ["", ""]
]
*/
```

### 2. Grid Creation Function

```javascript
function createGrid(rows, cols) {
  // Method 1: Traditional Loops
  const data = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push("");
    }
    data.push(row);
  }
  return data;

  // Method 2: Modern Array Methods
  return new Array(rows).fill("").map(() => new Array(cols).fill(""));
}
```

### 3. Grid Manipulation Functions

```javascript
// Add Row Function
const addRows = () => {
  setRow(row + 1);
  setGrid(createGrid(row + 1, col));
};

// Delete Row Function
const deleteRow = (rowIndex) => {
  const newGrid = [...grid];
  newGrid.splice(rowIndex, 1);
  setGrid(newGrid);
};

// Add Column Function
const addCols = () => {
  setCol(col + 1);
  setGrid(createGrid(row, col + 1));
};

// Delete Column Function
const deleteCol = (colIndex) => {
  const newGrid = [...grid];
  newGrid.forEach((row) => row.splice(colIndex, 1));
  setGrid(newGrid);
};
```

### 4. Cell Value Management

```javascript
const handleCallValueChange = (rowIndex, colIndex, value) => {
  // Create shallow copy
  const newGrid = [...grid];
  // Update specific cell
  newGrid[rowIndex][colIndex] = value;
  // Update state
  setGrid(newGrid);
};

// Example Usage:
// handleCallValueChange(0, 0, "Hello")
// Changes cell [0,0] to "Hello"
```

### 5. Formula Calculation

```javascript
const calculateForumula = (formula) => {
  // Step 1: Remove '=' prefix
  const withoutEquals = formula.substring(1); // "1+2+3"

  // Step 2: Split into numbers
  const numberStrings = withoutEquals.split("+"); // ["1", "2", "3"]

  // Step 3: Convert to numbers and handle invalid inputs
  const numbers = numberStrings.map((num) => parseFloat(num.trim()) || 0);

  // Step 4: Sum all numbers
  return numbers.reduce((sum, num) => sum + num, 0);
};

// Example:
// calculateForumula("=1+2+3") returns 6
// calculateForumula("=1.5+2.5+invalid") returns 4
```

## UI Components

### Table Structure

```javascript
<table>
  <tbody>
    {grid.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((cell, cellIndex) => (
          <td key={cellIndex}>
            <input
              type="text"
              value={cell}
              onChange={(e) =>
                handleCallValueChange(rowIndex, cellIndex, e.target.value)
              }
              onBlur={(e) => {
                if (e.target.value.startsWith("=")) {
                  const result = calculateForumula(e.target.value);
                  handleCallValueChange(rowIndex, cellIndex, result);
                }
              }}
            />
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>
```

## Code Flow

1. **Initialization**

   - Component mounts
   - Initial 2x2 grid created
   - State variables set

2. **User Interactions**

   ```javascript
   // Cell Update Flow
   User types → onChange → handleCallValueChange → Grid Update → Rerender

   // Formula Flow
   User enters "=1+2" → onBlur → calculateFormula → handleCallValueChange → Grid Update

   // Grid Manipulation Flow
   Click Add Row → addRows → Create New Grid → Update State → Rerender
   ```

## Improvements

### 1. Enhanced Formula Calculation

```javascript
const enhancedCalculateFormula = (formula) => {
  const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => (b !== 0 ? a / b : 0),
  };
  // Implementation for multiple operations
};
```

### 2. Cell References

```javascript
const processCellReference = (ref) => {
  const col = ref.charAt(0).toUpperCase().charCodeAt(0) - 65;
  const row = parseInt(ref.substring(1)) - 1;
  return grid[row][col];
};
```

### 3. Undo/Redo

```javascript
const [history, setHistory] = useState([]);
const [currentStep, setCurrentStep] = useState(0);

const undo = () => {
  if (currentStep > 0) {
    setCurrentStep(currentStep - 1);
    setGrid(history[currentStep - 1]);
  }
};
```

### 4. Cell Formatting

```javascript
const formatCell = (value, format) => {
  switch (format) {
    case "currency":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    case "percentage":
      return `${(value * 100).toFixed(2)}%`;
    default:
      return value;
  }
};
```

### 5. Performance Optimization

```javascript
const Cell = React.memo(({ value, onChange }) => (
  <input value={value} onChange={onChange} />
));
```

### 6. Error Handling

```javascript
const handleError = (error, cellPosition) => {
  return {
    hasError: true,
    errorMessage: error.message,
    cellPosition,
  };
};
```

### 7. Data Validation

```javascript
const validateInput = (value, type) => {
  switch (type) {
    case "number":
      return !isNaN(value);
    case "date":
      return !isNaN(Date.parse(value));
    default:
      return true;
  }
};
```
