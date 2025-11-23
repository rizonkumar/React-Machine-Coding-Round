# Code Notes: Accordion Implementation

## Code Flow

1. **`Accordion` Component**:

   - The `Accordion` component takes a `qna` prop (an object containing `question` and `answer`) and renders a single accordion item.
   - It uses `useState` to manage the open/closed state (`show`) of the accordion.
   - When the accordion header is clicked, it toggles the `show` state, which controls the visibility of the content.
   - The icon changes dynamically between "+" (closed) and "−" (open) based on the `show` state.
   - Conditional classes are applied based on the `show` state to control visibility and behavior.

2. **`Faq` Component**:

   - The `Faq` component imports FAQ data from a JSON file.
   - It renders a container with a title "Frequently Asked Questions".
   - It maps over the `faqs` array from the data and renders an `Accordion` component for each FAQ item.
   - Each `Accordion` receives a `qna` prop containing the question and answer.

3. **`App` Component**:

   - The `App` component is the root component that renders the `Faq` component.
   - It serves as the entry point for the application.

---

## Key Concepts

### 1. **`useState` Hook**

- **Purpose**: The `useState` hook is used to manage component-level state in functional components. In this case, it tracks whether each accordion item is open or closed.
- **How it works**:
  - `useState(false)` initializes the `show` state to `false` (accordion is closed by default).
  - `setShow(!show)` toggles the state when the header is clicked.
  - The state change triggers a re-render, updating the UI to reflect the new state.
- **State Management**: Each `Accordion` component maintains its own independent state, allowing multiple accordions to be open simultaneously.

```javascript
const [show, setShow] = useState(false);
```

---

### 2. **Conditional Rendering**

- **Purpose**: Conditional rendering allows components to display different content based on state or props.
- **How it works**:
  - The `show` state determines which content is displayed and which classes are applied.
  - The icon text changes based on the `show` state: "+" when closed, "−" when open.
  - The `accordion-content` div receives the `show` class conditionally, which controls its visibility.
  - Using template literals with ternary operators allows dynamic class names based on state.

```javascript
<span className="icon">{show ? "−" : "+"}</span>
<div className={`accordion-content ${show ? "show" : ""}`}>
```

---

### 3. **Event Handling**

- **Purpose**: Event handlers allow components to respond to user interactions, such as clicks.
- **How it works**:
  - The `onClick` handler is attached to the `accordion-header` button.
  - When clicked, it calls `setShow(!show)` to toggle the state.
  - The `!show` operator inverts the current boolean value, effectively toggling between `true` and `false`.
  - Arrow functions `() => setShow(!show)` are used to create inline event handlers.
  - The state change triggers a re-render, updating the accordion's appearance and behavior.

```javascript
<button className="accordion-header" onClick={() => setShow(!show)}>
```

---

### 4. **Data Mapping**

- **Purpose**: Mapping over arrays allows rendering multiple components dynamically from data.
- **How it works**:
  - The `Faq` component imports FAQ data from a JSON file.
  - It uses the `.map()` method to iterate over the `faqs` array.
  - For each FAQ item, it renders an `Accordion` component with the corresponding data.
  - The `key` prop is used to help React efficiently track and update list items during re-renders.
  - Using `index` as the key is acceptable here since the list is static and items don't reorder.

```javascript
{
  data.faqs.map((faq, index) => <Accordion key={index} qna={faq} />);
}
```

---

## Code Breakdown

### `Accordion` Component

```javascript
import { useState } from "react";

const Accordion = ({ qna }) => {
  const [show, setShow] = useState(false);

  return (
    <div className={`accordion ${show ? "active" : ""}`}>
      <button className="accordion-header" onClick={() => setShow(!show)}>
        <span className="question">{qna.question}</span>
        <span className="icon">{show ? "−" : "+"}</span>
      </button>
      <div className={`accordion-content ${show ? "show" : ""}`}>
        <p>{qna.answer}</p>
      </div>
    </div>
  );
};

export default Accordion;
```

- **Props**: `qna` - An object containing `question` and `answer` properties.
- **State**: `show` - Boolean state that tracks whether the accordion is open or closed.
- **Logic**:
  - The component receives `qna` as a prop, which contains `question` and `answer` properties.
  - `useState(false)` initializes the accordion in a closed state.
  - The `onClick` handler uses an arrow function to toggle the state: `() => setShow(!show)`.
  - The ternary operator `show ? "−" : "+"` conditionally renders the icon based on state.
  - Template literals with ternary operators create dynamic class names: `` `${show ? "show" : ""}` ``.
- **Rendering**:
  - The outer `div` has conditional classes based on the `show` state.
  - The `button` element serves as the clickable header with an `onClick` event handler.
  - The `question` span displays the FAQ question from `qna.question`.
  - The `icon` span displays "+" or "−" based on the state using conditional rendering.
  - The `accordion-content` div conditionally receives the `show` class to control visibility.
  - The `p` tag displays the FAQ answer from `qna.answer`.

---

### `Faq` Component

```javascript
import data from "../constants/data.json";
import Accordion from "./Accordian";

const Faq = () => {
  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {data.faqs.map((faq, index) => (
          <Accordion key={index} qna={faq} />
        ))}
      </div>
    </div>
  );
};

export default Faq;
```

- **Data Import**: Imports FAQ data from a JSON file located in the constants folder using ES6 import syntax.
- **Logic**:
  - Accesses the `faqs` array from the imported `data` object: `data.faqs`.
  - Uses the `.map()` method to transform each FAQ object into an `Accordion` component.
  - The map callback receives `faq` (the current item) and `index` (the array index).
  - Each `Accordion` receives a `qna` prop containing the `question` and `answer` properties.
  - Uses `index` as the `key` prop to help React efficiently track list items during re-renders.
- **Rendering**:
  - Renders a container with a heading.
  - Maps over the `faqs` array to render multiple `Accordion` components dynamically.
  - Each `Accordion` receives a `qna` prop with question and answer data.

---

### `App` Component

```javascript
import "./App.css";
import Faq from "./components/Faq";

function App() {
  return (
    <>
      <Faq />
    </>
  );
}

export default App;
```

- **Purpose**: Root component that renders the main `Faq` component.
- **Structure**: Simple wrapper component that serves as the application entry point.
- **Logic**:
  - Uses React Fragment (`<>...</>`) to wrap the `Faq` component without adding an extra DOM node.
  - Imports and renders the `Faq` component, which handles all the accordion logic.

---

### Data Structure (`data.json`)

```json
{
  "faqs": [
    {
      "question": "What is frontend development?",
      "answer": "Frontend development refers to..."
    },
    ...
  ]
}
```

- **Structure**: JSON object containing an array of FAQ objects.
- **Each FAQ Object**:
  - `question`: String containing the FAQ question.
  - `answer`: String containing the FAQ answer.

---

## Summary

- **Code Flow**:

  1. The `App` component renders the `Faq` component.
  2. The `Faq` component imports FAQ data from a JSON file and maps over it to render multiple `Accordion` components.
  3. Each `Accordion` component manages its own open/closed state using `useState(false)`.
  4. Clicking the accordion header triggers the `onClick` handler, which calls `setShow(!show)` to toggle the state.
  5. The state change triggers a re-render, updating the UI with conditional classes and content visibility.
  6. The icon and content visibility change based on the `show` state using conditional rendering.

- **Key Takeaways**:
  - `useState` manages component-level state for interactive UI elements.
  - Each accordion maintains independent state, allowing multiple items to be open simultaneously.
  - Conditional rendering allows dynamic UI updates based on state (ternary operators, template literals).
  - Event handlers (`onClick`) enable user interaction and state updates.
  - Data mapping (`.map()`) allows rendering multiple components dynamically from arrays.
  - The `key` prop helps React efficiently track and update list items during re-renders.
  - Template literals with ternary operators enable dynamic class names based on state.

---
