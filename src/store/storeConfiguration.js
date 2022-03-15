import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "../reducers";
import rootSaga from '../sagas/index';
import { persistStore as persistStoreCreate } from "redux-persist";

const sagaMiddleware = createSagaMiddleware();


const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(sagaMiddleware))
    : composeWithDevTools(applyMiddleware(sagaMiddleware));

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export const persistStore = persistStoreCreate(store);

export default store;