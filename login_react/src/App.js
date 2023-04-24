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

//Table for static url lookup.
const cards = {
  "common-1":"https://cdn.discordapp.com/attachments/1075194391616032808/1099856680466010162/Common-1.png",
  "common-2":"https://cdn.discordapp.com/attachments/1075194391616032808/1099856680738631791/Common-2.png",
  "common-3":"https://cdn.discordapp.com/attachments/1075194391616032808/1099856678540820511/Common-3.png",
  "common-4":"https://cdn.discordapp.com/attachments/1075194391616032808/1099856678788288672/Common-4.png",
  "common-5":"https://cdn.discordapp.com/attachments/1075194391616032808/1099856679039938570/Common-5.png",
  "uncommon-1":"https://cdn.discordapp.com/attachments/1075194391616032808/1099856719640809482/Uncommon-1.png",
  "uncommon-2":"https://cdn.discordapp.com/attachments/1075194391616032808/1099856719913423019/Uncommon-2.png",
  "uncommon-3":"https://cdn.discordapp.com/attachments/1075194391616032808/1099856720169287690/Uncommon-3.png",
  "uncommon-4":"https://cdn.discordapp.com/attachments/1075194391616032808/1099856717908557895/Uncommon-4.png",
  "uncommon-5":"https://cdn.discordapp.com/attachments/1075194391616032808/1099856718122471424/Uncommon-5.png",
  "rare-1":"https://cdn.discordapp.com/attachments/1075194391616032808/1099856679329349672/Rare-1.png",
  "rare-2":"https://cdn.discordapp.com/attachments/1075194391616032808/1099856679664898179/Rare-2.png",
  "rare-3":"https://cdn.discordapp.com/attachments/1075194391616032808/1099856679950102539/Rare-3.png",
  "superRare-1":"https://cdn.discordapp.com/attachments/1075194391616032808/1099856718659342416/Super_Rare-1.png",
  "superRare-2":"https://cdn.discordapp.com/attachments/1075194391616032808/1099856718910984312/Super_Rare-2.png",
  "superRare-3":"https://cdn.discordapp.com/attachments/1075194391616032808/1099856719389147166/SuperRare_3.png",
}

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

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (

    isAuthenticated && (
    <div>
        {JSON.stringify(user, null, 4)}
    </div>
    )
  );
};

async function openPack(id) {
  const response = await fetch("http://localhost:5000/user/open", {
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

  console.log(id);

  const packData = await response.json();

  var count = 0;

  const packs = []

  while (count < 5){
    for (let i = 0; i < packData["C"].length; i++) {
        packs[count] = packData["C"][i].name;
        count++;
    }
    for (let i = 0; i < packData["UC"].length; i++) {
        packs[count] = packData["UC"][i].name;
        count++;
    }
    for (let i = 0; i < packData["R"].length; i++) {
        packs[count] = packData["R"][i].name;
        count++;
    }
    for (let i = 0; i < packData["SR"].length; i++) {
        packs[count] = packData["SR"][i].name;
        count++;
    }
  }

//  document.getElementById("cardOne").innerHTML = packs[0];
//  document.getElementById("cardTwo").innerHTML = packs[1];
//  document.getElementById("cardThree").innerHTML = packs[2];
//  document.getElementById("cardFour").innerHTML = packs[3];
//  document.getElementById("cardFive").innerHTML = packs[4];

  document.getElementById("cardOne").innerHTML = "<img width = 200 src="+String(cards[packs[0]] )+">";
  document.getElementById("cardTwo").innerHTML = "<img width = 200 src="+String(cards[packs[1]] )+">";
  document.getElementById("cardThree").innerHTML = "<img width = 200 src="+String(cards[packs[2]] )+">";
  document.getElementById("cardFour").innerHTML = "<img width = 200 src="+String(cards[packs[3]] )+">";
  document.getElementById("cardFive").innerHTML = "<img width = 200 src="+String(cards[packs[4]] )+">";

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
            <h1 id="cardTwo"></h1>
            <h1 id="cardThree"></h1>
            <h1 id="cardFour"></h1>
            <h1 id="cardFive"></h1>
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
        <ShowCards />

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
