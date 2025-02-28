import { useState } from "react";
import json from "./data/constant.json";
import List from "./components/List";

const App = () => {
  const [data, setData] = useState(json);

  return (
    <div className="App">
      <h1>File/Folder Explore</h1>
      <List list={data} />
    </div>
  );
};

export default App;
