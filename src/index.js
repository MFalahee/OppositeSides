'use strict';
import * as React from 'react';
import {createRoot } from 'react-dom/client';
import 'antd/dist/antd.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
let domContainer = document.querySelector('#root');
let root = createRoot(domContainer);
root.render(<React.StrictMode>
  <App />
</React.StrictMode>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
