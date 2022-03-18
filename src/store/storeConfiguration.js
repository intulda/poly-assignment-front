import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "../reducers";
import rootSaga from '../sagas/index';
import { persistStore as persistStoreCreate } from "redux-persist";
import axios from "axios";

const sagaMiddleware = createSagaMiddleware();


const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(sagaMiddleware))
    : composeWithDevTools(applyMiddleware(sagaMiddleware));

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

axios.defaults.baseURL = "http://localhost:8082/api/v1";

export const persistStore = persistStoreCreate(store);

export default store;