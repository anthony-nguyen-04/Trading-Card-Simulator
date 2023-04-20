import logo from './logo.svg';
import './App.css';

function sayHello() {
  fetch("http://localhost:5000/user", {
    method: "GET",
    args: {
      "pack" : 1
    },
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      //"Access-Control-Allow-Origin" : "http://localhost",
      "pack": "default",
      "id": "troymiller"
    }
  });
}

function openPack() {
  fetch("http://localhost:5000/user/open", {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      //"Access-Control-Allow-Origin" : "http://localhost",
      "pack": "default",
      "id": "troymiller"
    }
  });
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

        <button onClick={openPack}>Open Pack!!!!!</button>
      </header>
    </div>
  );
}

export default App;
