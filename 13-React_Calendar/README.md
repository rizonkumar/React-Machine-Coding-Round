# React Calendar Implementation 
## Core Component Flow
```mermaid
App → DayView → DayTimeSlots + Events
```

## Component Breakdown

### 1. App Component (`App.js`)
```javascript
function App() {
  return <DayView />;
}
```
- Entry point component
- Single responsibility: Renders DayView

### 2. DayView Component (`DayView.jsx`)
```javascript
function DayView() {
  return (
    <div className="calendar">
      <DayTimeSlots />
      <Events events={events} />
    </div>
  );
}
```
- Acts as container component
- Manages layout structure
- Passes events data to Events component

### 3. DayTimeSlots Component (`DayTimeSlots.jsx`)
```javascript
const slots = Array.from({ length: 24 }, (_, index) => index);
```
- Generates 24-hour time slots (0-23)
- Each slot represents one hour
- Example output: "0:00", "1:00", "2:00", etc.

### 4. Events Component (`Events.jsx`) - Detailed Analysis

#### Position Calculation Deep Dive
```javascript
const top = startHour * 5 + (startMinute / 60) * 5;
const height = (endHour - startHour) * 5 + ((endMinute - startMinute) / 60) * 5;
```

Let's break down with examples:

1. **Event: 2:30 - 4:45**
```javascript
// Top Position Calculation
startHour = 2
startMinute = 30
top = (2 * 5) + (30/60 * 5)
top = 10 + 2.5
top = 12.5rem

// Height Calculation
endHour = 4
endMinute = 45
startHour = 2
startMinute = 30
height = (4-2)*5 + ((45-30)/60 * 5)
height = 10 + (15/60 * 5)
height = 10 + 1.25
height = 11.25rem
```

2. **Event: 1:00 - 2:00**
```javascript
// Top Position
top = (1 * 5) + (0/60 * 5)
top = 5rem

// Height
height = (2-1)*5 + ((0-0)/60 * 5)
height = 5rem
```

3. **Event: 9:15 - 10:45**
```javascript
// Top Position
top = (9 * 5) + (15/60 * 5)
top = 45 + 1.25
top = 46.25rem

// Height
height = (10-9)*5 + ((45-15)/60 * 5)
height = 5 + (30/60 * 5)
height = 5 + 2.5
height = 7.5rem
```

#### Formula Explanation:
1. **Top Position Formula**:
    - `startHour * 5`: Converts hours to rem units (each hour = 5rem)
    - `(startMinute/60 * 5)`: Converts minutes to fractional rem units
    - Combines to get exact vertical position

2. **Height Formula**:
    - `(endHour - startHour) * 5`: Base height from hour difference
    - `((endMinute - startMinute)/60 * 5)`: Additional height from minute difference
    - Results in precise event block height

