import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const Pusher = require("pusher");
const pusher = new Pusher({
  appId: "1186162",
  key: "cd9121d850b869bd73fa",
  secret: "992af5b349f0a719ec4a",
  cluster: "eu",
  useTLS: true,
});
const handler = async (req, res) => {
  console.log(`room-${req.body.id}`);
  try {
    pusher.trigger(`room-${req.body.id}`, "play", true);
    await prisma.room.update({
      where: { id: req.body.id },
      data: { isPlaying: true },
    });
    await prisma.$disconnect();

    res.json("Video stopped");
  } catch (error) {
    console.log(error);
  }
};
export default handler;
