import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: [],
  currentRoom: null,
  isConnected: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.message = action.payload;
    },

    addMessage: (state, action) => {
      state.message.push(action.payload);
    },
    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

export const { setMessages, addMessage, setCurrentRoom, setConnectionStatus } =
  chatSlice.actions;
export default chatSlice.reducer;
