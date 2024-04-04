import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ColorModeScript } from "@chakra-ui/react";

//para internacionalizacion
import { I18nextProvider } from 'react-i18next';
import i18n from './internacionalizacion/i18n.js';

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode="light" />
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>,
    
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();