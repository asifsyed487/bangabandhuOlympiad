import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

import rootReducer from "./index";

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: "root",
  // Storage Method (React Native)
  storage: storage,
  // Whitelist (Save Specific Reducers)
  whitelist: ["UserReducer", "challengeReducer"],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [""],
};
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

const store = createStore(persistedReducer, applyMiddleware(...middleware));

// Middleware: Redux Persist Persister
let persistor = persistStore(store);
// Exports
export { store, persistor };
