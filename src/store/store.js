import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

import rootReducer from "../reducers/rootReducer";

const initialStore = {};
const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  initialStore,
  composeEnhancers(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

export default { store, persistor };
