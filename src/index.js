import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import './index.css';

export const root = createRoot(document.getElementById('root'));
export const domain = process.env.REACT_APP_AUTH0_DOMAIN;
export const clientId = process.env.REACT_APP_AUTH0_FRONTEND_CLIENT_ID;
export const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;
export const secret = process.env.REACT_APP_AUTH0_FRONTEND_CLIENT_SECRET;
export const serverAudience = process.env.REACT_APP_SERVER_AUDIENCE;

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: serverAudience,
    }}
  >
    <App />
  </Auth0Provider>
);
