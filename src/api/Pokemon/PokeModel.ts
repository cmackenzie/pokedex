export interface PokemonResourceLocation {
  name: string
  url: string
}

export interface SpriteInfo {
  back_default: string | null
  back_female: string | null
  back_shiny: string | null
  back_shiny_female: string | null
  front_default: string | null
  front_female: string | null
  front_shiny: string | null
  front_shiny_female: string | null
  other: {
    dream_world: {
      front_default: string | null
      front_female: string | null
    },
    home: {
      front_default: string | null
      front_female: string | null
      front_shiny: string | null
      front_shiny_female: string | null
    },
    'official-artwork': {
      front_default: string | null
      front_shiny: string | null
    }
  }
  versions: {[index:string]: object } | undefined
}

export interface Pokemon {
  height: number
  held_items: [],
  id: number
  is_default: true,
  location_area_encounters: string
  name: string
  order: number
  weight: number
  base_experience: number
  abilities: {
    ability: {
      name: string
      url: string
    },
    is_hidden: boolean
    slot: number
  }[],
  moves: {
    move: {
      name: string
      url: string
    }
  }[]
  species: {
    name: string
    url: string
  },
  stats: {
    base_stat: number
    effort: number
    stat: {
      name: string
      url: string
    }
  }[],
  types: {
    slot: number
    type: {
      name: string
      url: string
    }
  }[]
  sprites: SpriteInfo
}

export interface PokemonSpecies {
  id: number
  has_gender_differences: boolean
  hatch_counter: number
  is_baby: boolean
  is_legendary: boolean
  is_mythical: boolean
  name: string
  order: number
  base_happiness: number
  capture_rate: number
  color: {
    name: string
    url: string
  },
  growth: {
    name: string
    url: string
  },
  shape: {
    name: string
    url: string
  },
  egg_groups: {
    name: string
    url: string
  }[],
  evolution_chain: {
    url: string
  },
  evolves_from_species: {
    name: string
    url: string
  },
  flavor_text_entries: {
    flavor_text: string
    language: {
      name: string
    }
  }[],
  forms_switchable: boolean
  gender_rate: number
  growth_rate: {
    name: string
    url: string
  },
  habitat: {
    name: string
    url: string
  }
}

export interface EvolutionLink {
  evolution_details: { [index: string]: | string | number | boolean | null }[]
  species: {
    name: string
    url: string
  }
  evolves_to: EvolutionLink[]
}

export interface EvolutionChain {
  chain: EvolutionLink
}
