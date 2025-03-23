import { addMessage, setConnectionStatus } from "../store/chatSlice";

let socket;
let dispatch;

export const initializeSocket = (storeDispatch) => {
  dispatch = storeDispatch;
  console.log("Dispatch", dispatch);
  socket = io("http://localhost:500");

  socket.on("connect", () => {
    dispatch(setConnectionStatus(true));
    console.log("Connected to server");
  });

  socket.on("disconnect", () => {
    dispatch(setConnectionStatus(false));
    console.log("Disconnected from server");
  });

  socket.on("receive_message", (message) => {
    dispatch(addMessage(message));
  });
};

export const joinRoom = (roomId) => {
  if (socket) {
    socket.emit("join_room", roomId);
  }
};

export const sendMessage = (messageData) => {
  if (socket) {
    socket.emit("send_message", messageData);
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};
