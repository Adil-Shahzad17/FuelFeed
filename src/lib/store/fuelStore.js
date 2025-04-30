import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./authSlice";
import UserSlice from "./userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

// Wrap reducers with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, AuthSlice);
const persistedUserReducer = persistReducer(persistConfig, UserSlice);

// Create the Redux store
export const FuelStore = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Redux Persist uses non-serializable actions (like `REHYDRATE`)
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(FuelStore);
