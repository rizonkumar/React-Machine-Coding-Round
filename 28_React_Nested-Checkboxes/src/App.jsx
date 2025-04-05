import { useState } from "react";
import { checkBoxesData } from "./data/constants";

/**
 * Recursive checkbox component that handles nested checkbox structures
 * @param {object} props - Component props
 * @param {array} props.data - The checkbox tree data structure
 * @param {object} props.checked - Current state of checked items
 * @param {function} props.setChecked - Function to update checked state
 */
const CheckBoxes = ({ data, checked, setChecked }) => {
  /**
   * Handles checkbox change events and updates state
   * @param {boolean} isChecked - New checked state for the item
   * @param {object} item - The checkbox item being toggled
   */
  const handleChange = (isChecked, item) => {
    setChecked((prev) => {
      // Create new state with current item updated
      const newState = { ...prev, [item.id]: isChecked };

      /**
       * Recursively updates all children to match parent's state
       * @param {object} parentItem - Parent item being processed
       */
      const updateChildren = (parentItem) => {
        // Safely process each child if they exist
        parentItem?.children?.forEach((child) => {
          // Update child's state to match parent
          newState[child?.id] = isChecked;
          // Recursively process grandchildren if they exist
          child?.children && updateChildren(child);
        });
      };

      // Update all descendants of current item
      updateChildren(item);

      /**
       * Verifies and updates parent states based on children
       * @param {object} item - Current item being verified
       * @returns {boolean} - Returns true if all children are checked
       */
      const verifyChecked = (item) => {
        // Base case: if no children, return item's checked state
        if (!item?.children) return newState[item?.id] || false;

        // Check if ALL children are checked
        const allChildrenChecked = item?.children?.every((child) =>
          verifyChecked(child)
        );

        // Update parent's state in newState
        newState[item?.id] = allChildrenChecked;

        return allChildrenChecked;
      };

      // Verify and update all top-level items and their hierarchies
      checkBoxesData.forEach((item) => verifyChecked(item));

      return newState;
    });
  };

  return (
    <div className="checkbox-container">
      {data.map((item) => (
        <div key={item.id} className="parent-item">
          {/* Checkbox input element */}
          <input
            type="checkbox"
            id={item.id}
            checked={checked[item?.id] || false}
            onChange={(e) => handleChange(e.target.checked, item)}
            aria-labelledby={`label-${item.id}`}
          />
          {/* Checkbox label */}
          <span id={`label-${item.id}`}>{item.name}</span>

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
    <div className="app">
      <h1>Nested Checkboxes</h1>

      <CheckBoxes
        data={checkBoxesData}
        checked={checked}
        setChecked={setChecked}
      />

      <div className="debug-panel">
        <h3>Current Check State:</h3>
        <pre>{JSON.stringify(checked, null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;
