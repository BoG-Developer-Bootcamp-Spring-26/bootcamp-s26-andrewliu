// returns the name, sprite, and type of random Pokemon
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  sprite: string;
  type: string;
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    res.status(200).json({ 
      name: "John Doe",
      sprite: "link",
      type: "normal",
      message: "Success" 
    });
  } else {
    res.status(500).json({ 
      name: "John Doe",
      sprite: "link",
      type: "normal",
      message: "Method not allowed" 
    });
  }
}
