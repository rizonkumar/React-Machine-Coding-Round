# React Machine Coding: Star Rating

## Problem Statement

Design and implement a reusable **Star Rating** component in React, similar to the rating widgets found on e-commerce and review sites. The component must support hover previews, half-star precision, a read-only display mode, and full keyboard accessibility — all without any external UI libraries.

### Functional Requirements

1. **Configurable Stars**: Render a configurable number of stars (default 5) via a `totalStars` prop.
2. **Hover Preview**: Hovering over the stars must preview the rating in real time. Moving the cursor away reverts to the last committed value.
3. **Click to Commit**: Clicking a star sets the rating and notifies the parent through an `onChange` callback.
4. **Half-Star Precision**: When `allowHalf` is enabled, the selected value depends on whether the cursor is over the left or right half of a star (e.g. `2.5`).
5. **Clear on Re-click**: Clicking the currently selected value resets the rating back to `0`.
6. **Read-Only Mode**: A `readOnly` prop renders a purely presentational widget (useful for showing an average rating like `4.5`).
7. **Keyboard Accessibility**: The control is focusable and operable with `Arrow` keys, plus `Home`/`End` to jump to the minimum/maximum.
8. **Numeric Label**: Display the active value alongside the stars (e.g. `3.5 / 5`).

### Technical Constraints

- Use functional components and React Hooks only.
- Do not use external libraries for state, UI, or icons (the star is an inline SVG).
- Ensure strict mode compatibility (no side effects in render).

---

## Implementation Notes & key Concepts

### 1. Minimal State + Derived Rendering

**Concept**: Keep the smallest possible source of truth and derive everything else during render.

Only two pieces of state are needed: `rating` (the committed value) and `hoverValue` (the transient preview). The value actually painted on screen is derived, never stored separately:

```javascript
const displayValue = hoverValue ?? rating;
```

Using the nullish coalescing operator (`??`) means the hover preview transparently takes over while hovering (`hoverValue` is a number) and cleanly falls back to the committed `rating` the moment the cursor leaves (`hoverValue` is `null`). A `0` preview is preserved because `??` only falls back on `null`/`undefined`, not on falsy `0`.

### 2. Half-Star Detection with `getBoundingClientRect`

**Concept**: Translating a mouse position into a fractional rating.

To decide between a half and a full star, we compare the cursor's horizontal position against the midpoint of the hovered star's bounding box:

```javascript
const getValueFromEvent = (event, starIndex) => {
  if (!allowHalf) return starIndex;
  const { left, width } = event.currentTarget.getBoundingClientRect();
  const isLeftHalf = event.clientX - left < width / 2;
  return isLeftHalf ? starIndex - 0.5 : starIndex;
};
```

The same helper drives both `onMouseMove` (preview) and `onClick` (commit), so the interaction always feels consistent.

### 3. Rendering a Partially Filled Star

**Concept**: One SVG path can be filled to any percentage using an SVG `linearGradient` with two stops at the **same** offset.

```javascript
<linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
  <stop offset={`${fillPercent}%`} stopColor="var(--star-fill)" />
  <stop offset={`${fillPercent}%`} stopColor="var(--star-empty)" />
</linearGradient>
```

Because both stops share the same offset, the gradient has a hard edge: everything to the left is the fill colour and everything to the right is the empty colour. Setting `fillPercent` to `100`, `50`, or `0` yields a full, half, or empty star respectively. `useId()` guarantees the gradient ids are unique even when several `StarRating` instances live on the same page.

### 4. Controlled vs. Uncontrolled + Accessibility

**Concept**: A component can be self-managing yet still observable.

The component manages its own `rating` internally (seeded by `defaultRating`) while exposing an `onChange` callback so a parent can react to selections. For accessibility, the star row uses `role="slider"` with `aria-valuemin`/`aria-valuemax`/`aria-valuenow`, is reachable via `tabIndex`, and handles keyboard input:

```javascript
const handleKeyDown = (event) => {
  if (event.key === "ArrowRight" || event.key === "ArrowUp") {
    event.preventDefault();
    commit(Math.min(totalStars, rating + step));
  } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
    event.preventDefault();
    commit(Math.max(0, rating - step));
  }
};
```

The `step` is `0.5` when `allowHalf` is on, otherwise `1`, so keyboard interaction respects the same precision as the mouse.

---

## Code Walkthrough

### `StarRating.jsx`

The main component and its `Star` presentational child.

- **Props**: `totalStars`, `defaultRating`, `allowHalf`, `readOnly`, `size`, and `onChange`.
- **`getFillPercent`**: A pure helper mapping a star index and the active value to `100`, `50`, or `0`.
- **`getValueFromEvent`**: Converts a pointer event into a rating using `getBoundingClientRect` for half-star math.
- **`commit`**: Updates `rating` and fires `onChange`; re-clicking the same value clears to `0`.
- **`handleMouseMove` / `handleMouseLeave`**: Manage the transient `hoverValue` preview.
- **`handleKeyDown`**: Arrow/Home/End keyboard support gated behind `readOnly`.
- **`Star`**: A stateless SVG that paints itself to a given `fillPercent` via a gradient.

### `App.jsx`

The demo container showing three usages of the same component:

- An **interactive** half-star rating wired to local state via `onChange`.
- A **whole-star-only** variant (`allowHalf={false}`).
- A **read-only** average display (`readOnly` with a `4.5` value).
