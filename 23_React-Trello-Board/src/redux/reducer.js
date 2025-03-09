import { initialData } from "../data/constant";
import {
  ADD_LIST,
  ADD_CARD,
  MOVE_CARD,
  DELETE_LIST,
  EDIT_LIST_TITLE,
} from "./actionTypes";
import { v4 as uuidv4 } from "uuid";

const initialState = initialData;

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

    case ADD_CARD: {
      const { listId, content } = action.payload;
      const newCard = {
        id: `card-${uuidv4()}`,
        content,
      };

      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id === listId) {
            return {
              ...list,
              cards: [...list.cards, newCard],
            };
          }
          return list;
        }),
      };
    }

    case MOVE_CARD: {
      const {
        cardId,
        sourceListId,
        destinationListId,
        sourceIndex,
        destinationIndex,
      } = action.payload;

      // If moving within the same list
      if (sourceListId === destinationListId) {
        const list = state.lists.find((list) => list.id === sourceListId);
        const newCards = Array.from(list.cards);
        const [movedCard] = newCards.splice(sourceIndex, 1);
        newCards.splice(destinationIndex, 0, movedCard);

        return {
          ...state,
          lists: state.lists.map((list) => {
            if (list.id === sourceListId) {
              return {
                ...list,
                cards: newCards,
              };
            }
            return list;
          }),
        };
      }

      // If moving to a different list
      const sourceList = state.lists.find((list) => list.id === sourceListId);
      const destList = state.lists.find(
        (list) => list.id === destinationListId
      );

      const sourceCards = Array.from(sourceList.cards);
      const [movedCard] = sourceCards.splice(sourceIndex, 1);

      const destCards = Array.from(destList.cards);
      destCards.splice(destinationIndex, 0, movedCard);

      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id === sourceListId) {
            return {
              ...list,
              cards: sourceCards,
            };
          }
          if (list.id === destinationListId) {
            return {
              ...list,
              cards: destCards,
            };
          }
          return list;
        }),
      };
    }

    case DELETE_LIST: {
      return {
        ...state,
        lists: state.lists.filter((list) => list.id !== action.payload.listId),
      };
    }

    case EDIT_LIST_TITLE: {
      const { listId, newTitle } = action.payload;
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id === listId) {
            return {
              ...list,
              title: newTitle,
            };
          }
          return list;
        }),
      };
    }

    default:
      return state;
  }
};

export default reducer;
