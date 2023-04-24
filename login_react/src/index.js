import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import './style.css';
import './index.css';
import './App.css';

ReactDOM.render(
  <Auth0Provider
    domain="dev-isp3b2lyeu4xroe0.us.auth0.com"
    clientId="AjtYri5A4DmP72wPzYMsE7oWdPWQv2WR"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);