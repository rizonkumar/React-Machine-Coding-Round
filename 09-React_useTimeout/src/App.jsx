import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Create a hook to easily use setTimeout(callback, delay).</h1>
      <ol>
        <li>
          <strong>Reset the timer if delay changes</strong>
        </li>
        <li>
          <strong>DO NOT reset the timer if only callback changes</strong>
        </li>
      </ol>
    </div>
  );
}

export default App;
