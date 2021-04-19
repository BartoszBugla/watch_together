import React, { useContext, useState, useEffect } from "react";
import { SearchContext } from "hooks/SearchResultsContext";

import Result from "components/result";
import axios from "axios";

interface componentProps {
  roomId: string;
  userId: number;
}
const SearchResults: React.FC<componentProps> = (props) => {
  const [results, setResults, isOpen, setIsOpen] = useContext(SearchContext);
  // const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(results.length > 1 ? true : false);
  }, []);
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
      <div className="w-full absolute z-20  transition-all h-full bg-black bg-opacity-80 ">
        {/* <div> */}
        <span onClick={() => setIsOpen(!isOpen)}>Hide results</span>
        <ul
          style={{
            transition: "0.2s",
            height: "100%",
          }}
          className={`grid
          grid-cols-5
           w-full
          h-full
          px-64
          list-none
          gap-x-10

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
  return (
    <span className="absolute z-20   " onClick={() => setIsOpen(!isOpen)}>
      Show search Results
    </span>
  );
};

export default SearchResults;
