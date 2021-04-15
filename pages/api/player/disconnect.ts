import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import pusher from "helpers/pusher";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const { roomId, userId } = req.body;
    try {
      const { users } = await prisma.room.findFirst({
        where: {
          id: roomId,
        },
      });
      const newArray = users.filter((user) => user != userId);

      console.log("api/disconnect saving new array to db: ", newArray);

      const newRoom = await prisma.room
        .update({
          where: { id: roomId },
          data: {
            users: {
              set: newArray,
            },
          },
        })
        .then(() => console.log("user delted from database"));

      await prisma.$disconnect();
      pusher.trigger(`room-${roomId}`, "user-disconnected", newArray);
      res.json({ msg: "Success", room: newRoom });
    } catch (error) {
      console.log(error);
    }
  }
};
export default handler;
