import axios from 'axios';
import { ApiResponse, PagedApiResponse } from '../Model';
import { Pokemon, PokemonSpecies, PokemonResourceLocation, EvolutionChain } from './PokeModel';

const BASE_API = process.env.REACT_APP_POKEDEX_API_URL;

export interface ResourceRequest { id: string }
export interface ResourcePageRequest { query: string | null }

export type GetPokemonByIdOrNameResponse = ApiResponse<Pokemon>
export type GetSpeciesByIdOrNameResponse = ApiResponse<PokemonSpecies>
export type GetEvolutionChainByIdResponse = ApiResponse<EvolutionChain>
export type GetPokemonListResponse = PagedApiResponse<PokemonResourceLocation>

class PokemonApi {
  async getPokemonByIdOrName(request: ResourceRequest):Promise<GetPokemonByIdOrNameResponse> {
    try {
      const { id } = request;
      const response = await axios.get(`${BASE_API}/pokemon/${id}`);
      if(response.status == 200) {
        return { item: response.data as Pokemon };
      }
    }
    catch(error) {
      console.log(error);
      return { item: null };
    }

    return { item: null };
  }

  async getSpeciesByIdOrName(request: ResourceRequest):Promise<GetSpeciesByIdOrNameResponse> {
    try {
      const { id } = request;
      const response = await axios.get(`${BASE_API}/pokemon-species/${id}`);
      if(response.status == 200) {
        return { item: response.data as PokemonSpecies };
      }
    }
    catch(error) {
      console.log(error);
      return { item: null };
    }
    return { item: null };
  }

  async getEvolutionChainById(request: ResourceRequest):Promise<GetEvolutionChainByIdResponse> {
    try {
      const { id } = request;
      const response = await axios.get(`${BASE_API}/evolution-chain/${id}`);
      if(response.status == 200) {
        return { item: response.data as EvolutionChain };
      }
    }
    catch(error) {
      console.log(error);
      return { item: null };
    }
    return { item: null };
  }

  async getPokemonlist(request: ResourcePageRequest):Promise<GetPokemonListResponse> {
    const { query } = request;
    const queryParam = query ? `?${query}` : '';
    const url = `${BASE_API}/pokemon-species${queryParam}`;

    try {
      const response = await axios.get(url);
      if(response.status == 200) {
        const { count, next, previous, results } = response.data;
        return { count, next, previous, items: results as PokemonResourceLocation[] };
      }
    } catch(error) {
      console.log(error);
      return { count: 0, next: null, previous: null, items: [] };
    }

    return { count: 0, next: null, previous: null, items: [] };
  }
}

export default new PokemonApi();
