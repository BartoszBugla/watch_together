import React, { useRef, useState, useEffect } from "react";

const ProgressBar = (props) => {
  const ref = useRef();
  const [width, setWidth] = useState(1);
  // useSate;
  useEffect(() => {
    console.log(ref);
    setWidth(ref.current.offsetWidth);
  }, [props.duration]);

  //duration
  //progress
  const progressBarWidth = 500;
  const style1 = {
    width: `95%`,
    opacity: props.isHovering && props.isPlaying ? "1" : "0",
    backgroundColor: "gray",

    padding: "0",
    position: "absolute",
    bottom: "10%",
    left: "2.5%",
  };
  const style2 = {
    width: `${(props.progress / props.duration) * 100}%`,
    backgroundColor: "red",
    // transition: "1s",
    height: "100%",
  };
  return (
    <div
      className="h-1 hover:p-1 "
      onClick={(e) => {
        const procent = e.nativeEvent.offsetX / width;
        const second = props.duration * procent;
        console.log(e.nativeEvent.offsetX);
        props.skipTo(second);
      }}
      onMouseEnter={(e) => {
        const procent = e.nativeEvent.offsetX / width;
        const second = props.duration * procent;
        console.log(e.nativeEvent.offsetX);
      }}
      ref={ref}
      style={style1}
    >
      <div style={style2}></div>
      {Math.floor(props.progress / 60)}:{Math.floor(props.progress % 60)}/
      {Math.floor(props.duration / 60)}:{Math.floor(props.duration % 60)}
    </div>
  );
};

export default ProgressBar;
