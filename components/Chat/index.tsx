import useLogger from "hooks/useLogger";
import React, { useContext, useState, useEffect } from "react";
import { LoggerContext } from "hooks/useLogger";
import ChatInput from "./input";
import { PusherContext } from "hooks/PusherContext";
interface componentProps {
  roomId: string;
}
const Chat: React.FC<componentProps> = (roomId) => {
  // const [messages, setMessage] = useState([]);
  // const { messages, log } = useLogger("chat");
  const [messages, setMessage] = useContext(LoggerContext);
  const pusher = useContext(PusherContext);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {}, []);
  if (!isOpen)
    return (
      <div className="absolute flex flex-col bottom-0 z-30 right-0  w-1/6 bg-black bg-opacity-20 text-gray-300  ">
        <button onClick={() => setIsOpen(true)} className="h-16">
          Show Chat
        </button>
      </div>
    );
  return (
    <div className="absolute flex flex-col bottom-0 z-30 right-0 h-full w-1/6 bg-black bg-opacity-20 text-gray-300 ">
      <button>Display results</button>

      <div className="flex-1 overflow-y-scroll">
        {messages.map((message) => {
          return (
            <p className="px-5 py-1">
              {message.type} : <i>{message.message}</i>, element:{" "}
              {message.element}{" "}
            </p>
          );
        })}
      </div>
      <ChatInput />
      <button onClick={() => setIsOpen(false)} className="h-16">
        Hide chat
      </button>
    </div>
  );
};

export default Chat;
