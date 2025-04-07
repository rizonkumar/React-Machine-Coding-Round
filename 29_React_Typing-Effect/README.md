# Typing Effect Implementation Explained

## Code Breakdown

### 1. CSS Animation (styles.css)

```css
span {
  animation: hideAndShow 1s infinite;
}

@keyframes hideAndShow {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
```

**Explanation:**

- Creates a blinking cursor effect for the `<span>` element
- `hideAndShow` animation toggles opacity between 0 and 1 every second
- `infinite` makes the animation loop continuously

### 2. App Component (App.js)

```javascript
import React from "react";
import TypingEffect from "./components/TypingEffect";

const App = () => {
  return (
    <div>
      <TypingEffect text="I'm a FullStack Developer" delay="100" />
    </div>
  );
};
```

**Explanation:**

- Main component that renders the `TypingEffect` component
- Passes two props:
  - `text`: The string to be typed
  - `delay`: Time (ms) between each character addition/removal

### 3. TypingEffect Component (TypingEffect.js)

```javascript
import { useEffect, useRef, useState } from "react";

const TypingEffect = ({ text, delay }) => {
  const [displayText, setDisplayText] = useState(text);
  const velocityRef = useRef({ speed: 1, endIndex: 0 });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (velocityRef.current.endIndex === text.length) {
        velocityRef.current.speed = -1; // Switch to deleting mode
      } else if (velocityRef.current.endIndex === 0) {
        velocityRef.current.speed = 1; // Switch to typing mode
      }
      velocityRef.current.endIndex += velocityRef.current.speed;
      setDisplayText(text.slice(0, velocityRef.current.endIndex));
    }, delay);

    return () => clearInterval(intervalId);
  }, [delay, text]);

  return (
    <div>
      {displayText}
      <span className="">|</span>
    </div>
  );
};
```

## JavaScript/React Concepts Used

### 1. React Hooks

- `useState`: Manages the currently displayed text
- `useEffect`: Handles the side effect of typing animation
- `useRef`: Stores mutable values that persist across renders without causing re-renders

### 2. Key Methods

- `setInterval`: Repeatedly executes the typing/deleting logic at specified intervals
- `clearInterval`: Cleans up the interval when component unmounts
- `Array.slice`: Extracts portion of the text to display

### 3. Why useRef?

- We need to track `speed` and `endIndex` between renders
- Changing these values shouldn't trigger re-renders
- Regular variables would reset on each render

## Code Flow

1. **Initialization**:

   - Component mounts with `displayText` initialized to full `text`
   - `velocityRef` initialized with `speed: 1` (typing) and `endIndex: 0`

2. **useEffect Execution**:

   - Sets up an interval that runs every `delay` milliseconds
   - Each interval tick:
     - Checks if we've reached text end (switch to deleting)
     - Checks if we're back at start (switch to typing)
     - Updates `endIndex` based on current `speed`
     - Updates `displayText` with appropriate slice of text

3. **Rendering**:
   - Shows current `displayText` with blinking cursor (`|`)

## DRY Run Example

Let's simulate with text="Hi" and delay=100ms:

| Time (ms) | endIndex | speed | displayText | Action               |
| --------- | -------- | ----- | ----------- | -------------------- |
| 0         | 0        | 1     | ""          | Initialize           |
| 100       | 1        | 1     | "H"         | Add first character  |
| 200       | 2        | 1     | "Hi"        | Add second character |
| 300       | 2        | -1    | "Hi"        | Hit length, reverse  |
| 400       | 1        | -1    | "H"         | Remove last char     |
| 500       | 0        | -1    | ""          | Back to start        |
| 600       | 0        | 1     | ""          | Hit start, reverse   |
| 700       | 1        | 1     | "H"         | Cycle repeats...     |

This creates an infinite typing/deleting loop for the text "Hi".
