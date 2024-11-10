import Signal from "./Signal.jsx";
import { useEffect, useState } from "react";

function Traffic({ lights = ["green", "yellow", "red"] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActive((prevActive) => {
        return (prevActive + 1) % lights.length;
      });
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      {lights.map((color, index) => {
        return <Signal key={index} color={color} isActive={active === index} />;
      })}
    </>
  );
}

export default Traffic;
