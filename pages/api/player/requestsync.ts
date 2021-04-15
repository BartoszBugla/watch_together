import type { NextApiRequest, NextApiResponse } from "next";
import pusher from "helpers/pusher";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const { roomId, to, from } = req.body;
    try {
      pusher.trigger(`room-${roomId}`, "request-sync", { to, from });
      res.json({ msg: "Requsted for sync" });
    } catch (error) {
      console.log(error);
    }
  }
};
export default handler;
