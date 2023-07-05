import { Settings } from 'luxon';
import React from 'react';
import ReactDOM from 'react-dom';
import 'reflect-metadata';
import 'virtual:windi.css';
import reportWebVitals from './reportWebVitals';

import './screens/scanInterface';
import './styles.module.css';
import App from "./components/App/App";


Settings.defaultLocale = 'ru'
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
