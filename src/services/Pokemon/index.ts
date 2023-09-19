import PokemonApi from '../../api/Pokemon';
import { PokemonInfoFull, PokemonInfo } from './Model';
import { ServiceResourceResponse, ServicePagedResourceResponse } from '../Model';
import { extractEvolutionChain, extractSprites, getArtworkUrl } from './Util';

class PokemonService {
  async getPokemon(idOrName: string):Promise<ServiceResourceResponse<PokemonInfoFull>> {
    if(!idOrName) {
      return { resource: null };
    }

    const normalizedId = idOrName.toLowerCase();
    const { item: apiPokemon } = await PokemonApi.getPokemonByIdOrName({ id: normalizedId });
    if(apiPokemon === null) {
      return { resource: null };
    }

    const { item: apiSpecies } = await PokemonApi.getSpeciesByIdOrName({ id: normalizedId });
    if(apiSpecies === null) {
      return { resource: null };
    }

    const evoUrl = apiSpecies.evolution_chain.url;
    const evoId = evoUrl.split('evolution-chain')[1].replace('/', '');
    const { item: apiEvolutionChain } = await PokemonApi.getEvolutionChainById({ id: evoId });
    if(apiEvolutionChain === null) {
      return { resource: null };
    }

    const {
      id, name, height, weight,
      stats:apiStats, types:apiTypes,
      moves:apiMoves, sprites:apiSprites, abilities: apiAbilities
    } = apiPokemon;

    const avatar = apiSprites.other['official-artwork'].front_default as string;
    const sprites = extractSprites(apiSprites);
    const stats = apiStats.map(s => ({ name: s.stat.name, value: s.base_stat }));
    const types = apiTypes.map(t => t.type.name);
    const moves = apiMoves.map(m => ({ name: m.move.name, url: `https://pokemondb.net/move/${m.move.name}` }));
    const abilities = apiAbilities.map(a => ({ name: a.ability.name, url: a.ability.url }));
    const evolution = extractEvolutionChain(apiEvolutionChain);

    // Grab the first english flavor text
    const flavorText = apiSpecies.flavor_text_entries
      .find(entry => entry.language.name === 'en')?.flavor_text || '';

    const { order, shape, growth_rate: growth, color } = apiSpecies;

    return { resource: { id, avatar, name, height, weight, order, color, growth, shape,
      stats, types, moves, sprites, flavorText, abilities, evolution } };
  }

  async listPokemon(nextUrl: string | null):Promise<ServicePagedResourceResponse<PokemonInfo>> {
    const { next: apiNext, previous: apiPrevious, count, items: apiItems } =
      await PokemonApi.getPokemonlist({ query: nextUrl || null });

    const next = apiNext === null ? null : apiNext.split('?')[1];
    const previous = apiPrevious === null ? null : apiPrevious.split('?')[1];
    const resources = apiItems.map(({ name, url }) => {
      const rawId = url.replace('https://pokeapi.co/api/v2/pokemon-species/', '').replace('/', '');

      const id = Number(rawId);
      const avatar = getArtworkUrl(rawId);

      return { id, name, avatar };
    });

    return { count, resources, next, previous };
  }
}

export default new PokemonService();
