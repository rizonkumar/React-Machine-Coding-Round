import CheckedBoxItem from "./CheckedBoxItem";

const ItemList = ({ items, setItems }) => {
  return (
    <div className="transfer-list__section">
      <ul className="transfer-list__section__items">
        {Object.entries(items).map(([label, checked]) => (
          <li key={label}>
            <CheckedBoxItem
              label={label}
              checked={checked}
              onChange={() => {
                setItems((prevItems) => ({
                  ...prevItems,
                  [label]: !prevItems[label],
                }));
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
