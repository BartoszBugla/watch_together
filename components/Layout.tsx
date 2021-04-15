import React from "react";

interface componentProps {}
const Layout: React.FC<componentProps> = ({ children }) => {
  return <div className="flex flex-col ">{children}</div>;
};

export default Layout;
