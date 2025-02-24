# Code Notes: Progress Bar Implementation

## Code Flow

1. **`ProgressBar` Component**:

   - The `ProgressBar` component takes a `progress` prop (a number between 0 and 100) and renders a progress bar.
   - It uses `useState` to manage the animated progress value (`animatedProgress`).
   - The `useEffect` hook is used to animate the progress bar when the `progress` prop changes.
   - The `inner` div's width is controlled by the `transform: translateX()` property, which animates the progress bar horizontally.
   - The text color inside the progress bar changes dynamically based on the progress value.

2. **`App` Component**:

   - The `App` component renders multiple `ProgressBar` components.
   - It uses an array `bars` containing progress values (`[1, 20, 40, 60, 80, 100]`).
   - Each value in the `bars` array is passed as a `progress` prop to a `ProgressBar` component.

3. **CSS Styling**:
   - The `.outer` class defines the container for the progress bar, with a border, rounded corners, and hidden overflow.
   - The `.inner` class defines the progress bar's appearance, including its background color, padding, text alignment, and transition animation.

---

## Key Concepts

### 1. **`useEffect` Hook**

- **Purpose**: The `useEffect` hook is used to perform side effects in functional components. In this case, it handles the animation of the progress bar.
- **How it works**:
  - The `useEffect` hook listens for changes in the `progress` prop.
  - When the `progress` prop changes, it triggers a `setTimeout` to update the `animatedProgress` state after a 100ms delay.
  - This delay creates a smooth animation effect for the progress bar.
- **Dependency Array**: `[progress]` ensures the effect runs only when the `progress` prop changes.

```javascript
useEffect(() => {
  setTimeout(() => setAnimatedProgress(progress), 100);
}, [progress]);
```

---

### 2. **`setTimeout`**

- **Purpose**: `setTimeout` is used to introduce a delay before updating the `animatedProgress` state.
- **Why it's used**:
  - Without `setTimeout`, the progress bar would update instantly, making the animation less smooth.
  - The 100ms delay ensures the progress bar animates gradually, creating a visually appealing effect.

```javascript
setTimeout(() => setAnimatedProgress(progress), 100);
```

---

### 3. **Accessibility**

- **Purpose**: Accessibility features ensure the progress bar is usable and understandable for all users, including those using screen readers.
- **Key Accessibility Attributes**:
  - `role="progressbar"`: Indicates that the element is a progress bar.
  - `aria-valuenow={progress}`: Represents the current progress value.
  - `aria-valuemin="0"`: Indicates the minimum value of the progress bar (0%).
  - `aria-valuemax="100"`: Indicates the maximum value of the progress bar (100%).

```javascript
<div
  className="inner"
  role="progressbar"
  aria-valuenow={progress}
  aria-valuemin="0"
  aria-valuemax="100"
>
  {progress}%
</div>
```

---

## Code Breakdown

### `ProgressBar` Component

```javascript
const ProgressBar = ({ progress }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => setAnimatedProgress(progress), 100);
  }, [progress]);

  return (
    <div className="outer">
      <div
        className="inner"
        style={{
          transform: `translateX(${animatedProgress - 100}%)`,
          color: animatedProgress < 5 ? "black" : "white",
        }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {progress}%
      </div>
    </div>
  );
};
```

- **State**: `animatedProgress` is used to animate the progress bar.
- **Effect**: `useEffect` updates `animatedProgress` with a 100ms delay.
- **Rendering**:
  - The `outer` div is the container.
  - The `inner` div represents the progress bar, with its width controlled by `transform: translateX()`.
  - The text color changes dynamically based on the progress value.

---

### `App` Component

```javascript
const App = () => {
  const bars = [1, 20, 40, 60, 80, 100];

  return (
    <div className="App">
      {bars.map((bar) => (
        <ProgressBar progress={bar} key={bar} />
      ))}
    </div>
  );
};
```

- **`bars` Array**: Contains progress values to be displayed.
- **Rendering**: Maps over the `bars` array and renders a `ProgressBar` for each value.

---

### CSS Styling

```css
.outer {
  border: 1px solid black;
  border-radius: 10px;
  overflow: hidden;
  margin: 10px 0;
}

.inner {
  background-color: green;
  padding: 1px;
  text-align: right;
  transition: 0.5s ease-in;
}
```

- **`.outer`**:
  - Defines the container for the progress bar.
  - Uses `overflow: hidden` to clip the inner progress bar.
- **`.inner`**:
  - Defines the progress bar's appearance.
  - Uses `transition` to animate the width change smoothly.

---

## Summary

- **Code Flow**:

  1. The `App` component renders multiple `ProgressBar` components with different progress values.
  2. Each `ProgressBar` animates its width based on the `progress` prop.
  3. The `useEffect` hook and `setTimeout` work together to create a smooth animation.
  4. Accessibility attributes make the progress bar usable for screen readers.

- **Key Takeaways**:
  - `useEffect` handles side effects (e.g., animations) in response to prop changes.
  - `setTimeout` introduces a delay for smoother animations.
  - Accessibility attributes (`role`, `aria-*`) ensure the component is inclusive.

---
