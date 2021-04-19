import React, { useEffect, useState } from "react";
//@ts-ignore
import ArrowSvg from "public/arrow.svg";
import Link from "next/link";
import Pusher from "pusher-js";
import Search from "components/search";
import SearchResults from "components/SearchResults";
interface componentProps {
  users?: number[];
  host?: number;
  roomId?: string;
}
const navbar: React.FC<componentProps> = ({ users = [], host, roomId }) => {
  return (
    <div className="relative ">
      <div className="bg-red-400 h-14 w-100 text-white text-center p-3">
        <div className=" " style={{ margin: "auto" }}>
          <p className="text-xl">Watch Together</p>
        </div>
      </div>
      <div className="bg-gray-700 w-100 text-gray-100 h-12  items-center text-center p-3 flex flex-row">
        {/* <ArrowSvg width={32} height={32} fill={"white"} /> */}

        <div className="flex-1"></div>
        <ul
          style={{ alignItems: "center" }}
          className="flex flex-row   w-1/2 justify-center "
        >
          {users.map((user, index) => {
            return (
              <li
                key={index}
                className={`${
                  user == host && "border-2  border-blue-600 border-solid "
                } mx-2 text-center w-8 h-8  text-lg bg-gray-50 text-black rounded-full`}
              >
                {user}
              </li>
            );
          })}
          <div className="w-1/2">
            <Search roomId={roomId} />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default navbar;
