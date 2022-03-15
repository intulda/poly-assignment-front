import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import LoginReducer from "./login";
import BoardReducer from "./board";

const persisConfig = {
    key: "root",
    storage: storage,
}

const rootReducer = combineReducers({
    login: LoginReducer,
    board: BoardReducer,
})

export default persistReducer(persisConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;