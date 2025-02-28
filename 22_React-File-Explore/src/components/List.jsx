import { useState } from "react";

const List = ({ list }) => {
  const [open, setOpen] = useState({});

  console.log("List from List.jsx", list);
  return (
    <div className="container">
      {list.map((item) => (
        <div key={item.id}>
          {item.isFolder && (
            <span
              onClick={() =>
                setOpen((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
              }
            >
              {open?.[item.id] ? "▼" : "▶"}
            </span>
          )}
          <span> {item.name}</span>
          {open?.[item.id] && item.children && <List list={item.children} />}
        </div>
      ))}
    </div>
  );
};

export default List;
