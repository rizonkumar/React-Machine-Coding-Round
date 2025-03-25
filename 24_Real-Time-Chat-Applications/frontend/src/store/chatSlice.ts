import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  id: string;
  text: string;
  sender: string;
  room: string;
  timestamp: string;
}

interface ChatState {
  message: Message[];
  currentRoom: string | null;
  isConnected: boolean;
}

const initialState: ChatState = {
  message: [],
  currentRoom: null,
  isConnected: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.message = action.payload;
    },

    addMessage: (state, action: PayloadAction<Message>) => {
      state.message.push(action.payload);
    },
    setCurrentRoom: (state, action: PayloadAction<string | null>) => {
      state.currentRoom = action.payload;
    },
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
  },
});

export const { setMessages, addMessage, setCurrentRoom, setConnectionStatus } =
  chatSlice.actions;
export default chatSlice.reducer;
