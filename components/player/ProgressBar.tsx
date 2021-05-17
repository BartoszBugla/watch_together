import React, { useRef, useState, useEffect } from "react";
import debounce from "helpers/debounce";
const ProgressBar = (props) => {
  const ref = useRef(null);
  const [width, setWidth] = useState(1);
  // useSate;
  useEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, [props.duration]);
  const handleResize = debounce(() => {
    setWidth(ref.current.offsetWidth);
  }, 1000);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  //duration
  //progress
  const style1 = {
    width: `70%`,
    // opacity: props.isHovering && props.isPlaying ? "1" : "0",
    opacity: 1,
    backgroundColor: "gray",
    padding: "0",
    cursor: "pointer",
    margin: "auto",
  };
  const style2 = {
    width: `${(props.progress / props.duration) * 100}%`,
    backgroundColor: "red",
    height: "100%",
  };

  return (
    <div
      className="h-1 rounded-sm  "
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
      <div className=" rounded-sm  " style={style2}></div>
    </div>
  );
};

export default ProgressBar;
