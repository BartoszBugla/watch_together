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

  return (
    <li className="text-center cursor-pointer" onClick={onClick}>
      <Image
        className="image"
        // src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
        src={snippet.thumbnails.high.url}
        width={240}
        height={180}
        layout="responsive"
      ></Image>
      <style jsx global>{`
        .image {
          border-radius: 4px;
        }
        .image:hover {
          filter: brightness(0.5);
        }
      `}</style>
      <h5 className="text-left text-sm">{snippet.title} </h5>
      <h5 className="text-left text-gray-400 text-sm">
        {alwaysTwoDigits(date.getDate())}.{alwaysTwoDigits(date.getMonth() + 1)}
        .{date.getFullYear()}
      </h5>
    </li>
  );
};

export default result;
