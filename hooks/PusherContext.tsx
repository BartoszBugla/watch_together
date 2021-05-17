import react, { createContext, useEffect } from "react";
//@ts-ignore
export const PusherContext = createContext<any>();

export function PusherProvider({ pusher, children }) {
  return (
    <PusherContext.Provider value={pusher}>{children}</PusherContext.Provider>
  );
}
