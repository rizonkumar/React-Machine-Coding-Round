### Key Concepts in Redux

1. **Store**: The store holds the whole state tree of your application. The only way to change the state inside it is to dispatch an action on it.

2. **Actions**: Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using `store.dispatch()`.

3. **Reducers**: Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes.

4. **Dispatch**: Dispatching an action is the process of sending an action to the store.

5. **Provider**: The `Provider` component makes the Redux store available to any nested components that have been wrapped in the `connect()` function.

### **Redux Data Flow**

Redux follows a **unidirectional data flow**:

1. **Action** is dispatched.
2. **Reducer** processes the action and updates the state.
3. The updated **state** is passed to the React components.
4. The UI re-renders based on the new state.

---

### **1. Initial Setup**

#### **Store Creation**

- The Redux store is created using the `reducer` and is made available to the entire React application via the `Provider` component.

```javascript
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

- The `store` holds the initial state (`initialData`) and the `reducer` function.

---

### **2. Dispatching an Action**

#### **Action Creator**

- When a user interacts with the UI (e.g., clicks a button to add a list), an **action creator** is called. For example:

```javascript
export const addList = (title) => ({
  type: ADD_LIST,
  payload: { title },
});
```

- This action creator returns an **action object** with a `type` (describing what happened) and a `payload` (data needed to update the state).

---

#### **Dispatching the Action**

- The action is dispatched to the Redux store using `store.dispatch()` or, in React components, using hooks like `useDispatch`.

```javascript
dispatch(addList("New List Title"));
```

- This sends the action to the **reducer**.

---

### **3. Reducer Processes the Action**

#### **Reducer Function**

- The `reducer` function takes the **current state** and the **action** as arguments and returns the **new state** based on the action type.

```javascript
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST: {
      const newList = {
        id: `list-${uuidv4()}`,
        title: action.payload.title,
        cards: [],
      };
      return {
        ...state,
        lists: [...state.lists, newList],
      };
    }
    // Other cases...
    default:
      return state;
  }
};
```

- For example, when the `ADD_LIST` action is dispatched:
  - The reducer creates a new list object with a unique ID and the title from the action payload.
  - It returns a **new state object** with the new list added to the `lists` array.

---

### **4. State Update**

- The Redux store updates its state with the new state returned by the reducer.
- The store notifies all connected components that the state has changed.

---

### **5. React Components Re-render**

#### **Connecting Components to the Store**

- React components can access the Redux store using hooks like `useSelector` or the `connect` function.

```javascript
import { useSelector } from "react-redux";

const MyComponent = () => {
  const lists = useSelector((state) => state.lists);
  return (
    <div>
      {lists.map((list) => (
        <div key={list.id}>{list.title}</div>
      ))}
    </div>
  );
};
```

- When the state changes, `useSelector` re-runs and returns the updated state.
- The component re-renders to reflect the new state.

---

### **6. Example Flow: Adding a List**

1. **User Interaction**:

   - The user clicks a button to add a new list.

2. **Action Creator**:

   - The `addList` action creator is called with the list title.

   ```javascript
   dispatch(addList("Groceries"));
   ```

3. **Action Dispatched**:

   - The action is sent to the Redux store.

   ```javascript
   {
     type: ADD_LIST,
     payload: { title: "Groceries" },
   }
   ```

4. **Reducer Processes the Action**:

   - The reducer handles the `ADD_LIST` action:
     - Creates a new list object with a unique ID and the title "Groceries".
     - Returns a new state with the new list added to the `lists` array.

   ```javascript
   {
     lists: [
       ...state.lists,
       { id: "list-123", title: "Groceries", cards: [] },
     ],
   }
   ```

5. **State Updated**:

   - The Redux store updates its state with the new list.

6. **UI Re-renders**:
   - React components connected to the store (e.g., using `useSelector`) re-render to display the new list.

---

### **7. Example Flow: Moving a Card**

1. **User Interaction**:

   - The user drags a card from one list to another.

2. **Action Creator**:

   - The `moveCard` action creator is called with details about the card movement.

   ```javascript
   dispatch(
     moveCard(
       "card-123", // cardId
       "list-1", // sourceListId
       "list-2", // destinationListId
       0, // sourceIndex
       1 // destinationIndex
     )
   );
   ```

3. **Action Dispatched**:

   - The action is sent to the Redux store.

   ```javascript
   {
     type: MOVE_CARD,
     payload: {
       cardId: "card-123",
       sourceListId: "list-1",
       destinationListId: "list-2",
       sourceIndex: 0,
       destinationIndex: 1,
     },
   }
   ```

4. **Reducer Processes the Action**:

   - The reducer handles the `MOVE_CARD` action:
     - Finds the source and destination lists.
     - Moves the card from the source list to the destination list.
     - Returns a new state with the updated lists.

5. **State Updated**:

   - The Redux store updates its state with the new lists.

6. **UI Re-renders**:
   - React components re-render to reflect the updated card positions.

---

### **Summary of the Flow**

1. **Action Creator**: Called in response to user interaction.
2. **Action Dispatched**: Sent to the Redux store.
3. **Reducer Processes Action**: Updates the state based on the action.
4. **State Updated**: The store holds the new state.
5. **UI Re-renders**: Components connected to the store update to reflect the new state.
