# Traffic Light in React - Code Explanation

## Core Components Structure
- Two components: `Traffic` (parent) and `Signal` (child)
- Traffic manages state and logic
- Signal is a presentational component for individual lights

## Traffic Component Breakdown

### State Management
```javascript
const [active, setActive] = useState(0);
```
- Uses `useState` to track which light is currently active
- Initial state is 0 (first light)

### Props
```javascript
function Traffic({ lights = ["green", "yellow", "red"] })
```
- Takes optional `lights` array with default values
- Allows customization of colors and order

### useEffect Implementation
```javascript
useEffect(() => {
  const intervalId = setInterval(() => {
    setActive((prevActive) => (prevActive + 1) % lights.length);
  }, 2000);

  return () => clearInterval(intervalId);
}, []);
```
- `setInterval` creates a timer that runs every 2000ms (2 seconds)
- Uses modulo (`%`) to cycle through lights: 0 → 1 → 2 → 0...
- Cleanup function prevents memory leaks by clearing interval
- Empty dependency array `[]` means effect runs once on mount

### Rendering Logic
```javascript
{lights.map((color, index) => (
  <Signal key={index} color={color} isActive={active === index} />
))}
```
- Maps through lights array to create Signal components
- Each Signal receives:
    - `color`: The light's color
    - `isActive`: Boolean comparing current index to active state
    - `key`: Unique identifier for React's reconciliation

## Signal Component Breakdown

### Props
```javascript
function Signal({ color, isActive })
```
- `color`: The light's color (green/yellow/red)
- `isActive`: Boolean to determine if this light should be lit

### Styling
```javascript
style={{ backgroundColor: isActive ? color : "grey" }}
```
- Uses inline styling for dynamic color changes
- Active lights show their color, inactive ones are grey

## Why setInterval?

1. **Automatic Cycling**: Creates continuous light changes without user interaction
2. **Timing Control**: Maintains consistent 2-second intervals between changes
3. **Clean Implementation**: Simpler than managing manual timers
4. **Memory Management**: Cleaned up properly with useEffect's cleanup function

# Dry Run of Traffic Light Logic

Let's break down how this code executes step by step, assuming `lights = ["green", "yellow", "red"]` (so `lights.length = 3`)

## Initial State
```javascript
active = 0  // green light is on initially
```

## Time: 0 seconds (Start)
- `active = 0` (green light)
- Formula: (0 + 1) % 3 = 1

## Time: 2 seconds
- `prevActive = 0`
- Calculation: (0 + 1) % 3 = 1
- `active = 1` (yellow light)

## Time: 4 seconds
- `prevActive = 1`
- Calculation: (1 + 1) % 3 = 2
- `active = 2` (red light)

## Time: 6 seconds
- `prevActive = 2`
- Calculation: (2 + 1) % 3 = 0
- `active = 0` (back to green light)

## Visual Representation:
```
Time    Calculation    Result    Active Light
0s      (0+1)%3         1         Green
2s      (1+1)%3         2         Yellow
4s      (2+1)%3         0         Red
6s      (0+1)%3         1         Green
...and so on
```

## Why Modulo (%) Works:
- When number reaches `lights.length` (3), modulo wraps it back to 0
- 3 % 3 = 0
- 4 % 3 = 1
- 5 % 3 = 2
- This creates the continuous cycle: 0 → 1 → 2 → 0 → 1 → 2...

This creates an infinite loop of light changes every 2 seconds in the sequence: green → yellow → red → green → yellow → red...

# Understanding `prevActive` in React State Updates

## Basic Concept
```javascript
setActive((prevActive) => (prevActive + 1) % lights.length)
```
Think of `prevActive` as a "snapshot" of the most recent state value.

## Why Use `prevActive`?

### 1. State Update Guarantee
```javascript
// ❌ Less Safe Way
setActive(active + 1)  // Might use stale state

// ✅ Safe Way
setActive(prevActive => prevActive + 1)  // Guaranteed latest state
```

### 2. Real-World Analogy
Think of it like a relay race:
- `prevActive` is like passing the baton
- Each runner (state update) gets the baton (previous value) directly from the previous runner
- No confusion about where the baton is

## Example Timeline

```javascript
Time    prevActive    Calculation    Result
0s         0         (0 + 1) % 3      1
2s         1         (1 + 1) % 3      2
4s         2         (2 + 1) % 3      0
```

## Common Mistakes to Avoid

```javascript
// ❌ Problem: Might miss updates
setActive(active + 1)

// ✅ Solution: Guaranteed to use latest value
setActive(prevActive => prevActive + 1)
```

## Why It's Critical in setInterval
- Multiple updates might queue up
- `setInterval` runs asynchronously
- `prevActive` ensures each update builds on the actual previous state
- Prevents race conditions and state inconsistencies

## Memory Aid
Think of `prevActive` as a "promise" from React:
> "I promise to give you the latest state value, no matter what else is happening"

This pattern is essential for:
- Intervals
- Counters
- Toggles
- Any state that depends on its previous value