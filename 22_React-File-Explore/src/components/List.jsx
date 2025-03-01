import { useState } from "react";

const List = ({ list, addFolder, deleteNode }) => {
  const [open, setOpen] = useState({});

  return (
    <div className="container">
      {list.map((item) => (
        <div key={item?.id}>
          {item?.isFolder && (
            <span
              onClick={() =>
                setOpen((prev) => ({ ...prev, [item?.id]: !prev[item?.id] }))
              }
            >
              {open?.[item?.id] ? "▼" : "▶"}
            </span>
          )}
          <span> {item?.name}</span>
          {item?.isFolder && (
            <span onClick={() => addFolder(item.id)}>
              {" "}
              <img
                className="icon"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfMt43f5llkF5OgPwtIozkZk38jQu2r-3XCg&s"
                alt={item?.name}
              />{" "}
            </span>
          )}
          <span>
            <img
              className="icon"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkTz_Rz5cU9HV9HqlgNg_jxYbkc-lQtdgYrA&s"
              alt={item?.id}
              onClick={() => deleteNode(item.id)}
            />
          </span>

          {open?.[item?.id] && item?.children && (
            <List
              list={item?.children}
              addFolder={addFolder}
              deleteNode={deleteNode}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default List;
