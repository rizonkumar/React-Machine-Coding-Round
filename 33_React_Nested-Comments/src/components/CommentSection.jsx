import { useState } from "react";
import Comment from "./Comment.jsx";
import CommentForm from "./CommentForm.jsx";
import seedData from "../constants/data.json";

function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `c-${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}

function normalize(nodes) {
  return nodes.map((node) => ({
    id: node.id,
    author: node.author,
    text: node.text,
    createdAt: Date.now() - node.ageMinutes * 60000,
    children: normalize(node.children),
  }));
}

function addComment(nodes, parentId, newNode) {
  if (parentId === null) return [...nodes, newNode];

  return nodes.map((node) => {
    if (node.id === parentId) {
      return { ...node, children: [...node.children, newNode] };
    }
    if (node.children.length === 0) return node;
    return { ...node, children: addComment(node.children, parentId, newNode) };
  });
}

function deleteComment(nodes, id) {
  return nodes
    .filter((node) => node.id !== id)
    .map((node) => ({ ...node, children: deleteComment(node.children, id) }));
}

function CommentSection() {
  const [comments, setComments] = useState(() => normalize(seedData));

  const handleAdd = (parentId, text) => {
    const newNode = {
      id: createId(),
      author: "You",
      text,
      createdAt: Date.now(),
      children: [],
    };
    setComments((prev) => addComment(prev, parentId, newNode));
  };

  const handleDelete = (id) => {
    setComments((prev) => deleteComment(prev, id));
  };

  return (
    <div className="comment-section">
      <header className="comment-section-header">
        <h1>Discussion</h1>
        <span className="comment-count">{comments.length} top-level comments</span>
      </header>

      <CommentForm
        onSubmit={(text) => handleAdd(null, text)}
        placeholder="What are your thoughts?"
        submitLabel="Comment"
      />

      <div className="comment-list">
        {comments.length === 0 ? (
          <p className="empty-state">No comments yet. Be the first to comment.</p>
        ) : (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onReply={handleAdd}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSection;
