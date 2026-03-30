// returns the name, sprite, and type of random Pokemon
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchPokemon } from "../../utils/fetch";

type PokemonData = {
  name: string;
  sprite: string;
  type: string;
  message: string;
};

type ErrorData = {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PokemonData | ErrorData>,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const randomId = Math.floor(Math.random() * 1025) + 1;
    const data = await fetchPokemon(randomId.toString());

    return res.status(200).json({ 
      name: data.name,
      sprite: data.sprite,
      type: data.type,
      message: "Successfully fetched random Pokemon!" 
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
}
