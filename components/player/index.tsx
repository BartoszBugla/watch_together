import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
// import video from "./sample2.mp4";
import Pusher from "pusher-js";
import ReactPlayer from "react-player/youtube";
import ProgressBar from "./ProgressBar";

import type { RoomType } from "types";
import { useLogger } from "hooks/useChat";
import Bottom from "./Bottom ";
import { FullscreenContext } from "hooks/useFullscreen";
import { PusherContext } from "hooks/PusherContext";

interface componentProps {
  room: RoomType;
  userId: number;
  users: number[];
}
const VideoPlayer: React.FC<componentProps> = ({ room, userId, users }) => {
  const id = String(room.id);
  const { log } = useLogger("Video Player");

  // current Second
  // currentVideo
  const player = useRef(null);

  const [currentVideo, setCurrentVideo] = useState(room.current_video);
  const [isPlaying, setIsPlaying] = useState(room.isPlaying);
  const [currentSecond, setCurrentSecond] = useState(room.current_second);

  const [isMuted, setIsMuted] = useState(true);
  const [duration, setDuration] = useState();
  const [isHovering, setIsHovering] = useState(false);
  const [isFullscreen, setIsFullscreen] = useContext(FullscreenContext);
  const [volume, setVolume] = useState(0.5);
  const pusher = useContext(PusherContext);
  useEffect(() => {
    //subscribe room
    let channel = pusher.subscribe(`room-${id}`);
    channel.bind("pusher:subscription_succeeded", () => {
      const availableUsers = room.users.filter((i) => i != userId);
      console.log(users);

      axios
        .post("/api/player/requestsync", {
          roomId: room.id,
          to: room.users[0],
          from: userId,
        })
        .then(() => log("pusher", "requested for sync "));
    });
    //actions
    channel.bind("seturl", (data) => {
      setCurrentVideo(data);
    });
    channel.bind("play", (state) => {
      setIsPlaying(state);
      log("pusher", "Video has been started");
    });
    channel.bind("stop", (state) => {
      setIsPlaying(state);
      log("pusher", "Video has been stopped");
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
        log("pusher", `sync received ${seconds}`);
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
    setIsPlaying(() => true);
    axios.post("/api/player/play", { roomId: String(id) });
  };
  const stop = () => {
    setIsPlaying(() => false);
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

  const onProgressHandler = () => {
    setCurrentSecond(player.current.getCurrentTime());
  };
  const handleFullscreen = () => {
    var elem = document.documentElement;
    if (!isFullscreen) elem.requestFullscreen();
    if (isFullscreen && document != undefined) document.exitFullscreen();
  };

  const handleFullscreenChange = (e) => {
    setIsFullscreen((isFullscreen) => (isFullscreen ? false : true));
  };
  useEffect(() => {
    window.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      window.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div
      style={{
        // height: h,
        opacity: currentVideo.length < 1 && "0",
        // width: w,
      }}
      className={` ${
        !isFullscreen &&
        " mt-10 md:h-playerMd md:w-playerMd w-playerSm  h-playerSm lg:h-playerLg lg:w-playerLg"
      }  mx-auto flex flex-col relative max-w-screen ${
        isFullscreen && "w-screen h-screen"
      }   overflow-hidden `}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <ReactPlayer
        width="100%"
        height="100%"
        ref={player}
        // onPlay={play}
        // onPause={stop}

        // onStart={play}
        muted={isMuted}
        controls={false}
        playing={isPlaying}
        onProgress={onProgressHandler}
        progressInterval={1000}
        onReady={playerReady}
        url={currentVideo}
        playsinline={false}
        volume={volume}
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
      >
        {" "}
      </ReactPlayer>
      <div
        onClick={isPlaying ? stop : play}
        className="absolute w-full h-full z-20"
      ></div>
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
        volume={volume}
        setVolume={setVolume}
        fullscreen={handleFullscreen}
      />
    </div>
  );
};

export default VideoPlayer;
