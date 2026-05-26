import React from 'react';
import ReactDOM from 'react-dom/client';
import { MondrianProvider } from 'mondrian-design';
import 'mondrian-design/styles.css';
import './website.css';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MondrianProvider>
      <App />
    </MondrianProvider>
  </React.StrictMode>,
);
