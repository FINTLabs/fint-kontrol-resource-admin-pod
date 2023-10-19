import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {GlobalStyle} from "./global-styles";


const root = ReactDOM.createRoot(
  document.getElementById('fint-kontroll-resource-admin-pod') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <GlobalStyle />
          <App/>
      </BrowserRouter>
  </React.StrictMode>
);
