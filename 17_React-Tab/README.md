# React Tabs Component Documentation

## Component Structure

### Props

```jsx
{
  data: Array<{
    label: string,    // Text shown in tab button
    content: ReactNode // Content to display when tab is active
  }>,
  onTabChange: (index: number) => void  // Callback fired when tab changes
}
```

### Usage Example

```jsx
const tabsData = [
  {
    label: "Profile",
    content: <div>Profile Info Content</div>,
  },
  {
    label: "Dashboard",
    content: <div>Dashboard Content</div>,
  },
];

const onTabChangeHandler = (index) => {
  console.log("Current Tab Index:", index);
};

<Tabs data={tabsData} onTabChange={onTabChangeHandler} />;
```

### State

```jsx
currentTabIdx: number; // Tracks currently active tab index
```

## Implementation Details

### 1. Tab Container

- Uses flexbox for horizontal tab alignment
- Implements gap spacing between tabs
- Maintains visual connection with content panel

### 2. Tab Buttons

- Interactive buttons with hover and active states
- Uses data-active attribute for styling active tab
- Implements onClick handler for tab switching and callback
- Smooth transition effects

### 3. Content Panel

- Displays content based on active tab index

## Common Interview Questions

1. How would you handle keyboard navigation?
2. How would you make this component more accessible?
3. How would you implement lazy loading of tab content?
4. How would you handle tab overflow on small screens?
5. How would you persist the active tab across page refreshes?
6. How would you implement controlled vs uncontrolled versions of this component?

## Potential Enhancements

1. Add keyboard navigation (arrow keys)
2. Implement ARIA attributes for accessibility
3. Add animation for content transitions
4. Add support for disabled tabs
5. Implement vertical tab orientation option
6. Add support for dynamic tab addition/removal
7. Add controlled mode with external state management

## Common Edge Cases to Handle

1. Empty tab data array
2. Very long tab labels
3. Dynamic content height
4. Missing onTabChange callback
5. Multiple rapid tab changes
