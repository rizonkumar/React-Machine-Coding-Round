import { useEffect } from "react";

const useClickOutside = (elementRef, handler) => {
  console.log("Handler", handler);
  console.log("ElementRef", elementRef);
  useEffect(() => {
    const cb = (event) => {
      if (!elementRef.current?.contains(event.target)) {
        handler();
      }
    };

    // TODO: Difference btw click and mouse down event?
    // what i observed is when i implemented show modal button that time "click" didn't work but "mousedown" worked. why??
    document.addEventListener("mousedown", cb);

    return () => {
      document.removeEventListener("mousedown", cb);
    };
  }, [elementRef, handler]);
};

export default useClickOutside;
