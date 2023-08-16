import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import ReadMe from "./ReadMe";
import Admin from "./Admin";
import Dashboard from "./Dashboard";
import Feed from "./Feed";
import Friends from "./Friends";
import { useState } from "react";

function App() {
  const handleCallback = (childData) => {
    setUserInfo(childData);
    localStorage.setItem("userInfo", JSON.stringify(childData));
  };

  // When initializing the state in App component
  const initialUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [userInfo, setUserInfo] = useState(initialUserInfo);

  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route
              path="/login"
              element={<Login parentCallback={handleCallback} />}
            ></Route>
            <Route
              path="/admin"
              element={<Admin userInfo={userInfo} />}
            ></Route>
            <Route path="/readme.html" element={<ReadMe />}></Route>

            <Route
              path="/dashboard"
              element={<Dashboard userInfo={userInfo} />}
            >
              <Route path="/dashboard/feed" element={<Feed />}></Route>
              <Route path="/dashboard/friends" element={<Friends />}></Route>
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

// const handleLogout = () => {
//   setUserInfo(null);
//   localStorage.removeItem('userInfo');
//   // Any other logout-related logic
// };
