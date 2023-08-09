import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = {
  client: "http://localhost:3000",
  server: "http://localhost:3001",
};

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get(`/api`)
      .then((response) => setData(response.data[0].message))
      .catch((error) => console.error(error));
  }, []);

  const doPost = () => {
    axios
      .post(`${baseUrl.server}/api`, {
        name: "Ilan Balouka",
        password: "22222",
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
        <button onClick={doPost}>Click to post new user</button>
      </header>
    </div>
  );
}

export default App;
