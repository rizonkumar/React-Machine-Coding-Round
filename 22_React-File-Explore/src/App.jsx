import { useState } from "react";
import json from "./data/constant.json";
import List from "./components/List";

const App = () => {
  const [data, setData] = useState(json);

  const addFolder = (parentId) => {
    const name = prompt("Enter folder name:");
    const updateTree = (list) => {
      return list.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            children: [
              ...item.children,
              {
                id: Math.random(),
                name: name, // TODO: we need to ask user to enter name using input feild
                isFolder: true, //TODO: we need to ask user to create folder/file.
                children: [],
              },
            ],
          };
        }
        if (item.children) {
          return {
            ...item,
            children: updateTree(item.children),
          };
        }
      });
    };
    setData((prev) => updateTree(prev));
  };

  const deleteNode = (itemId) => {
    const updateTree = (list) => {
      return list
        .filter((item) => item.id !== itemId)
        .map((item) => {
          if (item.children) {
            return {
              ...item,
              children: updateTree(item.children),
            };
          }
          return item;
        });
    };
    setData((prev) => updateTree(prev));
  };

  return (
    <div className="App">
      <h1>File/Folder Explore</h1>
      <List list={data} addFolder={addFolder} deleteNode={deleteNode} />
    </div>
  );
};

export default App;
