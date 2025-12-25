import { useEffect } from "react";

const Modal = ({ imageSrc, onClose, duration = 3000 }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="overlay-modal" onClick={onClose}>
      <div className="story-viewer" onClick={(e) => e.stopPropagation()}>
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>

        <div className="story-header">
          <div className="user-info">
            <div className="user-avatar" />
            <span>Your Story</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <img src={imageSrc} alt="Story" className="story-image-full" />
      </div>
    </div>
  );
};
export default Modal;
