import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  currentSearch: string | null
  searches: string[]
}

const initialState:SearchState = {
  currentSearch: null,
  searches: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearchOption(state, action: PayloadAction<string>) {
      const newSavedSearches = Array.from(new Set([...state.searches, action.payload])).sort();
      state.currentSearch = action.payload;
      state.searches = newSavedSearches;
    },
    resetSearch(state) {
      state.currentSearch = null;
    }
  }
});

export const { addSearchOption, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
