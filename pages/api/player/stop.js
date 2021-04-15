const Pusher = require("pusher");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const pusher = new Pusher({
  appId: "1186162",
  key: "cd9121d850b869bd73fa",
  secret: "992af5b349f0a719ec4a",
  cluster: "eu",
  useTLS: true,
});
const handler = async (req, res) => {
  try {
    pusher.trigger(`room-${req.body.id}`, "stop", false);
    await prisma.room.update({
      where: { id: req.body.id },
      data: { isPlaying: false },
    });
    await prisma.$disconnect();
    res.json("Video stopped");
  } catch (error) {
    console.log(error);
  }
};
export default handler;
