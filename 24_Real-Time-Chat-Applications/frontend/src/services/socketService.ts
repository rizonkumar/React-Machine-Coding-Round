// frontend/src/services/socketService.ts
import { io, Socket } from "socket.io-client";
import { Dispatch } from "@reduxjs/toolkit";
import { addMessage, setConnectionStatus } from "../store/chatSlice";

let socket: Socket | null = null;
let dispatch: Dispatch | null = null;

export const initializeSocket = (storeDispatch: Dispatch) => {
  dispatch = storeDispatch;
  socket = io("http://localhost:6000");

  socket.on("connect", () => {
    if (dispatch) {
      dispatch(setConnectionStatus(true));
      console.log("Connected to server");
    }
  });

  socket.on("disconnect", () => {
    if (dispatch) {
      dispatch(setConnectionStatus(false));
      console.log("Disconnected from server");
    }
  });

  socket.on("receive_message", (message) => {
    if (dispatch) {
      dispatch(addMessage(message));
    }
  });
};

export const joinRoom = (roomId: string) => {
  if (socket) {
    socket.emit("join_room", roomId);
  }
};

export interface MessageData {
  id: string;
  text: string;
  sender: string;
  room: string;
  timestamp: number;
}

export const sendMessage = (messageData: MessageData) => {
  if (socket) {
    socket.emit("send_message", messageData);
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};
