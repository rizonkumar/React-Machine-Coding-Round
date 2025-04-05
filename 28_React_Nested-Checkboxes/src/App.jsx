import { useState } from "react";
import { checkBoxesData } from "./data/constants";

const CheckBoxes = ({ data, checked, setChecked }) => {
  const handleChange = (isChecked, item) => {
    const updateCheckedState = (items, targetId, newChecked) => {
      const newState = { ...checked };

      // Update the target item and its children recursively
      const updateItem = (currentItem) => {
        if (currentItem.id === targetId) {
          newState[currentItem.id] = newChecked;
          currentItem.children?.forEach((child) => {
            newState[child.id] = newChecked;
            updateItem(child);
          });
        } else {
          currentItem.children?.forEach(updateItem);
        }
      };
      items.forEach(updateItem);

      // Update all parents recursively based on children's states
      const updateParents = (currentItem) => {
        const parent = findParent(data, currentItem.id);
        if (parent) {
          const childrenStates = parent.children.map(
            (child) => newState[child.id]
          );
          const allChecked = childrenStates.every((state) => state === true);
          const someChecked = childrenStates.some((state) => state === true);
          newState[parent.id] = allChecked
            ? true
            : someChecked
            ? "indeterminate"
            : false;
          updateParents(parent);
        }
      };
      updateParents(item);

      return newState;
    };

    const newCheckedState = updateCheckedState(data, item.id, isChecked);
    setChecked(newCheckedState);
  };

  const findParent = (items, childId) => {
    for (const item of items) {
      if (item.children?.some((child) => child.id === childId)) {
        return item;
      }
      if (item.children) {
        const found = findParent(item.children, childId);
        if (found) return found;
      }
    }
    return null;
  };

  return (
    <div>
      {data.map((item) => (
        <div key={item.id} className="parent">
          <input
            type="checkbox"
            id={item.id}
            checked={checked[item.id] === true}
            ref={(el) => {
              if (el) {
                el.indeterminate = checked[item.id] === "indeterminate";
              }
            }}
            onChange={(e) => handleChange(e.target.checked, item)}
          />
          <span>{item.name}</span>
          {item.children && (
            <CheckBoxes
              data={item.children}
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
      <div className="debug-state">
        <h3>Current State:</h3>
        <pre>{JSON.stringify(checked, null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;
