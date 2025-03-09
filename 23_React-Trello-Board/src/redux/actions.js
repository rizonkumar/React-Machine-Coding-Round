import {
  ADD_CARD,
  ADD_LIST,
  DELETE_LIST,
  EDIT_LIST_TITLE,
  MOVE_CARD,
} from "./actionTypes";

export const addList = (title) => ({
  type: ADD_LIST,
  payload: { title },
});

export const addCard = (listId, content) => ({
  type: ADD_CARD,
  payload: { listId, content },
});

export const moveCard = (
  cardId,
  sourceListId,
  destinationListId,
  sourceIndex,
  destinationIndex
) => ({
  type: MOVE_CARD,
  payload: {
    cardId,
    sourceListId,
    destinationListId,
    sourceIndex,
    destinationIndex,
  },
});

export const deleteList = (listId) => ({
  type: DELETE_LIST,
  payload: { listId },
});

export const editListTitle = (listId, newTitle) => ({
  type: EDIT_LIST_TITLE,
  payload: { listId, newTitle },
});
