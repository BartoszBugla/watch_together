import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import apiHandler from "helpers/apiHandler";
const handler = async (req, res) => {
  await apiHandler(req, res, "GET", async () => {
    console.log(req.query.id);
    const room = await prisma.room.findFirst({
      where: { id: String(req.query.id) },
    });
    res.json({ msg: "Success", room });
  });
};
export default handler;
