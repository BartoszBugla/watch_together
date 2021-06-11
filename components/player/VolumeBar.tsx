import React, { useRef, useEffect, useState } from "react";

interface componentProps {
  isOpen: boolean;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}
const VolumeBar: React.FC<componentProps> = ({ volume, setVolume }) => {
  const ref = useRef(null);
  const [width, setWidth] = useState(1);
  // useSate;
  useEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, [volume]);

  //duration
  return (
    <div
      ref={ref}
      onClick={(e) => {
        const procent = e.nativeEvent.offsetX / width;
        setVolume(procent);
      }}
      className="w-2/3  h-1  cursor-pointer bg-gray-300 bg-opacity-70 flex flex-col-reverse rounded-sm"
    >
      {" "}
      <div
        className="h-full bg-red-500  rounded-sm "
        style={{
          width: `${volume * 100}%`,
        }}
      ></div>
    </div>
  );
};

export default VolumeBar;
