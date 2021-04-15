import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const newRoom = await prisma.room.create({
        data: {
          current_video: "",
          current_second: 0,
          isPlaying: false,
          host: req.body.host,
        },
      });
      res.json({ msg: "Success", room: newRoom });
    } catch (error) {
      console.log(error);
    }
  }
};
export default handler;
