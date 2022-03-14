import React from 'react';
import ReactDOM from 'react-dom';
import PolyApp from './src';
import { Provider } from "react-redux";
import store from "./src/store/storeConfiguration";

const rootElement = document.querySelector('#polyApp');

ReactDOM.render(
    <Provider store={store}>
        <PolyApp />
    </Provider>
    , rootElement
);
