import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PokemonInfo, PokemonInfoFull } from '../services/Pokemon/Model';
import type { RootState } from '../store';

export interface PokemonState {
  next: string | null
  previous: string | null
  count: number
  items: PokemonInfo[]
  pokemon: PokemonInfoFull | null
  loadFailed: boolean
}

export interface ListPokemonPayload {
  items: PokemonInfo[]
  next: string | null
  previous: string | null
  count: number
}

export interface SetPokemonPayload {
  item: PokemonInfoFull | null
  success: boolean
}

// The pokemon slice keeps track of the scrollable pokemon in the dashboard view
// and the visible pokemon on the pokemon view.
// Most of the selectors in this slice are used to support the infinite scrolling functionality
const initialState:PokemonState = {
  items: [],
  next: null,
  previous: null,
  count: 0,
  pokemon: null,
  loadFailed: false
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemonList(state, action: PayloadAction<ListPokemonPayload>) {
      state.items = action.payload.items;
      state.next = action.payload.next;
      state.previous = action.payload.previous;
      state.count = action.payload.count;
      state.loadFailed = false;
    },
    setPokemon(state, action: PayloadAction<SetPokemonPayload>) {
      state.pokemon = action.payload.item;
      state.loadFailed = !action.payload.success;
    }
  }
});

export const { setPokemonList, setPokemon } = pokemonSlice.actions;

export const selectItems = (state: RootState) => state.pokemon.items;
export const selectNext = (state: RootState) => state.pokemon.next;
export const selectCount = (state: RootState) => state.pokemon.count;
export const selectPokemon = (state: RootState) => state.pokemon.pokemon;
export const selectLoadFailed = (state: RootState) => state.pokemon.loadFailed;

export default pokemonSlice.reducer;

