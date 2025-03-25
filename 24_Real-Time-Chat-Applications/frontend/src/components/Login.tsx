// frontend/src/components/Login.tsx
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { loginStart, loginSuccess } from "../store/authSlice";
import { v4 as uuidv4 } from "uuid";
import {
  LoginContainer,
  LoginForm,
  LoginHeader,
  LoginInput,
  LoginButton,
  ErrorMessage,
} from "../styles/LoginStyles";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) return;

    dispatch(loginStart());

    setTimeout(() => {
      const user = {
        id: uuidv4(),
        username: username.trim(),
      };
      dispatch(loginSuccess(user));
    }, 500);
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <LoginHeader>Join the Chat</LoginHeader>
        <LoginInput
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />
        <LoginButton type="submit" disabled={loading}>
          {loading ? "Joining..." : "Join Chat"}
        </LoginButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
