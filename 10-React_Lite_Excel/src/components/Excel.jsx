import React, { useState } from "react";
import "./Excel.css";

const Excel = () => {
  const [row, setRow] = useState(2);
  const [col, setCol] = useState(2);
  const [grid, setGrid] = useState(createGrid(2, 2));

  function createGrid(rows, cols) {
    const data = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push("");
      }
      data.push(row);
    }
    // OR above code can be written as
    // const data = new Array(rows).fill("").map((_) => new Array(cols).fill(""));
    return data;
  }

  const addRows = () => {
    setRow(row + 1);
    setGrid(createGrid(row + 1, col));
  };

  const addCols = () => {
    setCol(col + 1);
    setGrid(createGrid(row, col + 1));
  };

  // Implemement the delete row and column selected
  // any other approach of delete col and row col?
  const deleleteRow = (rowIndex) => {
    const newGrid = [...grid]; // shallow copy
    newGrid.splice(rowIndex, 1);
    setGrid(newGrid);
  };

  const deleteCol = (colIndex) => {
    const newGrid = [...grid]; // shallow copy
    newGrid.forEach((row) => row.splice(colIndex, 1));
    setGrid(newGrid);
  };

  const handleCallValueChange = (rowIndex, colIndex, value) => {
    const newGrid = [...grid]; // shallow copy
    newGrid[rowIndex][colIndex] = value;
    setGrid(newGrid);
  };

  const calculateForumula = (formula) => {
    // for now only performing addition
    const numbers = formula
      .substring(1)
      .split("+")
      .map((num) => parseFloat(num.trim()) || 0);
    return numbers.reduce((sum, num) => sum + num, 0);
  };

  return (
    <div className="excel-container">
      <h1 className="excel-title">Excel Lite</h1>
      <div className="table-wrapper">
        <table className="excel-table">
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="table-cell">
                    <input
                      type="text"
                      value={cell}
                      className="cell-input"
                      onBlur={(e) => {
                        if (e.target.value.startsWith("=")) {
                          const result = calculateForumula(e.target.value);
                          handleCallValueChange(rowIndex, cellIndex, result);
                        }
                      }}
                      onChange={(e) =>
                        handleCallValueChange(
                          rowIndex,
                          cellIndex,
                          e.target.value
                        )
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="button-container">
        <button className="action-button add" onClick={addRows}>
          Add Row
        </button>
        <button className="action-button add" onClick={addCols}>
          Add Column
        </button>
        <button className="action-button delete" onClick={deleleteRow}>
          Delete Row
        </button>
        <button className="action-button delete" onClick={deleteCol}>
          Delete Column
        </button>
      </div>
    </div>
  );
};

export default Excel;
