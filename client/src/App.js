import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import ReadMe from "./ReadMe";

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
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path={"/readme.html"} element={<ReadMe />}></Route>
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
