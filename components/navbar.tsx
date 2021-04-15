import React, { useEffect, useState } from "react";
//@ts-ignore
import ArrowSvg from "public/arrow.svg";
import Link from "next/link";
import Pusher from "pusher-js";
interface componentProps {
  users?: number[];
  host?: number;
  roomId?: number;
}
const navbar: React.FC<componentProps> = ({ users = [], host, roomId }) => {
  return (
    <div>
      <div className="bg-red-400 h-14 w-100 text-white text-center p-3">
        <div className=" " style={{ margin: "auto" }}>
          {" "}
          <p className="text-xl">Watch Together</p>
        </div>
      </div>
      <div className="bg-gray-700 w-100 text-gray-100 h-12  text-center p-3 flex flex-row">
        {/* <ArrowSvg
          width={30}
          height={30}
          className="fill-current text-gray-100 hover:text-gray-400 "
        /> */}

        <div className="flex-1"></div>
        <ul
          style={{ alignItems: "center" }}
          className="flex flex-row rotate-180  w-1/2 justify-center "
        >
          {users.map((i, index) => {
            return (
              <li
                key={index}
                className={`${
                  i == host && "border-2  border-blue-600 border-solid "
                } mx-2 text-center w-8 h-8  text-lg bg-gray-50 text-black rounded-full`}
              >
                {i}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default navbar;
