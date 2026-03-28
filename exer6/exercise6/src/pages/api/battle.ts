import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    res.status(200).json({ name: "John Doe", message: "Success" });
  } else {
    res.status(500).json({ name: "John Doe", message: "Method not allowed" });
  }
}
