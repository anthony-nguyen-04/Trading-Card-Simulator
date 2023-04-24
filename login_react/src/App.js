import React from 'react';
import './index.css';
import styles from './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

const StyledButton = styled.button`
color: rgb(122, 177, 255);
font-size: 30px;
font-style: normal;
font-family: Open Sans;
font-weight: 700;
margin-bottom: var(--dl-space-space-twounits);
padding-right: 10 rem;
text-transform: uppercase;
padding: 20;
border: none;
background: white;
`;

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <StyledButton className={styles.button} onClick={() => loginWithRedirect()}>
      LOGIN
    </StyledButton>
  );
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <StyledButton onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      LOGOUT
    </StyledButton>
  );
};

const Home = (props) => {
  return (
    <div className="home-container">
      <div className="home-container1">
        <h1 className="home-heading">CARD.IO</h1>
        <LoginButton />
        <LogoutButton />
        <img
          alt="Card Preview"
          src="/playground_assets/card-icon.png"
          className="home-image"
        />
      </div>
    </div>
  );
};

export default Home;
