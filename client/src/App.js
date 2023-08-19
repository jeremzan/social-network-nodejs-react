import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import ReadMe from "./ReadMe";
import Admin from "./Admin";
import Dashboard from "./Dashboard";
import Feed from "./Feed";
import Friends from "./Friends";
import { useEffect, useState } from "react";

function App() {
  const handleCallback = (childData, remember) => {
    const now = new Date();
    let ttl = 0;
    remember ? (ttl = 864000000) : (ttl = 10000);
    setUserInfo(childData);
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ user: childData, expiry: now.getTime() + ttl })
    );
  };

  const getItemWithExpiry = () => {
    const itemStr = localStorage.getItem("userInfo");

    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      localStorage.removeItem("userInfo");
      return null;
    }
    return item.user;
  };

  const initialUserInfo = getItemWithExpiry();
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home userInfo={userInfo} />}></Route>
            <Route
              path="/register"
              element={<Register userInfo={userInfo} />}
            ></Route>
            <Route
              path="/login"
              element={
                <Login parentCallback={handleCallback} userInfo={userInfo} />
              }
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
              <Route index element={<Navigate to="feed" />} />
              <Route path="feed" element={<Feed userInfo={userInfo} />}></Route>
              <Route
                path="friends"
                element={<Friends userInfo={userInfo} />}
              ></Route>
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
