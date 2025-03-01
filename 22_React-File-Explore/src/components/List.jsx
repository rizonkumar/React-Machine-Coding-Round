import { useState } from "react";
import "./List.css";

const List = ({ list, addItem, deleteNode }) => {
  const [open, setOpen] = useState({});

  const toggleFolder = (id) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="container">
      {list.map((item) => (
        <div key={item.id} className="item">
          <div className="item-row">
            {item.isFolder && (
              <span
                className="folder-icon"
                onClick={() => toggleFolder(item.id)}
              >
                {open[item.id] ? "▼" : "▶"}
              </span>
            )}
            <span className={`item-name ${item.isFolder ? "folder" : "file"}`}>
              {item.name}
            </span>
            {item.isFolder && (
              <span className="action-icon" onClick={() => addItem(item.id)}>
                <img
                  className="icon"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfMt43f5llkF5OgPwtIozkZk38jQu2r-3XCg&s"
                  alt="Add"
                  title="Add new item"
                />
              </span>
            )}
            <span className="action-icon">
              <img
                className="icon"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkTz_Rz5cU9HV9HqlgNg_jxYbkc-lQtdgYrA&s"
                alt="Delete"
                title="Delete"
                onClick={() => deleteNode(item.id)}
              />
            </span>
          </div>

          {open[item.id] && item.children && item.children.length > 0 && (
            <div className="nested-list">
              <List
                list={item.children}
                addItem={addItem}
                deleteNode={deleteNode}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default List;
