import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const API_WS_ROOT = 'ws://localhost:3000/cable'

ReactDOM.render(
  <App />,
  document.getElementById('root'));
registerServiceWorker();
