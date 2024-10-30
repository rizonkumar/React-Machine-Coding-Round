import { useState } from "react";

const Accordion = ({ qna }) => {
  const [show, setShow] = useState(false);

  return (
    <div className={`accordion ${show ? "active" : ""}`}>
      <button className="accordion-header" onClick={() => setShow(!show)}>
        <span className="question">{qna.question}</span>
        <span className="icon">{show ? "−" : "+"}</span>
      </button>
      <div className={`accordion-content ${show ? "show" : ""}`}>
        <p>{qna.answer}</p>
      </div>
    </div>
  );
};

export default Accordion;
