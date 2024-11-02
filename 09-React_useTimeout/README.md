# Understanding the Question

The interviewer wants you to create a custom React hook that wraps the `setTimeout` functionality with two specific requirements:

1. The timer should reset if the delay value changes
2. The timer should NOT reset if only the callback function changes

This is a practical question because it tests understanding of:

- React hooks
- Closures
- Cleaning up side effects
- Performance optimization

# Thought Process

1. **Why use a custom hook?**

   - Reusability across components
   - Encapsulate timeout logic
   - Proper cleanup to prevent memory leaks

2. **Why use useRef?**

   - To store the latest callback without triggering re-renders
   - To avoid resetting the timer when callback changes

3. **Why use useEffect?**
   - To handle side effects (setting/clearing timeout)
   - To cleanup previous timeouts
   - To respond to delay changes

# Code Explanation

```javascript
import { useEffect, useRef } from "react";

export default function useTimeout(callback, delay) {
  // Store callback in a ref to always have latest version
  const callBackRef = useRef(callback);

  // Update ref when callback changes
  callBackRef.current = callback;

  useEffect(() => {
    // Create timeout with current callback
    const timerId = setTimeout(callBackRef.current, delay);

    // Cleanup function to clear timeout
    return () => clearTimeout(timerId);
  }, [delay]); // Only re-run if delay changes
}
```

# Usage Example

```javascript
function MyComponent() {
  const [count, setCount] = useState(0);

  // Example usage
  useTimeout(() => {
    console.log("Delayed operation");
  }, 1000);

  return <div>My Component</div>;
}
```

# Key Points to Remember

1. **useRef Importance**

   - `useRef` maintains the reference between renders
   - Helps avoid unnecessary timer resets
   - Stores the most recent callback

2. **useEffect Dependencies**

   - Only `delay` is in dependency array
   - Changes to callback won't trigger effect
   - Ensures timer only resets when delay changes

3. **Cleanup**
   - Returns cleanup function to clear timeout
   - Prevents memory leaks
   - Runs before component unmounts or delay changes
