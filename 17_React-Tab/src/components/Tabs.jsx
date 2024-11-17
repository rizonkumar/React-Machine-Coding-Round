import { useState } from "react";

const Tabs = ({ data, onTabChange }) => {
  const [currrentTabIdx, setCurrentTabIdx] = useState(0);

  return (
    <div className="tabs">
      <div className="tabs__container">
        {data.map((item, index) => (
          <button
            className="tabs__item"
            key={index}
            data-active={currrentTabIdx === index}
            onClick={() => {
              setCurrentTabIdx(index);
              onTabChange(index);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="tabs__content">{data[currrentTabIdx].content}</div>
    </div>
  );
};

export default Tabs;
