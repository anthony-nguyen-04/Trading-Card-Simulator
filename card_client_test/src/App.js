import logo from './logo.svg';
import './App.css';

var x = "no test";
var pack = [];

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
      "id" : "troymiller"
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


  document.getElementById("cardOne").innerHTML = packs[0];
  document.getElementById("cardTwo").innerHTML = packs[1];
  document.getElementById("cardThree").innerHTML = packs[2];
  document.getElementById("cardFour").innerHTML = packs[3];
  document.getElementById("cardFive").innerHTML = packs[4];

}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
            <button onClick={sayHello}>Default</button>
            <div className="col-md">
            <button onClick={displayCard}>Second button</button>
            <h1 id="cardOne">no test</h1>
            <h1 id="cardTwo">no test</h1>
            <h1 id="cardThree">no test</h1>
            <h1 id="cardFour">no test</h1>
            <h1 id="cardFive">no test</h1>
        </div>


      </header>
    </div>
  );
}

export default App;