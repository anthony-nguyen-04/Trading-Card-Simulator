import logo from './logo.svg';
import './App.css';


var pack = [];
var page = 0;

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
  "rare-4": "https://cdn.discordapp.com/attachments/1075194391616032808/1099856680222736504/Rare-4.png",
  "rare-5": "https://cdn.discordapp.com/attachments/1075194391616032808/1099856718386708591/Rare-5.png",
  "superRare-1":"https://cdn.discordapp.com/attachments/1075194391616032808/1099856718659342416/Super_Rare-1.png",
  "superRare-2":"https://cdn.discordapp.com/attachments/1075194391616032808/1099856718910984312/Super_Rare-2.png",
  "superRare-3":"https://cdn.discordapp.com/attachments/1075194391616032808/1099856719389147166/SuperRare_3.png",
}


async function openPack() {
  const response = await fetch("http://localhost:5000/user/open", {
    method: "GET",
    args: {
      "pack" : 1
    },
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      //"Access-Control-Allow-Origin" : "http://localhost",
      "pack": "default",
      "id" : "troymiller",
      "pass" : "123"
    }
  });
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

  var out = "";
  for (let i =0; i < packs.length; i++){
    out = out + "<img src="+String(cards[packs[i]] )+">"
  }

  document.getElementById("cardOne").innerHTML = "Cards opened";
  document.getElementById("cardTwo").innerHTML = out;

  //document.getElementById("cardOne").innerHTML = "<img src="+String(cards[packs[0]] )+">";
  //document.getElementById("cardTwo").innerHTML = "<img src="+String(cards[packs[1]] )+">";
  //document.getElementById("cardThree").innerHTML = "<img src="+String(cards[packs[2]] )+">";
  //document.getElementById("cardFour").innerHTML = "<img src="+String(cards[packs[3]] )+">";
  //document.getElementById("cardFive").innerHTML = "<img src="+String(cards[packs[4]] )+">";

}

async function displayCard(){
  const response = await fetch("http://localhost:5000/user/view", {
    method: "GET",
    args: {
      "pack" : 1
    },
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      //"Access-Control-Allow-Origin" : "http://localhost",
      "pack": "default",
      "id" : "troymiller",
      "pass" : "123"
    }
  });

  const packData = await response.json();

  var numCommons = packData["C"].length;
  var numUncommons = packData["UC"].length;
  var numRares = packData["R"].length;
  var numSuperRares = packData["SR"].length;
  var count = 0;

  if (page >= (numCommons + numUncommons + numRares + numSuperRares)/5){
    page--;
  }
  if (page < 0){
    page = 0;
  }


  const packs = []
  var x = page*5;
  var x2 = x + 4;
  




  if (x < (numCommons)){
    for (let i = 0; x < (x2 && numCommons) ; x++) {
      packs[count] = packData["C"][x].name;
      count++;
    }
  }
  x = x - numCommons;
  x2 = x2 - numCommons;
  if ((x < ((numUncommons))) && (count < 5)){
    for (let i = 0; (x < (x2 && numUncommons)) && (count < 5) ; x++) {
      packs[count] = packData["UC"][x].name;
      count++;
    }
  }
  x = x - numUncommons;
  x2 = x2 - numUncommons;
  if (x < (numRares)){
    for (let i = 0; (x < (x2 && numRares)) && (count < 5) ; x++) {
      packs[count] = packData["R"][x].name;
      count++;
    }
  }
  x = x - numRares;
  x2 = x2 - numRares;
  if (x < (numSuperRares) - 1){
    for (let i = 0; x < (x2 && numSuperRares) ; x++) {
      packs[count] = packData["SR"][x].name;
      count++;
    }
  }

  var out = "";
  for (let i =0; i < packs.length(); i++){
    out = out + "<img src="+String(cards[packs[i]] )+">"
  }

  document.getElementById("cardOne").innerHTML = "Cards opened";
  document.getElementById("cardTwo").innerHTML = out;
  //document.getElementById("cardThree").innerHTML = "<img src="+String(cards[packs[2]] )+">";
  //document.getElementById("cardFour").innerHTML = "<img src="+String(cards[packs[3]] )+">";
  //document.getElementById("cardFive").innerHTML = "<img src="+String(cards[packs[4]] )+">";
}

function prevPage(){
  page--;
  displayCard();
}
function nextPage(){
  page++;
  displayCard();
}

async function displayAll(){
  const response = await fetch("http://localhost:5000/user/view", {
    method: "GET",
    args: {
      "pack" : 1
    },
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      //"Access-Control-Allow-Origin" : "http://localhost",
      "pack": "default",
      "id" : "troymiller",
      "pass" : "123"
    }
  });

  const packData = await response.json();

  var out = "";

  for (let i = 0; i < packData["C"].length; i++) {
      out = out + "<img src="+cards[packData["C"][i].name]+">";
  }
  for (let i = 0; i < packData["UC"].length; i++) {
      out = out + "<img src="+cards[packData["UC"][i].name]+">";
  }
  for (let i = 0; i < packData["R"].length; i++) {
    out = out + "<img src="+cards[packData["R"][i].name]+">";
  }
  for (let i = 0; i < packData["SR"].length; i++) {
    out = out + "<img src="+cards[packData["SR"][i].name]+">";
  }

  document.getElementById("cardOne").innerHTML = "All Cards"
  document.getElementById("cardTwo").innerHTML = out;

}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="http://localhost:3000/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open cards
        </a>

            <button onClick={openPack}>OPEN PACK</button>
            <button onClick={displayAll}>SHOW ALL</button>
            <button onClick={displayCard}>DISPLAY CARDS</button>
            <button onClick={prevPage}>PREV PAGE</button>
            <button onClick={nextPage}>NEXT PAGE</button>

            <div className="col-md">
                <h1 id="cardOne">N/A</h1>
                <h1 id="cardTwo">N/A</h1>
            </div>


      </header>
    </div>
  );
}

export default App;