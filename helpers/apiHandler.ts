import type { NextApiRequest, NextApiResponse } from "next";
type Method = "POST" | "GET" | "PUT" | "DELETE";

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
  method: Method,
  callback
) => {
  if (req.method == method) {
    try {
      await callback();
    } catch (error) {
      res.status(400).json({
        msg: error.message,
        status: "400",
        error,
      });
    }
  }
};
