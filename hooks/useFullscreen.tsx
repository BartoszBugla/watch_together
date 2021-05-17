import React, { createContext, useState } from "react";

export const FullscreenContext = createContext([]);

export const FullscreenContextProvider: React.FC = ({ children }) => {
  const [isfullscreen, setIsFullscreen] = useState(false);
  return (
    <FullscreenContext.Provider value={[isfullscreen, setIsFullscreen]}>
      {children}
    </FullscreenContext.Provider>
  );
};
