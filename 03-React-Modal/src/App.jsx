import { useState } from "react";
import "./App.css";
import Modal from "./components/Modal";

function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="App">
      <button className="modal-button" onClick={() => setShowModal(true)}>
        Show Modal
      </button>
      <Modal isOpen={showModal} closeModal={() => setShowModal(false)} />
    </div>
  );
}

export default App;
