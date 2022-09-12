'use strict';
import * as React from 'react';
import {createRoot } from 'react-dom/client';
import 'antd/dist/antd.css';
import App from './App';
let domContainer = document.querySelector('#root');
let root = createRoot(domContainer);
root.render(<React.StrictMode>
  <App />
</React.StrictMode>);