import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import alwaysTwoDigits from "helpers/AlwaysTwoDigits";
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
import VolumeBar from "./VolumeBar";
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
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}

const options = { svgSize: 18 };
const Bottom: React.FC<componentProps> = (props) => {
  const [isOpenVolumeBar, setIsOpenVolumeBar] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        padding: "2px",
        backgroundColor: "rgba(0,0,0,0.3) ",
        zIndex: 30,
      }}
    >
      <div
        style={{ fill: "white" }}
        className="flex flex-col-reverse md:flex-row justify-between items-center  p-2"
      >
        <div className="flex flex-row w-56  items-center justify-around ">
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
          <div
            onMouseOver={() => setIsOpenVolumeBar(true)}
            onMouseLeave={() => setIsOpenVolumeBar(false)}
            className="relative w-16 flex justify-between items-center "
          >
            {/* /////////////////////////////////////////////// */}
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
            {/* /////////////////////////////////////////////// */}
            <VolumeBar
              isOpen={isOpenVolumeBar}
              volume={props.volume}
              setVolume={props.setVolume}
            />
          </div>

          <p>
            {Math.floor(props.progress / 60)}:
            {alwaysTwoDigits(Math.floor(props.progress % 60))}/
            {Math.floor(props.duration / 60)}:
            {alwaysTwoDigits(Math.floor(props.duration % 60))}
          </p>
        </div>

        <div className="w-full flex flex-row items-center justify-around md:justify-between">
          <ProgressBar {...props} />
          <p className="px-2">
            <FullscreenSvg
              onClick={props.fullscreen}
              width={options.svgSize}
              height={options.svgSize}
            />
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Bottom;
