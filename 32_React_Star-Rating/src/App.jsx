import { useState } from "react";
import "./App.css";
import StarRating from "./components/StarRating.jsx";

function App() {
  const [rating, setRating] = useState(0);

  return (
    <div className="app">
      <h1>React Star Rating</h1>

      <section className="demo-card">
        <h2>Interactive (half-star)</h2>
        <StarRating defaultRating={0} onChange={setRating} />
        <p className="demo-hint">
          You selected: <strong>{rating}</strong>
        </p>
      </section>

      <section className="demo-card">
        <h2>Whole stars only</h2>
        <StarRating defaultRating={3} allowHalf={false} />
      </section>

      <section className="demo-card">
        <h2>Read-only (average)</h2>
        <StarRating defaultRating={4.5} readOnly size={28} />
      </section>
    </div>
  );
}

export default App;
