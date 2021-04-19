import React from "react";
import Image from "next/image";
import axios from "axios";
import alwaysTwoDigits from "helpers/AlwaysTwoDigits";
interface componentProps {
  onClick: () => void;
  videoId: string;
  snippet?: {
    description: string;
    channelId: string;
    publishTime: string;
    publishAt: string;
    title: string;
    thumbnails?: {
      default: { url: string };
      high: { url: string };
      medium: { url: string };
    };
  };
}
const result: React.FC<componentProps> = ({ videoId, snippet, onClick }) => {
  const date = new Date(snippet.publishTime);
  const currentDate = new Date();
  console.log(date.getMonth());
  console.log(date.getFullYear());
  console.log(date.getDay());

  return (
    <li className="text-center" onClick={onClick}>
      <Image
        // className="mx-auto "
        // src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
        src={snippet.thumbnails.default.url}
        width={160}
        height={120}
      ></Image>
      <h5 className="text-left">{snippet.title} </h5>
      <h5 className="text-left text-gray-400">
        {alwaysTwoDigits(date.getDay())}.{alwaysTwoDigits(date.getMonth())}.
        {date.getFullYear()}
      </h5>
    </li>
  );
};

export default result;
