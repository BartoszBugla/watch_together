import React, { useEffect, useState } from "react";

import useForm from "hooks/useForm";
interface componentProps {
  sendMessage: (message: string) => void;
}
const input: React.FC<componentProps> = ({ sendMessage }) => {
  const [currentlyFocusing, setcurrentlyFocusing] = useState(false);
  const [data, handleChange, setData] = useForm({ message: "" });
  useEffect(() => {
    const listener = (event) => {
      if (
        (event.code === "Enter" || event.code === "NumpadEnter") &&
        currentlyFocusing
      ) {
        event.preventDefault();

        sendMessage(data.message);
        setData({ message: "" });
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [currentlyFocusing, data]);

  return (
    <div className="flex row">
      <input
        onChange={handleChange}
        value={data.message}
        className="p-1 w-2/3 text-black text-sm rounded-sm"
        name="message"
        onFocus={() => setcurrentlyFocusing(true)}
        onBlur={() => setcurrentlyFocusing(false)}
        autoComplete="off"
      ></input>
      <button
        onClick={() => {
          sendMessage(data.message);
          setData({ message: "" });
        }}
        className="text-center w-1/3 p-1"
      >
        Send
      </button>
    </div>
  );
};

export default input;
