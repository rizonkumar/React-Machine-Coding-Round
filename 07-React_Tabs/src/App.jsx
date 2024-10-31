import "./App.css";
import Tabs from "./components/Tabs";
import data from "./constants/data.json";

function App() {
  return (
    <>
      <Tabs tabsData={data.tabsData} />
    </>
  );
}

export default App;
