import React, { useContext, createContext, useState, useReducer } from "react";

export const LoggerContext = createContext([]);
type State = {
  messages: Message[];
  log: (type: MessageType, message: string) => void;
};

type Message = {
  message: string;
  type: "pusher" | "user" | "server" | "client";
  element: string;
};
// type Action = { type: string; message: string };
// const reducer = (state: State, action: Action) => {
//   switch (action.type) {
//     case "pusher": {
//       return [...state, { message: action.message, type: action.type }];
//     }
//     default:
//       return state;
//   }
// };
export const LoggerContextProvider: React.FC = ({ children }) => {
  //   const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
  //     reducer,
  //     []
  //   );
  const [state, setState] = useState([]);
  return (
    <LoggerContext.Provider value={[state, setState]}>
      {children}
    </LoggerContext.Provider>
  );
};
//user //server ===//pusher //client
type MessageType = "pusher" | "user" | "server" | "client";

const useLogger = (element: string): State => {
  const [messages, setState] = useContext(LoggerContext);

  const log = (type: MessageType, message: string) => {
    // console.log(state, message);
    const newMessage = { type, message, element };
    console.log([...messages, newMessage]);
    console.log(messages);
    setState((msg) => [...msg, newMessage]);
  };
  return { messages: messages, log };
};
export default useLogger;
