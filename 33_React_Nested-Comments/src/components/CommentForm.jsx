import { useState } from "react";

function CommentForm({
  onSubmit,
  onCancel,
  placeholder = "Add a comment...",
  submitLabel = "Comment",
  autoFocus = false,
}) {
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setText("");
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        className="comment-input"
        value={text}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onChange={(event) => setText(event.target.value)}
      />
      <div className="comment-form-actions">
        <button type="submit" className="btn btn-primary" disabled={!text.trim()}>
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default CommentForm;
