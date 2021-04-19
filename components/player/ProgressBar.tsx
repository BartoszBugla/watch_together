import React, { useRef, useState, useEffect } from "react";

const ProgressBar = (props) => {
  const ref = useRef(null);
  const [width, setWidth] = useState(1);
  // useSate;
  useEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, [props.duration]);

  //duration
  //progress
  const style1 = {
    width: `70%`,
    // opacity: props.isHovering && props.isPlaying ? "1" : "0",
    opacity: 1,
    backgroundColor: "gray",
    padding: "0",
    height: "5px",
    cursor: "pointer",
  };
  const style2 = {
    width: `${(props.progress / props.duration) * 100}%`,
    backgroundColor: "red",
    height: "5px",
  };

  return (
    <div
      className="h-1  "
      onClick={(e) => {
        const procent = e.nativeEvent.offsetX / width;
        const second = props.duration * procent;
        props.skipTo(second);
      }}
      onMouseEnter={(e) => {
        const procent = e.nativeEvent.offsetX / width;
        const second = props.duration * procent;
      }}
      ref={ref}
      style={style1}
    >
      <div style={style2}></div>
    </div>
  );
};

export default ProgressBar;
