import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./Home";
import SignUp from "./SignUp";
import SignIn from "./SigIn";

// const baseUrl = {
//   client: "http://localhost:3000",
//   server: "http://localhost:3001",
// };

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signUp" element={<SignUp />}></Route>
            <Route path="/signIn" element={<SignIn />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

// const [data, setData] = useState(null);
// useEffect(() => {
//   axios
//     .get(`/api`)
//     .then((response) => setData(response.data[0].message))
//     .catch((error) => console.error(error));
// }, []);

// const doPost = () => {
//   axios
//     .post(`/api`, {
//       name: "Hanry Safdie",
//       password: "66666",
//     })
//     .then((response) => console.log(response.data))
//     .catch((error) => console.log(error));
// };
