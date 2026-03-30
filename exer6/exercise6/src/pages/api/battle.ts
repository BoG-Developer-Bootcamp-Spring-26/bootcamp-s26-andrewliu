//return pokemon1 vs pokemon2 
import { fetchPokemon } from "@/utils/fetch";
import type { NextApiRequest, NextApiResponse } from "next";

type BattleData = {
  message: string;
};

type ErrorData = {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BattleData | ErrorData>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { pokemon1, pokemon2 } = req.body;

  if (!pokemon1 || !pokemon2) {
    return res.status(400).json({ message: "Must provide pokemon1 and pokemon2 in request body" });
  }

  try {
    const [p1, p2] = await Promise.all([
      fetchPokemon(pokemon1),
      fetchPokemon(pokemon2),
    ]);
    const winner = p1.base_stat > p2.base_stat ? p1.name : p2.name;
    return res.status(200).json({ message: `${pokemon1} vs ${pokemon2}: ${winner} wins!` });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred while fetching Pokémon data" });
  }
}
