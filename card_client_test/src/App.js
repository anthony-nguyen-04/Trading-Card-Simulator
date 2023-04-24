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
  "superRare-1":"https://cdn.discordapp.com/attachments/1075194391616032808/1099856718659342416/Super_Rare-1.png",
  "superRare-2":"https://cdn.discordapp.com/attachments/1075194391616032808/1099856718910984312/Super_Rare-2.png",
  "superRare-3":"https://cdn.discordapp.com/attachments/1075194391616032808/1099856719389147166/SuperRare_3.png",
}


async function sayHello() {
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
  const jsonData = await response.json();
  pack = jsonData;
  console.log(jsonData);


}

function displayCard(){
  var numCommons = pack["C"].length;
  var numUncommons = pack["UC"].length;
  var numRares = pack["R"].length;
  var numSuperRares = pack["SR"].length;
  var count = 0;

  const packs = []
  var x = page;

  while (count < 5){
    for (let i = 0; i < numCommons; i++) {
        packs[count] = pack["C"][i].name;
        count++;
    }
    for (let i = 0; i < numUncommons; i++) {
        packs[count] = pack["UC"][i].name;
        count++;
    }
    for (let i = 0; i < numRares; i++) {
        packs[count] = pack["R"][i].name;
        count++;
    }
    for (let i = 0; i < numSuperRares; i++) {
        packs[count] = pack["SR"][i].name;
        count++;
    }
  }


  document.getElementById("cardOne").innerHTML = "<img src="+String(cards[packs[0]] )+">";
  document.getElementById("cardTwo").innerHTML = "<img src="+String(cards[packs[1]] )+">";
  document.getElementById("cardThree").innerHTML = "<img src="+String(cards[packs[2]] )+">";
  document.getElementById("cardFour").innerHTML = "<img src="+String(cards[packs[3]] )+">";
  document.getElementById("cardFive").innerHTML = "<img src="+String(cards[packs[4]] )+">";

}

async function displayCard2(){
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

  var numCommons = pack["C"].length;
  var numUncommons = pack["UC"].length;
  var numRares = pack["R"].length;
  var numSuperRares = pack["SR"].length;
  var count = 0;

  const packs = []
  var x = page*5;
  var x2 = x + 4;
  


  if (x < (numCommons) - 1){
    for (let i = 0; x < (x2 && numCommons) ; x++) {
      packs[count] = pack["C"][x].name;
      count++;
    }
  }
  x = x - numCommons;
  if ((x < ((numUncommons) - 1)) && (count < 5)){
    for (let i = 0; x < (x2 && numCommons) ; x++) {
      packs[count] = pack["UC"][x].name;
      count++;
    }
  }
  x = x - numUncommons;
  if (x < (pack["C"].length) - 1){
    for (let i = 0; x < (x2 && numRares) ; x++) {
      packs[count] = pack["R"][x].name;
      count++;
    }
  }
  x = x - numRares;
  if (x < (pack["C"].length) - 1){
    for (let i = 0; x < (x2 && numCommons) ; x++) {
      packs[count] = pack["C"][x].name;
      count++;
    }
  }

  while (count < 5){
    for (let i = 0; i < numCommons; i++) {
        packs[count] = pack["C"][i].name;
        count++;
    }
    for (let i = 0; i < numUncommons; i++) {
        packs[count] = pack["UC"][i].name;
        count++;
    }
    for (let i = 0; i < numRares; i++) {
        packs[count] = pack["R"][i].name;
        count++;
    }
    for (let i = 0; i < numSuperRares; i++) {
        packs[count] = pack["SR"][i].name;
        count++;
    }
  }


  document.getElementById("cardOne").innerHTML = "<img src="+String(cards[packs[0]] )+">";
  document.getElementById("cardTwo").innerHTML = "<img src="+String(cards[packs[1]] )+">";
  document.getElementById("cardThree").innerHTML = "<img src="+String(cards[packs[2]] )+">";
  document.getElementById("cardFour").innerHTML = "<img src="+String(cards[packs[3]] )+">";
  document.getElementById("cardFive").innerHTML = "<img src="+String(cards[packs[4]] )+">";
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
            <button onClick={sayHello}>Open Cards</button>
            <div className="col-md">
            <button onClick={displayCard}>Display Cards</button>
            <h2>            
            <h1 id="cardOne">no test</h1>
            <h1 id="cardTwo">no test</h1>
            <h1 id="cardThree">no test</h1>
            <h1 id="cardFour">no test</h1>
            <h1 id="cardFive">no test</h1>
            </h2>

        </div>


      </header>
    </div>
  );
}

export default App;