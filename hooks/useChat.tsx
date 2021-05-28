import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";
import { PusherContext } from "hooks/PusherContext";
import type { Message } from "types";
const ChatContext = createContext([]);
type State = {
  messages: Message[];
  log: (type: MessageType, message: string) => void;
};
type UseMessage = {
  messages: Message[];
  sendMessage: (message: string) => void;
};
type MessageType = "pusher" | "user" | "server" | "client";

export const ChatContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useState([]);
  return (
    <ChatContext.Provider value={[state, setState]}>
      {children}
    </ChatContext.Provider>
  );
};
//user //server ===//pusher //client

const useLogger = (element: string): State => {
  const [messages, setState] = useContext(ChatContext);

  const log = (type: MessageType, message: string) => {
    const newMessage = { type, message, element };
    setState((msg) => [...msg, newMessage]);
  };
  return { messages, log };
};
const useMessage = (roomId, userId): UseMessage => {
  const [messages, setState] = useContext(ChatContext);
  const pusher = useContext(PusherContext);
  //handling pusher
  useEffect(() => {
    let channel = pusher.subscribe(`room-${roomId}`);
    channel.bind("message", (state) => {
      const newMessage = {
        from: state.from,
        type: state.type,
        message: state.message,
        element: state.element,
      };
      setState((msg) => [...msg, newMessage]);
    });
  }, []);
  //function to send message
  const sendMessage = (message) => {
    axios({
      url: "/api/rooms/message",
      method: "POST",
      data: {
        userId,
        roomId,
        content: message,
      },
    });
  };
  return { messages, sendMessage };
};
export { useLogger, useMessage, ChatContext };
