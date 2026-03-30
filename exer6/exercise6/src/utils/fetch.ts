//basic +adding base stat for battle comparison
export async function fetchPokemon(name: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await response.json();
  return {
    name: data.name,
    sprite: data.sprites.front_default,
    type: data.types[0].type.name,
    base_stat: data.stats.reduce((sum: number, stat: { base_stat: number }) => sum + stat.base_stat, 0),
  };
}

//map the data to get the pokemon names from the type endpoint
export async function fetchType(type: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data = await response.json();
  return {
    pokemon: data.pokemon.map((p: { pokemon: { name: string } }) => p.pokemon.name),
  };
}

//get species data first, then use the evolution chain url to get the evo chain data 
export async function fetchEvolution(name: string) {
  const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
  const speciesData = await speciesResponse.json();

  const evolutionResponse = await fetch(speciesData.evolution_chain.url);
  const evolutionData = await evolutionResponse.json();

  //iter through the chain
  let current = evolutionData.chain;
  while (current) {
    if (current.species.name === name) {
      // if no next evo, ret current 
      if (current.evolves_to.length === 0) {
        return { name: current.species.name };
      }
      //ret next evo
      return { name: current.evolves_to[0].species.name };
    }
    current = current.evolves_to[0];
  }
  throw new Error(`Could not find evolution for ${name}`);
}
