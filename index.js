import React from 'react';
import ReactDOM from 'react-dom';
import PolyApp from './src';
import { Provider } from "react-redux";
import store, {persistStore} from "./src/store/storeConfiguration";
import {PersistGate} from "redux-persist/integration/react";
import {BrowserRouter} from "react-router-dom";

const rootElement = document.querySelector('#polyApp');

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistStore}>
            <BrowserRouter>
                <PolyApp />
            </BrowserRouter>
        </PersistGate>
    </Provider>
    , rootElement
);
