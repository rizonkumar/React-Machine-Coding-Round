import { useState } from "react";
import ItemList from "./components/ItemList";

const DEFAULT_ITEMS_RIGHT = ["HTML", "CSS", "JS", "Typescript"];
const DEFAULT_ITEMS_LEFT = ["React", "Node", "MongoDB"];

const App = () => {
  function generateItemsObject(items) {
    return items.reduce((acc, item) => {
      acc[item] = false;
      return acc;
    }, {});
  }

  function hasNoSelectedItems(items) {
    return Object.values(items).every((item) => !item);
  }

  function transferAllItems(
    itemSource,
    setItemSource,
    itemTarget,
    setItemTarget
  ) {
    setItemTarget((prevItems) => ({ ...prevItems, ...itemSource }));
    setItemSource({});
  }

  function transferSelectedItems() {}

  const [itemsLeft, setItemsLeft] = useState(
    generateItemsObject(DEFAULT_ITEMS_LEFT)
  );

  const [itemsRight, setItemsRight] = useState(
    generateItemsObject(DEFAULT_ITEMS_RIGHT)
  );

  return (
    <div className="transfer-list">
      <ItemList items={itemsLeft} setItems={setItemsLeft} />
      <button
        aria-label="Transfer all items to left list"
        onClick={() =>
          transferAllItems(itemsRight, setItemsRight, itemsLeft, setItemsLeft)
        }
        disabled={Object.keys(itemsRight).length === 0}
      >
        <span aria-hidden="true">&lt;&lt;</span>
      </button>
      <button
        aria-label="Transfer selected items to left list"
        disabled={hasNoSelectedItems(itemsLeft)}
      >
        <span aria-hidden="true">&lt;</span>
      </button>
      <button
        aria-label="Transfer selected items to right list"
        disabled={hasNoSelectedItems(itemsRight)}
      >
        <span aria-hidden="true">&gt;</span>
      </button>
      <button
        aria-label="Transfer all items to right list"
        onClick={() =>
          transferAllItems(itemsLeft, setItemsLeft, itemsRight, setItemsRight)
        }
        disabled={Object.keys(itemsLeft).length === 0}
      >
        <span aria-hidden="true">&gt;&gt;</span>
      </button>
      <ItemList items={itemsRight} setItems={setItemsRight} />
    </div>
  );
};

export default App;
