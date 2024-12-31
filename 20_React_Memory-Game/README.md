# Memory Game - React Implementation Documentation

## Overview

This documentation covers a React-based Memory Game implementation where players match pairs of numbered cards. The game features a grid of face-down cards that players can flip to find matching pairs.

## Components Structure

### 1. MemoryGame Component (Main Component)

```jsx
const MemoryGame = () => {
  const { cards, handleCardClick } = useGameLogic();
  // ... component JSX
};
```

- **Purpose**: Serves as the main game container
- **Key Features**:
  - Uses custom hook `useGameLogic` for game state management
  - Renders a grid of Card components
  - Maps through cards array to display individual cards

### 2. Card Component

```jsx
const Card = ({ number, isFlipped, onClick }) => (
  <div className="cards" onClick={onClick}>
    {isFlipped ? number : "?"}
  </div>
);
```

- **Props**:
  - `number`: The card's value
  - `isFlipped`: Boolean indicating if card is face up
  - `onClick`: Click handler function
- **Functionality**: Displays either the card number or "?" based on isFlipped state

## Game Logic Implementation

### useGameLogic Custom Hook

This hook manages the game's core logic and state:

```jsx
export const useGameLogic = () => {
  const [cards, setCards] = useState(generateGrid);
  const [isLock, setIsLock] = useState(false);
  const [flippedCard, setFlippedCard] = useState([]);
  // ... hook logic
};
```

**Key States**:

- `cards`: Array of card objects
- `isLock`: Prevents card flipping during matching check
- `flippedCard`: Tracks currently flipped cards

**Main Functions**:

1. `handleCardClick(index)`:

   - Handles card flip logic
   - Prevents flipping if card is already flipped or game is locked
   - Updates card state and tracks flipped cards

2. `useEffect` Logic:
   - Triggers when two cards are flipped
   - Implements 3-second delay for checking matches
   - Flips cards back if they don't match

### Grid Generation Utility

```jsx
export const generateGrid = () => {
  const arr = Array.from({ length: 18 }, (_, index) => index + 1);
  // ... grid generation logic
};
```

- Creates an array of 18 numbers
- Duplicates array for pairs
- Shuffles cards randomly
- Returns array of card objects with properties: id, number, isFlipped

## Code Flow and Dry Run

1. **Initial Load**:

   - generateGrid creates shuffled card array
   - MemoryGame component renders grid
   - All cards show "?"

2. **First Card Click**:

   ```javascript
   // Example state after first click:
   flippedCard = [3]; // Index of clicked card
   cards[3] = { id: 3, number: 7, isFlipped: true };
   ```

3. **Second Card Click**:

   ```javascript
   // State after second click:
   flippedCard = [3, 8];
   cards[8] = { id: 8, number: 4, isFlipped: true };
   ```

4. **Match Check**:
   - If numbers match: Cards remain face up
   - If numbers don't match: Cards flip face down after 3 seconds
   - flippedCard array clears
   - Game unlocks for next moves

## Key JavaScript Methods Used

1. **Array.from()**: Creates new array from array-like object

   ```javascript
   Array.from({ length: 18 }, (_, index) => index + 1);
   ```

2. **sort() with Math.random()**: Shuffles array randomly

   ```javascript
   array.sort(() => Math.random() - 0.5);
   ```

3. **Spread Operator (...)**: Creates array copies

   ```javascript
   [...arr, ...arr];
   ```

4. **map()**: Transforms array elements
   ```javascript
   grid.map((item, index) => ({...}))
   ```
