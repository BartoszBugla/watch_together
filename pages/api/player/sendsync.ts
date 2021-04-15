import type { NextApiRequest, NextApiResponse } from "next";
import pusher from "helpers/pusher";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const { roomId, seconds, to } = req.body;
    try {
      pusher.trigger(`room-${roomId}`, "receive-sync", { seconds, to });
      res.json({ msg: "sending  sync" });
    } catch (error) {
      console.log(error);
    }
  }
};
export default handler;
