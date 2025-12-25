import { useEffect, useRef, useState } from "react";
import Modal from "./Modal.jsx";

const STORY_LIFETIME = 15000;
const MODAL_CLOSE_TIME = 3000;

const InstagramStory = () => {
  const [stories, setStories] = useState([]);
  const [activeStory, setActiveStory] = useState(null);

  const storyTimersRef = useRef({});
  const modalTimerRef = useRef(null);

  const uploadStory = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const id = crypto.randomUUID();

    const newStory = { id, url };
    setStories((prev) => [...prev, newStory]);

    storyTimersRef.current[id] = setTimeout(() => {
      setStories((prev) => prev.filter((story) => story.id !== id));
      URL.revokeObjectURL(url);
      delete storyTimersRef.current[id];
    }, STORY_LIFETIME);
  };

  const handleStoryClick = (url) => {
    setActiveStory(url);

    if (modalTimerRef.current) {
      clearTimeout(modalTimerRef.current);
    }

    modalTimerRef.current = setTimeout(() => {
      setActiveStory(null);
    }, MODAL_CLOSE_TIME);
  };

  useEffect(() => {
    return () => {
      Object.values(storyTimersRef.current).forEach(clearTimeout);

      if (modalTimerRef.current) {
        clearTimeout(modalTimerRef.current);
      }

      stories.forEach((story) => URL.revokeObjectURL(story.url));
    };
  }, [stories]);

  return (
    <>
      {activeStory && (
        <Modal
          imageSrc={activeStory}
          onClose={() => setActiveStory(null)}
          duration={MODAL_CLOSE_TIME}
        />
      )}

      <div className="story-row">
        <div className="story-item add-story">
          <div className="story-ring">
            <div className="story-ring-inner" style={{ background: "#fafafa" }}>
              <label
                style={{
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input
                  type="file"
                  hidden
                  onChange={uploadStory}
                  accept="image/*"
                />
                <span className="plus-icon">+</span>
              </label>
            </div>
          </div>
          <span style={{ fontSize: "0.8rem" }}>Add Story</span>
        </div>

        {stories.map(({ id, url }) => (
          <div
            key={id}
            className="story-item"
            onClick={() => handleStoryClick(url)}
          >
            <div className="story-ring">
              <div className="story-ring-inner">
                <img src={url} alt="story preview" className="story-img" />
              </div>
            </div>
            <span
              style={{
                fontSize: "0.8rem",
                maxWidth: "80px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              User {id.slice(0, 4)}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default InstagramStory;
