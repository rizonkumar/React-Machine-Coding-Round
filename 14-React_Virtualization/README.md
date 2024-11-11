# Understanding Virtualization in React

## What is Virtualization?

Virtualization is a technique used to render only the visible portion of a large list of items, improving performance by reducing the number of DOM elements rendered at any given time. This is particularly useful when dealing with long lists or infinite scrolling implementations.

## When to Use Virtualization

Use virtualization when:
- Rendering large lists (hundreds or thousands of items)
- Dealing with infinite scroll implementations
- Performance optimization is needed
- Memory usage needs to be reduced
- Smooth scrolling experience is required

## Code Breakdown

Let's break down the implementation step by step.

### Component Props
```javascript
function VirtualizedList({ list, height, width, itemHeight })
```
- `list`: Array of items to be rendered
- `height`: Container height
- `width`: Container width
- `itemHeight`: Height of each list item

### State Management
```javascript
const [indicies, setIndicies] = useState([0, Math.floor(height / itemHeight)]);
```
- Maintains visible items' start and end indices
- Initial state:
    - Start index: 0
    - End index: Number of items that fit in the visible area

### Visible Items Calculation
```javascript
const visibleList = list.slice(indicies[0], indicies[1] + 1);
```
- Creates a subset of the list containing only visible items
- Uses array slice from start index to end index + 1

### Scroll Handler
```javascript
const handleScroll = (e) => {
  const { scrollTop } = e.target;
  const newStartIndex = Math.floor(scrollTop / itemHeight);
  const newEndIndex = newStartIndex + Math.floor(height / itemHeight);
  setIndicies([newStartIndex, newEndIndex]);
};
```
1. Gets scroll position (`scrollTop`)
2. Calculates new start index based on scroll position
3. Calculates new end index based on container height
4. Updates indices state

### Render Logic
```javascript
return (
  <div
    className="container"
    style={{
      height,
      width,
      backgroundColor: "lightgray",
      overflow: "auto",
    }}
    onScroll={handleScroll}
  >
```
- Creates scrollable container with specified dimensions
- Attaches scroll event handler

### Item Container
```javascript
<div style={{ height: list?.length * itemHeight, position: "relative" }}>
```
- Sets total height based on all items
- Uses relative positioning for absolute positioning of children

### Item Rendering
```javascript
{visibleList.map((item, index) => (
  <div
    className="item"
    key={index}
    style={{
      height: itemHeight,
      background: "coral",
      borderTop: "5px solid grey",
      position: "absolute",
      top: (indicies[0] + index) * itemHeight,
      width: "100%",
      textAlign: "center",
    }}
  >
    {"Item " + item}
  </div>
))}
```
- Maps through visible items only
- Positions each item absolutely based on its index
- Calculates top position using: (startIndex + currentIndex) * itemHeight

## Example Run-through

Let's say we have these parameters:
- Container height: 400px
- Item height: 50px
- Total items: 1000

Initial render:
1. Visible items = 400/50 = 8 items
2. Initial indices: [0, 8]
3. Only items 0-8 are rendered

When scrolling down 100px:
1. New start index = 100/50 = 2
2. New end index = 2 + 8 = 10
3. Updates indices to [2, 10]
4. Re-renders only items 2-10

This way, even with 1000 items, we're only rendering 8-9 items at any given time, significantly improving performance.