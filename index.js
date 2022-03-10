import React from 'react';
import ReactDom from 'react-dom';
import PolyApp from './src/index';
import { Provider } from "react-redux";
import store from "./src/store/storeConfiguration";

const rootElement = document.querySelector('#polyApp');

ReactDom.render(
    <Provider store={store}>
        <PolyApp />
    </Provider>
    , rootElement
);
