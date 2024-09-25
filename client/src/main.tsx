import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Auth0Provider } from '@auth0/auth0-react';
import { auth0Domain, auth0ClientId } from './configuration/env.dev.ts';

createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain={auth0Domain}
    clientId={auth0ClientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://gerenciador.condominios",
      scope: "read:messages write:messages delete:messages"
    }}
  >
    <StrictMode>
      <App />
    </StrictMode>
  </Auth0Provider>,
);
