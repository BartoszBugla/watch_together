import React, { useState, useContext } from "react";
import axios from "axios";
import useForm from "hooks/useForm";
import { useQuery } from "react-query";
import { SearchContext } from "hooks/SearchResultsContext";
//@ts-ignore
import LoupeSvg from "public/loupe.svg";
interface componentProps {
  roomId: string;
}
const ChangeUrlInput: React.FC<componentProps> = ({ roomId }) => {
  const [data, handleChange, setData] = useForm({ query: "" });
  // console.log(process.env.API_KEY);
  const [results, setResults, open, setIsOpen] = useContext(SearchContext);
  const key = "AIzaSyB2c94xX3-kBuU1R4H0dKRK4XkNBBX8vzY";
  const search = (e) => {
    axios({
      url: `https://youtube.googleapis.com/youtube/v3/search?q=${data.query}&key=${key}`,
      method: "get",
      headers: {
        // Authorization: `Bearer ${process.env.api_key}`,
        Accept: "application/json",
      },
      params: {
        part: "snippet",
        maxResults: 15,
      },
    })
      .then((res) => {
        console.log(res.data.items);
        setResults(res.data.items);
        setIsOpen(true);
      })
      .catch((e) => console.log(e));
  };
  const changeUrl = () => {
    axios.post("/api/player/seturl", { url: data.url, roomId });
    setData({ query: "" });
  };

  return (
    <div className="flex flex-row justify-center">
      <input
        className="bg-red-50 md:w-1/2 h-8 text-black rounded-sm  p-2 w-2/3"
        onChange={handleChange}
        value={data.query}
        name="query"
        placeholder="Search"
      />
      <button
        className="px-5 border-black pointer bg-black bg-opacity-50 "
        onClick={search}
      >
        <LoupeSvg width={20} fill="white" height={20} />
      </button>
    </div>
  );
};

export default ChangeUrlInput;
