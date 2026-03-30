//return list of pokemon of a given type (query)
import { fetchType } from "@/utils/fetch";
import type { NextApiRequest, NextApiResponse } from "next";

type TypeData = {
  pokemon: string[];
};

type ErrorData = {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TypeData | ErrorData>,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { type } = req.query;

  if (!type || typeof type !== "string") {
    return res.status(400).json({ message: "Must provide type in request query" });
  }

  try {
    const data = await fetchType(type);
    return res.status(200).json({ pokemon: data.pokemon });
  } catch (error) {
    return res.status(500).json({ message: `Could not find pokemon of type: ${type}` });
  }
}
