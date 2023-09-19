import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localstorage

// In larger projects this would configuration setup would be elsewhere
import PokemonReducer from './slices/PokemonSlice';
import SearchReducer from './slices/SearchSlice';

const rootReducer = combineReducers({
  search: SearchReducer,
  pokemon: PokemonReducer,
  router: routerReducer
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['pokemon'],
  whitelist: ['search']
};

const reducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export default () => ({ store, persistor });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
