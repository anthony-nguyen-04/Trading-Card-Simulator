import logo from './logo.svg';
import './App.css';


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
      "id" : "troymiller"
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

            <button onClick={openPack}>OPEN PACK</button>

            <div className="col-md">
                <h1 id="cardOne">N/A</h1>
                <h1 id="cardTwo">N/A</h1>
                <h1 id="cardThree">N/A</h1>
                <h1 id="cardFour">N/A</h1>
                <h1 id="cardFive">N/A</h1>
            </div>


      </header>
    </div>
  );
}

export default App;