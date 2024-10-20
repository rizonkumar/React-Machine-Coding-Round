````markdown
# Toast Notification Component

This React component creates a customizable toast notification system.

## Key Concepts Explained

### 1. Purpose of useRef

In this component, `useRef` is used to store and manage timeouts for each toast notification. It provides a way to keep references to the timeouts without causing re-renders when they're updated. This is crucial for efficiently managing the automatic closing of toasts.

### 2. Purpose of prevState

The `prevState` is used in the `setToast` function to ensure we're working with the most up-to-date state when updating it. This is particularly important in asynchronous operations to avoid potential race conditions where the state might have changed between the time we start the update and when it's actually applied.

### 3. Difference between using prevState and not using it

- **With prevState**:
  ```javascript
  setToast((prevToast) => { ... })
  ```
````

This approach guarantees we're working with the latest state, even if there were multiple state updates in quick succession.

- **Without prevState**:
  ```javascript
  setToast(newState);
  ```
  This might use an outdated state if there were other updates that occurred in between.

Using `prevState` is a more robust approach, especially in components where multiple state updates might occur rapidly or asynchronously.

## Code Flow Explanation

1. **State and Ref Initialization**:
   The component starts by initializing the state for storing toasts and a ref for managing timeouts.

2. **Adding a Toast**:
   When `handleAdd` is called, it creates a new toast with a unique ID, adds it to the state, and sets a timeout for automatic removal.

3. **Closing a Toast**:
   The `handleClose` function is responsible for removing a toast. It clears the associated timeout, removes the timeout reference, and updates the state to filter out the closed toast.

4. **Rendering**:
   The component renders a container for toasts and control buttons. Each toast is mapped from the state and displayed with its message and type. Control buttons are provided to add different types of toasts.
