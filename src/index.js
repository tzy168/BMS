import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './api/mock';

import { Provider } from "react-redux"
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>//容器组件，在开发过程中尽早发现组件中的常见错误
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);


