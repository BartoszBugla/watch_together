import { useMessage } from "hooks/useChat";
import React, { useContext, useState, useEffect } from "react";

import ChatInput from "./input";
import Message from "./message";
interface componentProps {
  roomId: string;
  userId: number;
}
const Chat: React.FC<componentProps> = ({ roomId, userId }) => {
  const { messages, sendMessage } = useMessage(roomId, userId);
  const [isOpen, setIsOpen] = useState(false);
  const filters = {
    message: true,
    type: true,
    element: false,
  };

  //while closed
  if (!isOpen)
    return (
      <div className="absolute flex flex-col bottom-0 z-30 right-0  w-1/6 bg-black bg-opacity-20 text-gray-300  ">
        <button onClick={() => setIsOpen(true)} className="h-16">
          Show Chat
        </button>
      </div>
    );
  //while opened
  return (
    <div className="absolute flex flex-col bottom-0 z-30 right-0 h-full w-1/6 bg-black bg-opacity-20 text-gray-300 ">
      <div className="flex-1 overflow-y-scroll">
        {messages.map((msg) => {
          return <Message message={msg} />;
        })}
      </div>
      <ChatInput sendMessage={sendMessage} />
      <button onClick={() => setIsOpen(false)} className="h-16">
        Hide chat
      </button>
    </div>
  );
};

export default Chat;
