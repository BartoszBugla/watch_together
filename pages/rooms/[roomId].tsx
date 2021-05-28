import VideoPlayer from "components/player";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import getUserIdFromCookies from "../../helpers/getUserIdFromCookies";
import Navbar from "components/navbar";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
const prisma = new PrismaClient();
import React from "react";
import type { RoomType } from "types";
import SearchResults from "components/Search/SearchResults";
import Chat from "components/Chat/index";
import { FullscreenContext } from "hooks/useFullscreen";
import { PusherContext } from "hooks/PusherContext";

interface componentProps {
  data: RoomType;
  userId: number;
  query: string;
}

const Home: React.FC<componentProps> = ({ data, userId, query }) => {
  const [currentUsers, setCurrentUsers] = useState(data.users);
  const [isFullscreen] = useContext(FullscreenContext);
  const router = useRouter();
  const pusher = useContext(PusherContext);

  useEffect(() => {
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

  return (
    <div className="flex flex-col min-h-screen relative bg-gray-800 text-gray-200 ">
      {!isFullscreen && (
        <Navbar users={currentUsers} host={data.host} roomId={data.id} />
      )}
      <SearchResults roomId={data.id} userId={userId} />
      <div className="flex-1 w-full relative">
        {!isFullscreen && <Chat userId={userId} roomId={data.id} />}

        <VideoPlayer users={currentUsers} userId={userId} room={data} />
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // if (ctx.req) {
  //   const userAgent = ctx.req.headers["user-agent"];
  //   console.log(userAgent);
  // }
  const room = await prisma.room.findFirst({
    where: { id: String(ctx.query.roomId) },
  });
  await prisma.$disconnect();
  if (!room)
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  const userId = getUserIdFromCookies(ctx);
  return {
    props: {
      data: room,
      userId,
      query: ctx.query.roomId,
    },
  };
};

export default Home;
