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
    pusher.trigger(`${req.body.id}`, "sync", req.body.second);
    // await prisma.room.update({
    //   where: { id: req.body.id },
    //   data: { current_second: req.body.second },
    // });
    // await prisma.$disconnect();
    res.json("es");
  } catch (error) {
    console.log(error);
  }
};
export default handler;
