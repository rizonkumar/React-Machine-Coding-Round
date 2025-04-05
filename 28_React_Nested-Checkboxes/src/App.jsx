import { useState } from "react";
import { checkBoxesData } from "./data/constants";

const CheckBoxes = ({ data, checked, setChecked }) => {
  const handleChange = (e, id) => {
    setChecked((prev) => {
      const newState = { ...prev, [id]: e.target.checked };
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
            onChange={(e) => handleChange(e, item.id)}
          />
          <span>{item.name}</span>
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
