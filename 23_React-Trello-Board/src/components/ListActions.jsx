import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteList } from "../redux/actions";
import "./Trello/css/ListActions.css";

const ListActions = ({ listId, onClose }) => {
  const dispatch = useDispatch();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showAutomation, setShowAutomation] = useState(false);

  const handleDeleteList = () => {
    dispatch(deleteList(listId));
    onClose();
  };

  const colors = [
    { id: "green", className: "color-green" },
    { id: "yellow", className: "color-yellow" },
    { id: "orange", className: "color-orange" },
    { id: "red", className: "color-red" },
    { id: "purple", className: "color-purple" },
    { id: "blue", className: "color-blue" },
    { id: "teal", className: "color-teal" },
    { id: "lime", className: "color-lime" },
    { id: "pink", className: "color-pink" },
    { id: "gray", className: "color-gray" },
  ];

  const isPremium = true;

  return (
    <div className="list-actions-menu">
      <div className="list-actions-header">
        <h3>List actions</h3>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="action-item" onClick={onClose}>
        Add card
      </div>

      <div className="action-item" onClick={onClose}>
        Copy list
      </div>

      <div className="action-item" onClick={onClose}>
        Move list
      </div>

      <div className="action-item" onClick={onClose}>
        Move all cards in this list
      </div>

      <div className="action-item" onClick={onClose}>
        Sort by...
      </div>

      <div className="action-item" onClick={onClose}>
        Watch
      </div>

      <div
        className="action-item expandable"
        onClick={() => setShowColorPicker(!showColorPicker)}
      >
        Change list color
        {isPremium && <span className="premium-badge">PREMIUM</span>}
        <span className={showColorPicker ? "arrow up" : "arrow down"}></span>
      </div>

      {showColorPicker && (
        <div className="color-picker">
          <div className="colors-grid">
            {colors.map((color) => (
              <div
                key={color.id}
                className={`color-option ${color.className}`}
                onClick={() => {
                  // TODO:We would dispatch a change color action here
                  // For now, just close the menu
                  onClose();
                }}
              />
            ))}
          </div>
          <button className="remove-color">× Remove color</button>
        </div>
      )}

      <div
        className="action-item expandable"
        onClick={() => setShowAutomation(!showAutomation)}
      >
        Automation
        <span className={showAutomation ? "arrow up" : "arrow down"}></span>
      </div>

      {showAutomation && (
        <div className="automation-options">
          <div className="action-subitem">
            When a card is added to the list...
          </div>
          <div className="action-subitem">Every day, sort list by...</div>
          <div className="action-subitem">Every Monday, sort list by...</div>
          <div className="action-subitem create-rule">
            <span className="create-icon">+</span> Create a rule
          </div>
        </div>
      )}

      <div className="action-item dangerous" onClick={handleDeleteList}>
        Archive this list
      </div>
    </div>
  );
};

export default ListActions;
