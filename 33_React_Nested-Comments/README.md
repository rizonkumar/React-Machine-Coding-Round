# React Machine Coding: Nested Comments

## Problem Statement

Design and implement a **Nested Comments** system similar to Reddit, YouTube, or Hacker News using React. Comments can be nested to an arbitrary depth, and users can reply to any comment, delete a comment (along with its entire thread), and collapse deep threads — all on the client with no backend or external libraries.

### Functional Requirements

1. **Recursive Rendering**: Render a comment tree of arbitrary depth, indenting each level of replies.
2. **Add Comment**: Post a new top-level comment via a form at the top of the discussion.
3. **Reply**: Every comment has a "Reply" action that reveals an inline form and nests the new comment one level deeper.
4. **Delete Subtree**: Deleting a comment must also remove all of its descendants.
5. **Collapse / Expand**: A comment with replies can hide its thread, showing a "Show replies (N)" indicator with the hidden count.
6. **Relative Timestamps**: Each comment shows a human-friendly relative time (e.g. `2h ago`).

### Technical Constraints

- Use functional components and React Hooks.
- Do not use external libraries for state or UI.
- Ensure strict mode compatibility (no side effects in render, no state mutation).

---

## Implementation Notes & key Concepts

### 1. Recursive Component Rendering

**Concept**: A component that renders itself is the natural fit for tree-shaped data.

`Comment.jsx` renders one comment and then maps its `children` back into more `<Comment />` elements. The recursion terminates automatically when a node has no children.

```javascript
{comment.children.map((child) => (
  <Comment key={child.id} comment={child} onReply={onReply} onDelete={onDelete} />
))}
```

Because the handlers (`onReply`, `onDelete`) are threaded straight down, every node — no matter how deep — talks to the same logic living at the top.

### 2. Immutable Updates on a Nested Tree

**Concept**: Never mutate state. To change one node deep in a tree, rebuild the path to it while sharing everything else.

The helpers recurse level by level, returning **new** arrays and objects only where something changed:

```javascript
function addComment(nodes, parentId, newNode) {
  if (parentId === null) return [...nodes, newNode];

  return nodes.map((node) => {
    if (node.id === parentId) {
      return { ...node, children: [...node.children, newNode] };
    }
    return { ...node, children: addComment(node.children, parentId, newNode) };
  });
}
```

Deleting a subtree is even simpler — `filter` the target id out at every level, so a removed node takes its descendants with it:

```javascript
function deleteComment(nodes, id) {
  return nodes
    .filter((node) => node.id !== id)
    .map((node) => ({ ...node, children: deleteComment(node.children, id) }));
}
```

### 3. Single Source of Truth & One-Way Data Flow

**Concept**: Keep the entire tree in one place and pass behavior down, not state.

`CommentSection.jsx` owns the whole `comments` tree in a single `useState`. Children never hold a copy of the data — they receive the node to render plus callbacks. This makes reasoning about updates trivial: every change funnels through `handleAdd` / `handleDelete` and produces a brand-new tree.

### 4. Local UI State vs. Lifted Data State

**Concept**: Not everything belongs in the top-level store.

Whether a comment's reply box is open (`isReplying`) or its thread is collapsed (`isCollapsed`) is **presentation state** that only matters to that one comment. It lives locally in `Comment.jsx` with `useState`, keeping the shared tree focused purely on the data.

```javascript
const [isReplying, setIsReplying] = useState(false);
const [isCollapsed, setIsCollapsed] = useState(false);
```

---

## Code Walkthrough

### `CommentSection.jsx`

The smart container and the single source of truth.

- **State**: Holds the full `comments` tree, seeded from `constants/data.json` via a `normalize` helper that converts each seed's `ageMinutes` into a real `createdAt` timestamp.
- **`addComment` / `deleteComment`**: Pure recursive helpers that return a new tree without mutation.
- **`handleAdd(parentId, text)`**: Builds a new node (id via `crypto.randomUUID()`) and inserts it — `parentId === null` appends a top-level comment, otherwise it nests under the target.
- **`handleDelete(id)`**: Removes a node and its subtree.

### `Comment.jsx`

The recursive, mostly presentational node.

- Renders the author, relative time, text, and action buttons (Reply, Hide/Show replies, Delete).
- Holds local `isReplying` and `isCollapsed` UI state.
- Recursively renders its `children` inside an indented container, which is what produces the nesting.

### `CommentForm.jsx`

A reusable controlled form.

- Used both as the top-level "add comment" box and as the inline reply box.
- Configurable via `placeholder`, `submitLabel`, `onCancel`, and `autoFocus` props; calls `onSubmit(text)` with trimmed input and clears itself.

### `App.jsx`

Renders the single `<CommentSection />` container.
