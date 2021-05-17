import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import ApiHandler from "helpers/apiHandler";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
