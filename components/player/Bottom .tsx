import React, { useEffect } from "react";
import ProgressBar from "./ProgressBar";
//@ts-ignore
import PlaySvg from "public/play.svg";
//@ts-ignore
import FullscreenSvg from "public/fullscreen.svg";
//@ts-ignore
import StopSvg from "public/stop.svg";
//@ts-ignore
import MuteSvg from "public/mute.svg";
//@ts-ignore
import VolumeSvg from "public/volume.svg";
interface componentProps {
  progress: number;
  duration: number;
  isPlaying: boolean;
  skipTo: (second: number) => void;
  isHovering: boolean;
  play: () => void;
  stop: () => void;
  isMuted: boolean;
  mute: () => void;
  fullscreen: () => void;
}
import alwaysTwoDigits from "helpers/AlwaysTwoDigits";
const options = { svgSize: 18 };
const Bottom: React.FC<componentProps> = (props) => {
  useEffect(() => {}, [props.duration]);
  return (
    <div
      style={{
        // position: "absolute",
        // bottom: "0",
        // left: "2.5%",
        width: "100%",
        // height: "50px",
        padding: "2px",
        backgroundColor: "rgba(0,0,0,0.3) ",
      }}
    >
      <div
        style={{ fill: "white" }}
        className="flex flex-row justify-between items-center  p-2"
      >
        <div className="flex flex-row w-48  items-center justify-around ">
          {props.isPlaying ? (
            <span>
              <StopSvg
                onClick={props.stop}
                width={options.svgSize}
                height={options.svgSize}
              />
            </span>
          ) : (
            <span>
              <PlaySvg
                onClick={props.play}
                width={options.svgSize}
                height={options.svgSize}
              />
            </span>
          )}
          {props.isMuted ? (
            <span>
              <MuteSvg
                onClick={props.mute}
                width={options.svgSize}
                height={options.svgSize}
              />
            </span>
          ) : (
            <span>
              <VolumeSvg
                onClick={props.mute}
                width={options.svgSize}
                height={options.svgSize}
              />
            </span>
          )}

          <p>
            {Math.floor(props.progress / 60)}:
            {alwaysTwoDigits(Math.floor(props.progress % 60))}/
            {Math.floor(props.duration / 60)}:
            {alwaysTwoDigits(Math.floor(props.duration % 60))}
          </p>
        </div>

        <ProgressBar {...props} />

        <div>
          <p>
            <FullscreenSvg
              onClick={props.fullscreen}
              width={options.svgSize}
              height={options.svgSize}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bottom;
