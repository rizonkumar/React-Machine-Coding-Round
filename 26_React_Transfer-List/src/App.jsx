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

  function transferSelectedItems(
    itemSource,
    setItemSource,
    itemTarget,
    setItemTarget
  ) {
    setItemTarget((prevItems) => ({
      ...prevItems,
      ...Object.fromEntries(
        Object.entries(itemSource).filter(([_, checked]) => checked)
      ),
    }));
    setItemSource((prevItems) =>
      Object.fromEntries(
        Object.entries(prevItems).filter(([_, checked]) => !checked)
      )
    );
  }

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
        disabled={hasNoSelectedItems(itemsRight)}
        onClick={() =>
          transferSelectedItems(
            itemsRight,
            setItemsRight,
            itemsLeft,
            setItemsLeft
          )
        }
      >
        <span aria-hidden="true">&lt;</span>
      </button>
      <button
        aria-label="Transfer selected items to right list"
        disabled={hasNoSelectedItems(itemsLeft)}
        onClick={() =>
          transferSelectedItems(
            itemsLeft,
            setItemsLeft,
            itemsRight,
            setItemsRight
          )
        }
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
