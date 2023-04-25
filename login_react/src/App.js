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
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
        <StyledButton className={styles.button} onClick={() => loginWithRedirect()}>
          LOGIN
        </StyledButton>
    )
  );
};

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
        <StyledButton onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
          LOGOUT
        </StyledButton>
    )
  );
};

function refreshPage(){
    document.getElementById("cardOne").innerHTML = "";
}

const HomeButton = () => {
  const { isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
        <StyledButton onClick={refreshPage}>
          HOME
        </StyledButton>
    )
  );
};

async function openPack(id) {
  const response = await fetch("http://localhost:5000/user/open", {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      //"Access-Control-Allow-Origin" : "http://localhost",
      "pack": "default",
      "id" : id
    }
  });

  console.log(id);

  const packData = await response.json();

  var out = "";

  for (let i = 0; i < packData["C"].length; i++) {
      out = out + "<img width = 200 src=" + packData["C"][i].url + ">";
  }
  for (let i = 0; i < packData["UC"].length; i++) {
      out = out + "<img width = 200 src=" + packData["UC"][i].url + ">";
  }
  for (let i = 0; i < packData["R"].length; i++) {
      out = out + "<img width = 200 src=" + packData["R"][i].url + ">";
  }
  for (let i = 0; i < packData["SR"].length; i++) {
      out = out + "<img width = 200 src=" + packData["SR"][i].url + ">";
  }

    document.getElementById("cardOne").innerHTML = out;

}

async function displayAll(id){
  const response = await fetch("http://localhost:5000/user/view", {
    method: "GET",
    args: {
      "pack" : 1
    },
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      //"Access-Control-Allow-Origin" : "http://localhost",
      "pack": "default",
      "id" : id
    }
  });

  const packData = await response.json();

  var out = "";

  for (let i = 0; i < packData["C"].length; i++) {
      out = out + "<img width = 200 src=" +packData["C"][i].url+">";
  }
  for (let i = 0; i < packData["UC"].length; i++) {
      out = out + "<img width = 200 src=" +packData["UC"][i].url+">";
  }
  for (let i = 0; i < packData["R"].length; i++) {
    out = out + "<img width = 200 src=" +packData["R"][i].url+">";
  }
  for (let i = 0; i < packData["SR"].length; i++) {
    out = out + "<img width = 200 src=" +packData["SR"][i].url+">";
  }

  document.getElementById("cardOne").innerHTML = out;

}

const OpenCardPack = () => {
  const { user, isAuthenticated } = useAuth0();

  var user_id;
  try {
    user_id = String((user.email).split("@", 1));
  } catch (error) {
    console.error(error);
  }

  return (

    isAuthenticated && (
        <div>
            <StyledButton onClick={function(){openPack(user_id)}}>
              Open Pack
            </StyledButton>
            <StyledButton onClick={function(){displayAll(user_id)}}>
              View Cards
            </StyledButton>
        </div>
    )
  );
};


async function displayAll(id){
  const response = await fetch("http://localhost:5000/user/view", {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      //"Access-Control-Allow-Origin" : "http://localhost",
      "pack": "default",
      "id" : id
    }
  });

  const packData = await response.json();

  var out = "";

  for (let i = 0; i < packData["C"].length; i++) {
      out = out + "<img width = 200 src="+packData["C"][i].url+">";
  }
  for (let i = 0; i < packData["UC"].length; i++) {
      out = out + "<img width = 200 src="+packData["UC"][i].url+">";
  }
  for (let i = 0; i < packData["R"].length; i++) {
    out = out + "<img width = 200 src="+packData["R"][i].url+">";
  }
  for (let i = 0; i < packData["SR"].length; i++) {
    out = out + "<img width = 200 src="+packData["SR"][i].url+">";
  }

  document.getElementById("cardOne").innerHTML = out;

}

const ViewAllCards = () => {
  const { user, isAuthenticated } = useAuth0();

  var user_id;
  try {
    user_id = String((user.email).split("@", 1));
  } catch (error) {
    console.error(error);
  }

  return (

    isAuthenticated && (
        <div>
            <StyledButton onClick={function(){displayAll(user_id)}}>
              View All Cards
            </StyledButton>
        </div>
    )
  );
};

const ShowCards = () => {
  const { user, isAuthenticated } = useAuth0();

  return (

    isAuthenticated && (
        <div className="col-md">
            <h1 id="cardOne"></h1>
            <HomeButton />
        </div>
    )
  );
};

const Home = (props) => {


  return (
    <div className="home-container">
      <div className="home-container1">
        <h1 className="home-heading">CARD.IO</h1>
        <LoginButton />
        <LogoutButton />
        <OpenCardPack />
        <ViewAllCards />
        <ShowCards />

        <img
          width='300'
          alt="Card Preview"
          src="/playground_assets/card-icon.png"
          className="home-image"
        />



      </div>
    </div>
  );
};

export default Home;
