import Tabs from "./components/Tabs";
import "./App.css";

function App() {
  const tabsData = [
    {
      label: "Profile",
      content: <div>Profile Info Content</div>,
    },
    {
      label: "Dashboard",
      content: <div>Dashboard Content</div>,
    },
    {
      label: "Settings",
      content: <div>Settings Content</div>,
    },
    {
      label: "Invoice",
      content: <div>Invoice Content</div>,
    },
  ];
  return (
    <>
      <Tabs data={tabsData} />
    </>
  );
}

export default App;
