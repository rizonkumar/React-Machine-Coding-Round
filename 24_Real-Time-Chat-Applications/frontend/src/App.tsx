import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store";
import { initializeSocket, disconnectSocket } from "./services/socketService";
import Login from "./components/Login.tsx";
import ChatRoom from "./components/ChatRoom";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      initializeSocket(dispatch);
    }

    return () => {
      disconnectSocket();
    };
  }, [isAuthenticated, dispatch]);

  return <>{isAuthenticated ? <ChatRoom /> : <Login />}</>;
};

export default App;
