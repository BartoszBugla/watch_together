import VideoPlayer from "../components/VideoPlayer";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import getUserIdFromCookies from "../helpers/getUserIdFromCookies";
import Navbar from "../components/navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
const prisma = new PrismaClient();
const Home = ({ data, userId }) => {
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
        .post("api/player/connect", {
          roomId: Number(data.id),
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
      axios.post("api/player/disconnect", {
        roomId: Number(data.id),
        userId: Number(userId),
      });
    };
    window.onbeforeunload = handleRouteChange;
    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
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
        }}
      >
        <VideoPlayer userId={userId} data={data} />
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //   console.log(ctx.query.roomId);
  const res = await prisma.room.findFirst({
    where: { id: Number(ctx.query.roomId) },
  });

  const userId = getUserIdFromCookies(ctx);
  return {
    props: {
      data: res,
      userId,
    },
  };
};

export default Home;
