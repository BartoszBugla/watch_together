import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

import ApiHandler from "helpers/apiHandler";
const prisma = new PrismaClient();
const handler = async (req, res) => {
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
