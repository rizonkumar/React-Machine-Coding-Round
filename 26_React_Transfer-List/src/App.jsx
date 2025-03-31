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

  const [itemsLeft, setItemsLeft] = useState(
    generateItemsObject(DEFAULT_ITEMS_LEFT)
  );

  const [itemsRight, setItemsRight] = useState(
    generateItemsObject(DEFAULT_ITEMS_RIGHT)
  );

  return (
    <div className="transfer-list">
      <ItemList items={itemsLeft} setItems={setItemsLeft} />
      <ItemList items={itemsRight} setItems={setItemsRight} />
    </div>
  );
};

export default App;
