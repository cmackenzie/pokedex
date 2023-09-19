export interface PokemonStat {
  name: string
  value: number
}

export interface PokemonInfo {
  id: number
  name: string
  avatar: string
}

export interface PokemonInfoFull extends PokemonInfo {
  stats: PokemonStat[]
  height: number
  weight: number
  types: string[]
  flavorText: string
  order: number
  color: {
    name: string
    url: string
  }
  growth: {
    name: string
    url: string
  }
  shape: {
    name: string
    url: string
  }
  moves: {
    name: string
    url: string
  }[]
  sprites: {
    url: string
  }[]
  abilities: {
    name: string,
    url: string
  }[]
  evolution: EvolutionChain
}

export interface EvolutionTrigger {
  trigger: string
  details: {
    name: string
    value: {
      name: string
    } | string
  }[]
}

export interface EvolutionLink {
  id: number
  avatar: string
  triggers: EvolutionTrigger[]
  species: {
    name: string
    url: string
  }
  evolvesTo: EvolutionLink[]
}

export interface EvolutionChain {
  pokemonInChain: number
  evolvesTo: EvolutionLink[]
}
