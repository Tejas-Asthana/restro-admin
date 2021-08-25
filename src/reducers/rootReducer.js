import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import ErrorReducer from "./errorReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "error"],
};

const rootReducer = combineReducers({
  auth: AuthReducer,
  error: ErrorReducer,
});

export default persistReducer(persistConfig, rootReducer);
