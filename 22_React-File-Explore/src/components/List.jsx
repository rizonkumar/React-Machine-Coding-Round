import { useState } from "react";

const List = ({ list }) => {
  const [open, setOpen] = useState(false);

  console.log("List from List.jsx", list);
  return (
    <div className="container">
      {list.map((item) => (
        <div key={item.id}>
          {item.isFolder && (
            <span onClick={() => setOpen((prev) => !prev)}>
              {open ? "▼" : "▶"}
            </span>
          )}
          <span> {item.name}</span>
          {open && item.children && <List list={item.children} />}
        </div>
      ))}
    </div>
  );
};

export default List;
