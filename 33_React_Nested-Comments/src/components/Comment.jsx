import { useState } from "react";
import CommentForm from "./CommentForm.jsx";
import { formatRelativeTime } from "../utils/time.js";

function Comment({ comment, onReply, onDelete }) {
  const [isReplying, setIsReplying] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const childCount = comment.children.length;

  const handleReplySubmit = (text) => {
    onReply(comment.id, text);
    setIsReplying(false);
  };

  const initial = comment.author.charAt(0).toUpperCase();

  return (
    <div className="comment">
      <div className="comment-avatar">{initial}</div>

      <div className="comment-body">
        <div className="comment-meta">
          <span className="comment-author">{comment.author}</span>
          <span className="comment-time">{formatRelativeTime(comment.createdAt)}</span>
        </div>

        <p className="comment-text">{comment.text}</p>

        <div className="comment-actions">
          <button className="link-btn" onClick={() => setIsReplying((value) => !value)}>
            {isReplying ? "Cancel" : "Reply"}
          </button>
          {childCount > 0 && (
            <button className="link-btn" onClick={() => setIsCollapsed((value) => !value)}>
              {isCollapsed ? `Show replies (${childCount})` : "Hide replies"}
            </button>
          )}
          <button className="link-btn danger" onClick={() => onDelete(comment.id)}>
            Delete
          </button>
        </div>

        {isReplying && (
          <CommentForm
            onSubmit={handleReplySubmit}
            onCancel={() => setIsReplying(false)}
            placeholder={`Reply to ${comment.author}...`}
            submitLabel="Reply"
            autoFocus
          />
        )}

        {childCount > 0 && !isCollapsed && (
          <div className="comment-children">
            {comment.children.map((child) => (
              <Comment
                key={child.id}
                comment={child}
                onReply={onReply}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
