import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import pusher from "helpers/pusher";
import apiHandler from "helpers/apiHandler";

const handler = async (req, res) => {
  const { roomId } = req.body;
  await apiHandler(req, res, "POST", async () => {
    pusher.trigger(`room-${roomId}`, "play", true);
    await prisma.room.update({
      where: { id: roomId },
      data: { isPlaying: true },
    });
    await prisma.$disconnect();
    res.json({ msg: "Video started", status: 200 });
  });
};

export default handler;
