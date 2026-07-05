export function formatRelativeTime(createdAt) {
  const seconds = Math.floor((Date.now() - createdAt) / 1000);

  if (seconds < 60) return "just now";

  const units = [
    { label: "y", secs: 31536000 },
    { label: "mo", secs: 2592000 },
    { label: "d", secs: 86400 },
    { label: "h", secs: 3600 },
    { label: "m", secs: 60 },
  ];

  for (const unit of units) {
    const value = Math.floor(seconds / unit.secs);
    if (value >= 1) return `${value}${unit.label} ago`;
  }

  return "just now";
}
