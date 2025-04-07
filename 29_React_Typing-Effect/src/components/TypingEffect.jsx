import { useEffect, useRef, useState } from "react";

const TypingEffect = ({ text, delay }) => {
  const [displayText, setDisplayText] = useState(text);
  console.log("Text", text);
  const velocityRef = useRef({ speed: 1, endIndex: 0 });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (velocityRef.current.endIndex === text.length) {
        velocityRef.current.speed = -1;
      } else if (velocityRef.current.endIndex === 0) {
        velocityRef.current.speed = 1;
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

export default TypingEffect;
