# React Tabs Component Explanation

## Key Concepts

1. **Component Structure**

- Main component `Tabs` receives `tabsData` as a prop
- `App` component imports the tab data from a JSON file
- Data structure uses an array of objects with `label` and `content`

2. **State Management**

```jsx
const [currentTab, setCurrentTab] = useState(0);
```

- Uses `useState` hook to track active tab
- Initially set to 0 (first tab)
- `currentTab` stores the index of active tab

3. **Rendering Logic**

- **Tabs Buttons**:

```jsx
{
  tabsData.map((item, index) => (
    <button
      className={`${currentTab === index ? "active" : ""}`}
      onClick={() => setCurrentTab(index)}
    >
      {item.label}
    </button>
  ));
}
```

- Maps through tabsData to create buttons
- Applies 'active' class when index matches currentTab
- onClick updates currentTab state

- **Content Display**:

```jsx
<div className="tabs__content">{tabsData[currentTab].content}</div>
```

- Shows content of currently selected tab using currentTab index
