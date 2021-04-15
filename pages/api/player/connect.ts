import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import pusher from "helpers/pusher";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const { roomId, userId } = req.body;
    try {
      const users = await prisma.room.findFirst({
        where: {
          id: roomId,
        },
      });
      const newArray = [...users.users, userId];
      const newRoom = await prisma.room.update({
        where: { id: roomId },
        data: {
          users: { set: newArray },
        },
      });
      await prisma.$disconnect();
      pusher.trigger(`room-${roomId}`, "user-connected", newArray);
      res.json({ msg: "Success", room: newRoom });
    } catch (error) {
      console.log(error);
    }
  }
};
export default handler;
