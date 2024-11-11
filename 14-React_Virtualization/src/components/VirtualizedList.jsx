import { useState } from "react";

function VirtualizedList({ list, height, width, itemHeight }) {
  const [indicies, setIndicies] = useState([
    0,
    Math.floor(height / itemHeight),
  ]);
  const visibleList = list.slice(indicies[0], indicies[1] + 1);

  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    console.log("Scroll Top", scrollTop);
    const newStartIndex = Math.floor(scrollTop / itemHeight);
    console.log("New Start Index", newStartIndex);
    const newEndIndex = newStartIndex + Math.floor(height / itemHeight);
    console.log("NewEnd Index", newEndIndex);
    setIndicies([newStartIndex, newEndIndex]);
  };

  return (
    <div
      className="container"
      style={{
        height,
        width,
        backgroundColor: "lightgray",
        overflow: "auto",
      }}
      onScroll={handleScroll}
    >
      <div style={{ height: list?.length * itemHeight, position: "relative" }}>
        {visibleList.map((item, index) => {
          return (
            <div
              className="item"
              key={index}
              style={{
                height: itemHeight,
                background: "coral",
                borderTop: "5px solid grey",
                position: "absolute",
                top: (indicies[0] + index) * itemHeight,
                width: "100%",
                textAlign: "center",
              }}
            >
              {"Item " + item}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VirtualizedList;
