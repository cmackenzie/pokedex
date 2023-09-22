// The Search slice is responsible for managing the search state
// currentSearch tracks the current value of the search box
// searches keeps track of the unique set of previous search
// Not visible here, but we use a localstorage persist middleware
// to save searches in local storage between reload
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
