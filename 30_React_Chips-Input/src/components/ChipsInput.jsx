import React, { useState } from "react";

const ChipsInput = () => {
  const [inputText, setInputText] = useState("");
  const [chips, setChips] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputText.trim() !== "") {
        setChips([...chips, inputText.trim()]);
        setInputText("");
      }
    }
  };

  const handleDelete = (chipToDelete) => {
    setChips(chips.filter((chip) => chip !== chipToDelete));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "40px 0",
      }}
    >
      <h2>Chips Input</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {chips.map((chip, index) => (
          <div
            key={`${chip}-${index}`}
            style={{
              padding: "4px 8px",
              background: "#e0e0e0",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {chip}
            <button
              style={{
                marginLeft: "4px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => handleDelete(chip)}
            >
              X
            </button>
          </div>
        ))}
        <input
          type="text"
          placeholder="Type a chip and press enter"
          style={{ padding: "8px", width: "200px" }}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default ChipsInput;
