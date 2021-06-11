import { useMessage } from "hooks/useChat";
import React, { useContext, useState, useEffect, useRef } from "react";

import ChatInput from "./input";
import Message from "./message";
interface componentProps {
  roomId: string;
  userId: number;
}
const Chat: React.FC<componentProps> = ({ roomId, userId }) => {
  const { messages, sendMessage } = useMessage(roomId, userId);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const filters = {
    message: true,
    type: true,
    element: false,
  };
  const filteredMessages = messages.filter((i) => {
    return i.type === "user";
  });
  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  //while closed
  if (!isOpen)
    return (
      <div
        ref={ref}
        className="absolute flex flex-col bottom-0 z-30 right-0  w-full sm:w-1/3 lg:w-1/5 xl:w-1/6 bg-black bg-opacity-50 text-gray-300  "
      >
        <button onClick={() => setIsOpen(true)} className="h-16">
          Show Chat
        </button>
      </div>
    );

  //while opened
  return (
    <div className="absolute flex flex-col bottom-0 z-30 right-0 h-full w-full sm:w-1/3 lg:w-1/5 xl:w-1/6 bg-black bg-opacity-50 text-gray-300 ">
      <div className="flex-1 overflow-y-scroll scrollbar scrollbar-thumb-gray-300 ">
        {messages.map((msg) => {
          return <Message message={msg} />;
        })}
        <div ref={ref}></div>
      </div>

      <ChatInput sendMessage={sendMessage} />
      <button onClick={() => setIsOpen(false)} className="h-16">
        Hide chat
      </button>
    </div>
  );
};

export default Chat;
