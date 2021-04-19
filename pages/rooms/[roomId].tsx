import VideoPlayer from "components/VideoPlayer";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import getUserIdFromCookies from "../../helpers/getUserIdFromCookies";
import Navbar from "components/navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
const prisma = new PrismaClient();
import React from "react";
import type { RoomType } from "types";
import SearchResults from "components/SearchResults";
interface componentProps {
  data: RoomType;
  userId: number;
  query: string;
}

const Home: React.FC<componentProps> = ({ data, userId, query }) => {
  // const [data, setRes] = useState({
  //   users: "",
  //   id: "",
  //   current_video: "",
  //   current_second: 0,
  //   isPlaying: false,
  //   host: 0,
  //   //@ts-ignore
  //   users: [],
  // });
  // useEffect(() => {
  //   axios(`/api/rooms/${query}`).then((r) => {
  //     setRes(r.data.room);
  //   });
  // }, []);
  const [currentUsers, setCurrentUsers] = useState(data.users);

  const router = useRouter();
  useEffect(() => {
    let pusher = new Pusher("cd9121d850b869bd73fa", {
      cluster: "eu",
    });
    //subscribe room
    let channel = pusher.subscribe(`room-${data.id}`);

    channel.bind("pusher:subscription_succeeded", () => {
      axios
        .post("/api/player/connect", {
          roomId: String(data.id),
          userId: Number(userId),
        })
        .then(() =>
          console.log("sending request to api/player/connect with id:", userId)
        );
    });
    channel.bind("user-connected", (state) => {
      setCurrentUsers(state);
    });

    channel.bind("user-disconnected", (state) => {
      setCurrentUsers(state);
    });
    return () => {
      pusher.disconnect();
    };

    //actions
  }, []);
  useEffect(() => {
    const handleRouteChange = () => {
      axios.post("/api/player/disconnect", {
        roomId: String(data.id),
        userId: Number(userId),
      });
    };
    window.onbeforeunload = handleRouteChange;
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
  useEffect(() => {}, [currentUsers]);
  return (
    <div className="flex flex-col min-h-screen relative bg-gray-800 text-gray-200 ">
      <Navbar users={currentUsers} host={data.host} roomId={data.id} />
      <div
        style={{
          width: "100%",
          flex: "1",
          // position: "relative",
        }}
      >
        <SearchResults roomId={data.id} userId={userId} />
        <VideoPlayer userId={userId} room={data} />
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await prisma.room.findFirst({
    where: { id: String(ctx.query.roomId) },
  });
  console.log("respond:", res);
  const userId = getUserIdFromCookies(ctx);
  return {
    props: {
      data: res,
      userId,
      query: ctx.query.roomId,
    },
  };
};

export default Home;
