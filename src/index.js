import React from 'react';
import './index.css';
import App from './App';

import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

export const root = createRoot(document.getElementById('root'));
export const domain = process.env.REACT_APP_AUTH0_DOMAIN;
export const clientId = process.env.REACT_APP_AUTH0_FRONTEND_CLIENT_ID;
export const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;
export const secret = process.env.REACT_APP_AUTH0_FRONTEND_CLIENT_SECRET;
export const serverAudience = process.env.REACT_APP_SERVER_AUDIENCE;
export let redirect_url = process.env.REACT_APP_REDIRECT_URL;

root.render(
<Auth0Provider
    domain = {domain}
    clientId = {clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: {serverAudience}
    }}
  >
    <App />
  </Auth0Provider>,
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
