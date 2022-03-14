import { combineReducers } from "redux";
import LoginReducer from "./login";

const rootReducer = combineReducers({
    login: LoginReducer,
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;