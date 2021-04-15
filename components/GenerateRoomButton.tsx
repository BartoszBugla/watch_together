import React from "react";

interface componentProps {
  onClick: () => Promise<void>;
  children: string;
}
const GenerateRoomButton: React.FC<componentProps> = (props) => {
  return (
    <button
      {...props}
      className="absolute left-50 inset-1/2 w-100 h-12 hover:bg-red-500 focus:hover:bg-red-600  bg-red-400 px-16 active:bg-red-600 text-white align-middle  text-lg rounded-md shadow-md drop-shadow-md text-center"
      style={{ transform: "translate(-50%)" }}
    >
      {props.children}
    </button>
  );
};

export default GenerateRoomButton;
