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
