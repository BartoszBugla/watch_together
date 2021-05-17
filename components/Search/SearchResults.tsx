import React, { useContext, useState, useEffect } from "react";
import { SearchContext } from "hooks/SearchResultsContext";

import Result from "components/Search/result";
import axios from "axios";
//@ts-ignore
import CloseSvg from "public/close.svg";
interface componentProps {
  roomId: string;
  userId: number;
}
const SearchResults: React.FC<componentProps> = (props) => {
  const [results, setResults, isOpen, setIsOpen] = useContext(SearchContext);
  // const [isOpen, setIsOpen] = useState(false);

  const changeUrl = (videoId) => {
    axios.post("/api/player/seturl", {
      url: ` https://youtu.be/${videoId}`,
      roomId: props.roomId,
    });
    setIsOpen(false);
    // https://youtu.be/YjYjrd_ozQw
  };
  if (isOpen)
    return (
      <div className="w-full  absolute z-50 left-0 top-0 transition-all h-full bg-black bg-opacity-80 overflow-y-scroll ">
        {/* <div> */}
        <span
          className="fixed left-10 top-10 "
          onClick={() => setIsOpen(!isOpen)}
        >
          <CloseSvg width={32} height={32} fill="white" />
        </span>
        <ul
          style={{
            transition: "0.2s",
          }}
          className={`grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-4
          xl:px-52
           w-full
          h-max
          px-42
          list-none
          gap-x-20
          px-24
          py-10
          `}
        >
          {results.map((item) => {
            return (
              <Result
                onClick={() => changeUrl(item.id.videoId)}
                videoId={item.id.videoId}
                key={item.id.videoId}
                snippet={item.snippet}
              />
            );
          })}
        </ul>
        {/* </div> */}
      </div>
    );
  return <span className="absolute  "></span>;
};

export default SearchResults;
