import React, { useState } from "react";
import axios from "axios";
import useForm from "hooks/useForm";
interface componentProps {
  id: number;
}
const ChangeUrlInput: React.FC<componentProps> = ({ id }) => {
  const [data, handleChange, setData] = useForm({ url: "" });

  const changeUrl = () => {
    axios.post("/api/player/seturl", { url: data.url, id });
    setData({ url: "" });
  };

  return (
    <div className="flex flex-row justify-center">
      {" "}
      <input
        className="bg-red-50 md:w-1/2 text-black rounded-sm m-5 w-2/3"
        onChange={handleChange}
        value={data.url}
        name="url"
      />
      <button className="" onClick={changeUrl}>
        {" "}
        Change url{" "}
      </button>
    </div>
  );
};

export default ChangeUrlInput;
