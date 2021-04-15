import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
// import video from "./sample2.mp4";
import Pusher from "pusher-js";
import ReactPlayer from "react-player/youtube";
import ProgressBar from "./player/ProgressBar";
import ChangeUrlInput from "./player/ChangeUrlInput";

const VideoPlayer = ({ data, userId }) => {
  const { id } = data;
  // current Second
  // currentVideo
  const player = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(data.current_video);
  const [isPlaying, setIsPlaying] = useState(data.isPlaying);
  const [isMuted, setIsMuted] = useState(true);
  const [url, setUrl] = useState();
  const [currentSecond, setCurrentSecond] = useState(data.current_second);
  const [duration, setDuration] = useState();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let pusher = new Pusher("cd9121d850b869bd73fa", {
      cluster: "eu",
    });
    //subscribe room
    let channel = pusher.subscribe(`room-${id}`);
    channel.bind("pusher:subscription_succeeded", () => {
      axios
        .post("api/player/requestsync", {
          roomId: data.id,
          to: data.users[0],
          from: userId,
        })
        .then(() => console.log("requestiing for sync "));
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
        axios
          .post("api/player/sendsync", {
            to: from,
            seconds: player.current.getCurrentTime(),
            roomId: id,
          })
          .then(() =>
            console.log(
              "I got requested and i am sending:",
              player.current.getCurrentTime()
            )
          );
    });
    channel.bind("receive-sync", ({ seconds, to }) => {
      if (userId == to) {
        setCurrentSecond(seconds);
        console.log(" I receved currentTime ", seconds);
        player.current.seekTo(seconds);
      }
    });
    console.log(player);
    return () => {
      pusher.disconnect();
    };
  }, []);
  //action requests
  const play = () => {
    axios.post("/api/player/play", { id });
  };
  const stop = () => {
    axios.post("/api/player/stop", { id });
  };

  const playerReady = () => {
    setDuration(player.current.getDuration());
  };
  useEffect(() => {
    console.log("changingVideo", player.current.getDuration());
    setDuration(player.current.getDuration());
  }, [isPlaying]);

  const skipTo = (second) => {
    player.current.seekTo(second);
    console.log(second);
    setCurrentSecond(second);
    axios.post("api/player/skip", { id: data.id, second });
  };
  // const sync = (second) => {
  //   console.log("ha ha ha ");
  //   const time = player.current.getCurrentTime();
  //   axios.post("/api/player/sync", { id, second });
  // };
  const onProgressHandler = () => {
    // console.log(player.current.getCurrentTime());
    setCurrentSecond(player.current.getCurrentTime());

    axios.post("/api/player/sync", { id, second: currentSecond });
  };

  return (
    <div style={{ height: "800px" }} className=" flex flex-col justify-center ">
      <div
        style={{
          height: "610px",
          margin: "auto",
          position: "relative",
          opacity: currentVideo.length < 1 && "0",
          width: "1080px",
        }}
        className="w-3/4"
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
        <ReactPlayer
          width="100%"
          height="100%"
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
          config={{
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
        <ProgressBar
          progress={currentSecond}
          duration={duration}
          skipTo={skipTo}
          isPlaying={isPlaying}
          isHovering={isHovering}
        />
      </div>

      <ChangeUrlInput id={id} />
    </div>
  );
};

export default VideoPlayer;
