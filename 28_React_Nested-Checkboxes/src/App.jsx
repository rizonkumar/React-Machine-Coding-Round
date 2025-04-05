import { useState } from "react";
import { checkBoxesData } from "./data/constants";

const CheckBoxes = ({ data, checked, setChecked }) => {
  /**
   * Handles checkbox change events
   * @param {boolean} isChecked - The new checked state (true/false)
   * @param {object} item - The checkbox item being toggled
   */
  const handleChange = (isChecked, item) => {
    setChecked((prev) => {
      // Create a new state object with the current item's state updated
      const newState = { ...prev, [item.id]: isChecked };

      /**
       * Recursively updates all children checkboxes to match parent's state
       * @param {object} parentItem - The parent item whose children need updating
       */
      const updateChildren = (parentItem) => {
        parentItem?.children?.forEach((child) => {
          // Update the child's state in newState
          newState[child?.id] = isChecked;
          // If child has children, recursively update them too
          child?.children && updateChildren(child);
        });
      };

      // Update all children of the current item
      updateChildren(item);

      return newState;
    });
  };

  return (
    <div>
      {data.map((item) => (
        <div key={item.id} className="parent">
          <input
            type="checkbox"
            id={item.id}
            checked={checked[item?.id] || false}
            onChange={(e) => handleChange(e.target.checked, item)}
          />
          <span>{item.name}</span>
          {/* Recursively render children if they exist */}
          {item.children && (
            <CheckBoxes
              data={item?.children}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [checked, setChecked] = useState({});

  return (
    <div>
      <CheckBoxes
        data={checkBoxesData}
        checked={checked}
        setChecked={setChecked}
      />
    </div>
  );
};

export default App;
