import ProgressBar from "./components/ProgressBar";
import "./App.css";

const App = () => {
  const bars = [1, 20, 40, 60, 80, 100];

  return (
    <div className="App">
      {bars.map((bar) => (
        <ProgressBar progress={bar} key={bar} />
      ))}
    </div>
  );
};

export default App;
