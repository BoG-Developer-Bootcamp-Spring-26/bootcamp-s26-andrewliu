// returns the name, sprite, and type of random Pokemon
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchEvolution } from "../../../utils/fetch";

type EvolutionData = {
  name: string;
  message: string;
};

type ErrorData = {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EvolutionData | ErrorData>,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ 
      message: "Method not allowed" 
    });
  }

  const { name } = req.query;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ 
      message: "Invalid Pokemon name" 
    });
  }

  try {
    const data = await fetchEvolution(name as string);

    return res.status(200).json({ 
      name: data.name,
      message: "Pokemon successfully fetched!" 
    });

  } catch (error) {
    res.status(500).json({ 
      message: `Could not find evolution for: ${name}`
    });
  }
}
