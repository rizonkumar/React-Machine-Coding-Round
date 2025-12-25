# React Machine Coding: Instagram Stories

## Problem Statement

Design and implement a "Story" feature similar to Instagram or WhatsApp Status using React. The component should handle temporary data, user interaction, and efficient resource management without a backend.

### Functional Requirements

1. **Story Upload**: Allow users to select an image file. This image should immediately appear in a horizontal scrollable list.
2. **Auto-Deletion**: Each uploaded story must automatically disappear from the list exactly 15 seconds after upload.
3. **Story Viewing**: Clicking a story preview should open the image in a centered modal (lightbox).
4. **Auto-Close Modal**: The modal should automatically close after 3 seconds of viewing.
5. **Lifecycle Management**: Ensure all timers and memory references are cleaned up if the component unmounts.

### Technical Constraints

- Use functional components and React Hooks.
- Do not use external libraries for state or UI (e.g., Redux, Bootstrap).
- Ensure strict mode compatibility (no side effects in render).

---

## Implementation Notes & key Concepts

### 1. State Management vs. References

**Concept**: The difference between `useState` and `useRef` is arguably the most common theoretical question in React interviews.

- **`useState`**: Triggers a re-render when the value changes. Use this when the change needs to be reflected in the UI immediately.

  - _Usage_: Storing the list of `stories` (adding/removing updates the list) and `activeStory` (opening logic).

- **`useRef`**: Holds a mutable value that persists across renders _without_ triggering a re-render.
  - _Usage_: Storing `setTimeout` IDs. When a timer starts, we need to save its ID to clear it later. However, knowing the ID changed typically does not require updating the DOM, so `useState` would cause unnecessary performance overhead.

### 2. The "Closure Trap" in Asynchronous Operations

**Concept**: Why do we use `setStories(prev => ...)` instead of `setStories(stories ...)`?

In JavaScript, functions "close over" variables in their scope. When `setTimeout` is declared, it captures the value of the state _at that exact moment_.

#### Incorrect Approach

```javascript
// Assume 'stories' is an empty array [] at t=0
setTimeout(() => {
  // 15 seconds later, this function runs.
  // It still thinks 'stories' is [], even if the user added 5 items since then.
  const newStories = stories.filter((s) => s.id !== id);
  setStories(newStories); // This will accidentally wipe out recent additions.
}, 15000);
```

#### Correct Approach (Functional Update)

```javascript
setTimeout(() => {
  // React guarantees 'prevStories' is the current, most up-to-date state.
  setStories((prevStories) => prevStories.filter((s) => s.id !== id));
}, 15000);
```

### 3. Memory Management: Object URLs

**Concept**: Handling file uploads on the client side without uploading to a server.

- **`URL.createObjectURL(file)`**: Creates a DOMString containing a URL representing the object given in the parameter. It is tied to the document's lifecycle.
- **Memory Leak Risk**: The browser keeps the reference to the file in memory until the document is unloaded. If a user uploads 50 high-res photos, the app will crash if memory is not freed.
- **`URL.revokeObjectURL(url)`**: Manually releases an existing object URL.
  - _Implementation_: This must be called whenever a story is deleted (via the 15s timer) or when the component unmounts (via `useEffect` cleanup).

### 4. Component Cleanup

**Concept**: Preventing side effects on unmounted components.

If a user uploads a story (starts a 15s timer) and immediately navigates away from the page, the component unmounts. 15 seconds later, the timer fires and attempts to call `setStories`.

- **Error**: "Can't perform a React state update on an unmounted component."
- **Solution**: Track all active timer IDs in a `useRef` object. Return a cleanup function in `useEffect` to clear them.

```javascript
useEffect(() => {
  // Cleanup function runs on unmount
  return () => {
    // 1. Clear all active timers
    Object.values(storyTimersRef.current).forEach(clearTimeout);

    // 2. Clear modal timer
    if (modalTimerRef.current) clearTimeout(modalTimerRef.current);
  };
}, []);
```

---

## Code Walkthrough

### `InstagramStory.jsx`

The smart container component.

- **`uploadStory`**: Handles file input. Generates a UUID and Blob URL. Starts the 15s expiry timer.
- **`storyTimersRef`**: A dictionary object `{ [id]: timerId }`. We use an object instead of an array allows O(1) access to clear specific timers by Story ID.
- **`handleStoryClick`**: Sets the `activeStory` state and starts the 3s modal auto-close timer.

### `Modal.jsx`

The presentational component.

- **Props**: Receives `imageSrc` and `onClose`.
- **Escape Key Listener**: Adds a global event listener for accessibility. Note the cleanup in `useEffect` to remove the listener.
