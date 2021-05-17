import React from "react";

interface componentProps {}
const LandingTitle: React.FC<componentProps> = () => {
  return (
    <div
      style={{ transform: "translate(-50%)" }}
      className="absolute left-1/2 h-10 top-1/3 text-gray-100 w-96 text-center text-3xl"
    >
      <p>Want to watch youtube video with your friends?</p>
    </div>
  );
};

export default LandingTitle;
