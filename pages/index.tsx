import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import VideoPlayer from "../components/VideoPlayer";
import Cookies from "cookies";
import getUserIdFromCookies from "../helpers/getUserIdFromCookies";
import Navbar from "../components/navbar";
import LandingHero from "components/LandingHero";
import Button from "components/GenerateRoomButton";
import LandingTitle from "components/LandingTitle";
function Home({ userId }) {
  const router = useRouter();

  const generateRoom = async () => {
    const res = await axios({
      method: "POST",
      url: "/api/room",
      data: { host: Number(userId) },
    });
    console.log(res);
    router.push(`/${res.data.room.id}`);
  };
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <LandingHero />
      <LandingTitle />
      <Button onClick={generateRoom}> Create New Room </Button>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = getUserIdFromCookies(ctx);

  return { props: { userId: id } };
};
export default Home;
