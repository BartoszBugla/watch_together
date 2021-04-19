import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
// import video from "./sample2.mp4";
import Pusher from "pusher-js";
import ReactPlayer from "react-player/youtube";
import ProgressBar from "./player/ProgressBar";

import type { RoomType } from "types";
import Bottom from "./player/Bottom ";
interface componentProps {
  room: RoomType;
  userId: number;
}
const VideoPlayer: React.FC<componentProps> = ({ room, userId }) => {
  const id = String(room.id);
  // current Second
  // currentVideo
  const player = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(room.current_video);
  const [isPlaying, setIsPlaying] = useState(room.isPlaying);
  const [isMuted, setIsMuted] = useState(true);
  const [currentSecond, setCurrentSecond] = useState(room.current_second);
  const [duration, setDuration] = useState();
  const [isHovering, setIsHovering] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    let pusher = new Pusher("cd9121d850b869bd73fa", {
      cluster: "eu",
    });
    //subscribe room
    let channel = pusher.subscribe(`room-${id}`);
    channel.bind("pusher:subscription_succeeded", () => {
      axios.post("/api/player/requestsync", {
        roomId: room.id,
        to: room.users[0],
        from: userId,
      });
    });
    //actions
    channel.bind("seturl", (data) => {
      setCurrentVideo(data);
    });
    channel.bind("play", (state) => {
      setIsPlaying(state);
    });
    channel.bind("stop", (state) => {
      setIsPlaying(state);
    });
    channel.bind("sync", (currentTime) => {
      setCurrentSecond(currentTime);
    });
    channel.bind("skip", (seconds) => {
      player.current.seekTo(seconds);
      setCurrentSecond(seconds);
    });
    channel.bind("request-sync", ({ from, to }) => {
      if (userId == to)
        axios.post("/api/player/sendsync", {
          to: from,
          seconds: player.current.getCurrentTime(),
          roomId: id,
        });
    });
    channel.bind("receive-sync", ({ seconds, to }) => {
      if (userId == to) {
        setCurrentSecond(seconds);
        player.current.seekTo(seconds);
      }
    });
    return () => {
      pusher.disconnect();
    };
  }, []);
  //action requests
  const play = () => {
    axios.post("/api/player/play", { roomId: String(id) });
  };
  const stop = () => {
    axios.post("/api/player/stop", { roomId: String(id) });
  };

  const playerReady = () => {
    setDuration(player.current.getDuration());
  };
  useEffect(() => {
    setDuration(player.current.getDuration());
  }, [isPlaying]);

  const skipTo = (second) => {
    player.current.seekTo(second);

    setCurrentSecond(second);
    axios.post("/api/player/skip", { roomId: id, second });
  };
  // const sync = (second) => {
  //   console.log("ha ha ha ");
  //   const time = player.current.getCurrentTime();
  //   axios.post("/api/player/sync", { id, second });
  // };
  const onProgressHandler = () => {
    // console.log(player.current.getCurrentTime());
    setCurrentSecond(player.current.getCurrentTime());
  };

  return (
    <div
      // style={{ height: "800px" }}
      style={{
        height: isFullscreen && "100%",
        margin: "auto",
        position: isFullscreen ? "absolute" : "static",
        // paddingTop: "2%",
        // opacity: currentVideo.length < 1 && "0",
        width: isFullscreen && "100%",
        left: 0,
        top: 0,
      }}
      className={`flex flex-col justify-center `}
    >
      <div
        style={{
          height: isFullscreen ? "100%" : "610px",
          margin: "auto",
          position: isFullscreen ? "absolute" : "relative",
          opacity: currentVideo.length < 1 && "0",
          width: isFullscreen ? "100%" : "1080px",
        }}
        // className="w-3/4"
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
        <ReactPlayer
          width="100%"
          height="95%"
          ref={player}
          onPlay={play}
          onPause={stop}
          onStart={play}
          muted={isMuted}
          controls={false}
          playing={isPlaying}
          onProgress={onProgressHandler}
          progressInterval={1000}
          onReady={playerReady}
          url={currentVideo}
          playsinline={false}
          volume={0.5}
          config={{
            //@ts-ignore
            youtube: {
              playerVars: {
                modestbranding: 1,
                color: "white",
                fs: 0,
                disablekb: 1,
                rel: 0,
                iv_load_policy: 3,
                listType: "none",
                cc_load_policy: 0,
                showinfo: 0,
                ecver: 2,
              },
            },
          }}
        ></ReactPlayer>
        <Bottom
          play={play}
          stop={stop}
          progress={currentSecond}
          duration={duration}
          skipTo={skipTo}
          isPlaying={isPlaying}
          isHovering={isHovering}
          isMuted={isMuted}
          mute={() => setIsMuted(!isMuted)}
          fullscreen={() => {
            setIsFullscreen(!isFullscreen);
            var elem = document.documentElement;
            if (!isFullscreen) elem.requestFullscreen();
            if (isFullscreen) document.exitFullscreen();
          }}
          // fullscreen={()=>player.requestFullscreen()}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
