import React from "react";
import type { Message } from "types";
interface componentProps {
  message: Message;
}
const Msg: React.FC<componentProps> = ({ message }) => {
  switch (message.type) {
    case "user":
      return (
        <p className="px-5 py-1">
          user {message.from} : {message.message}
        </p>
      );
    default:
      return (
        <p className="px-5 py-1">
          <i className="text-gray-500">
            {" "}
            {message.type} : {message.element} , {message.message}
          </i>
        </p>
      );
  }
};

export default Msg;
