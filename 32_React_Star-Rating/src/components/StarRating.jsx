import { useId, useState } from "react";

const STAR_PATH =
  "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";

function getFillPercent(starIndex, value) {
  if (value >= starIndex) return 100;
  if (value >= starIndex - 0.5) return 50;
  return 0;
}

function Star({ id, fillPercent, size }) {
  const gradientId = `${id}-grad`;
  const offset = `${fillPercent}%`;
  return (
    <svg
      className="star-svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset={offset} stopColor="var(--star-fill)" />
          <stop offset={offset} stopColor="var(--star-empty)" />
        </linearGradient>
      </defs>
      <path
        d={STAR_PATH}
        fill={`url(#${gradientId})`}
        stroke="var(--star-stroke)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarRating({
  totalStars = 5,
  defaultRating = 0,
  allowHalf = true,
  readOnly = false,
  size = 40,
  onChange,
}) {
  const baseId = useId();
  const [rating, setRating] = useState(defaultRating);
  const [hoverValue, setHoverValue] = useState(null);

  const displayValue = hoverValue ?? rating;
  const step = allowHalf ? 0.5 : 1;

  const getValueFromEvent = (event, starIndex) => {
    if (!allowHalf) return starIndex;
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const isLeftHalf = event.clientX - left < width / 2;
    return isLeftHalf ? starIndex - 0.5 : starIndex;
  };

  const commit = (nextValue) => {
    setRating(nextValue);
    if (onChange) onChange(nextValue);
  };

  const handleMouseMove = (event, starIndex) => {
    if (readOnly) return;
    setHoverValue(getValueFromEvent(event, starIndex));
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverValue(null);
  };

  const handleClick = (event, starIndex) => {
    if (readOnly) return;
    const nextValue = getValueFromEvent(event, starIndex);
    commit(nextValue === rating ? 0 : nextValue);
  };

  const handleKeyDown = (event) => {
    if (readOnly) return;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      commit(Math.min(totalStars, rating + step));
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      commit(Math.max(0, rating - step));
    } else if (event.key === "Home") {
      event.preventDefault();
      commit(0);
    } else if (event.key === "End") {
      event.preventDefault();
      commit(totalStars);
    }
  };

  return (
    <div className="star-rating">
      <div
        className={`star-row ${readOnly ? "read-only" : ""}`}
        role={readOnly ? "img" : "slider"}
        aria-label={readOnly ? `Rated ${rating} out of ${totalStars}` : "Star rating"}
        aria-valuemin={readOnly ? undefined : 0}
        aria-valuemax={readOnly ? undefined : totalStars}
        aria-valuenow={readOnly ? undefined : rating}
        tabIndex={readOnly ? -1 : 0}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
      >
        {Array.from({ length: totalStars }, (_, index) => {
          const starIndex = index + 1;
          return (
            <span
              key={starIndex}
              className="star-button"
              onMouseMove={(event) => handleMouseMove(event, starIndex)}
              onClick={(event) => handleClick(event, starIndex)}
            >
              <Star
                id={`${baseId}-${starIndex}`}
                fillPercent={getFillPercent(starIndex, displayValue)}
                size={size}
              />
            </span>
          );
        })}
      </div>
      <span className="star-label">
        {displayValue} / {totalStars}
      </span>
    </div>
  );
}

export default StarRating;
