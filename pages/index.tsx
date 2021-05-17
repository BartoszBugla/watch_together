import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { motion } from "framer-motion";

import getUserIdFromCookies from "../helpers/getUserIdFromCookies";
import Navbar from "../components/navbar";
import LandingHero from "components/landingPage/LandingHero";
import Button from "components/landingPage/GenerateRoomButton";
import LandingTitle from "components/landingPage/LandingTitle";
//@ts-ignore
import LoadingSvg from "public/loading.svg";

function Home({ userId }) {
  const router = useRouter();
  const [isLoadingRoom, setIsloadingRoom] = useState(false);
  const [error, setError] = useState(false);
  const generateRoom = async () => {
    try {
      setIsloadingRoom(true);
      const res = await axios({
        method: "POST",
        url: "/api/rooms",
        data: { host: Number(userId) },
      });

      if (res.status != 200) throw new Error();
      setIsloadingRoom(false);
      if (res.status == 200) router.push(`/rooms/${res.data.room.id}`);
    } catch (error) {
      // setError(true);
    }
  };
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <LandingHero />
      <LandingTitle />
      <Button onClick={generateRoom}> Create New Room </Button>
      {(isLoadingRoom || error) && <CreatingRoomMessage err={error} />}
    </div>
  );
}
const CreatingRoomMessage = ({ err }) => {
  return (
    <motion.div
      style={{ translateX: "-50%" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, translateY: "-10px" }}
      className="absolute bg-opacity-100 bottom-5 w-80  bg-red-300 p-2 transform left-1/2 rounded-md grid grid-cols-3 align-middle justify-items-center drop-shadow"
    >
      <div className="  col-start-1 col-end-3 flex flex-col justify-center items-center">
        <p className=" text-center inline-block align-middle ">
          {err
            ? "Error occured while creating your room"
            : "Generating your room"}
        </p>
      </div>
      {err ? "" : <LoadingSvg width={32} />}
    </motion.div>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = getUserIdFromCookies(ctx);

  return { props: { userId: id } };
};
export default Home;
