import React from "react";

interface componentProps {}
const Layout: React.FC<componentProps> = ({ children }) => {
  return <div className="flex flex-col min-h-screen relative ">{children}</div>;
};

export default Layout;
