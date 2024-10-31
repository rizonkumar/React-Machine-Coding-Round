import { useState } from "react";
import "./Tabs.css";

const Tabs = ({ tabsData }) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div>
      <div className="tabs__container">
        {tabsData.map((item, index) => {
          return (
            <button
              className={`${currentTab === index ? "active" : ""}`}
              key={index}
              onClick={() => setCurrentTab(index)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="tabs__content">{tabsData[currentTab].content}</div>
    </div>
  );
};

export default Tabs;
