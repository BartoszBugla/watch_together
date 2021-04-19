import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import ApiHandler from "helpers/apiHandler";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  const uuid = uuidv4();

  await ApiHandler(req, res, "POST", async () => {
    const newRoom = await prisma.room.create({
      data: {
        current_video: "",
        current_second: 0,
        isPlaying: false,
        host: req.body.host,
      },
    });
    res.json({ msg: "Success", room: newRoom });
  });
};
export default handler;
