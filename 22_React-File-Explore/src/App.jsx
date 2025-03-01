import { useState } from "react";
import json from "./data/constant.json";
import List from "./components/List";
import "./App.css";

const App = () => {
  const [data, setData] = useState(json);
  const [showModal, setShowModal] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemType, setNewItemType] = useState("folder");
  const [currentParentId, setCurrentParentId] = useState(null);

  const addItem = (parentId) => {
    setCurrentParentId(parentId);
    setNewItemName("");
    setShowModal(true);
  };

  const handleCreateItem = () => {
    if (!newItemName.trim()) return;

    const updateTree = (list) => {
      return list.map((item) => {
        if (item.id === currentParentId) {
          return {
            ...item,
            children: [
              ...(item.children || []),
              {
                id: Math.random(),
                name: newItemName,
                isFolder: newItemType === "folder",
                children: newItemType === "folder" ? [] : undefined,
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
        return item;
      });
    };

    setData(updateTree(data));
    setShowModal(false);
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
    setData(updateTree(data));
  };

  return (
    <div className="App">
      <h1>File/Folder Explorer</h1>
      <List list={data} addItem={addItem} deleteNode={deleteNode} />

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Create New Item</h3>
            <div className="type-selector">
              <label>
                <input
                  type="radio"
                  name="itemType"
                  value="folder"
                  checked={newItemType === "folder"}
                  onChange={() => setNewItemType("folder")}
                />
                Folder
              </label>
              <label>
                <input
                  type="radio"
                  name="itemType"
                  value="file"
                  checked={newItemType === "file"}
                  onChange={() => setNewItemType("file")}
                />
                File
              </label>
            </div>
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder={`Enter ${newItemType} name`}
              className="name-input"
            />
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={handleCreateItem}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
