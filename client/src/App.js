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
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ContactUs from "./ContactUs";
import BetOfTheWeek from "./BetOfTheWeek";

function App() {
  const [userInfo, setUserInfo] = useState(null);

  const handleCallbackUser = (childData, remember) => {
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
      if (item.user && item.user.id) {
        axios
          .post("/logout", { id: item.user.id })
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      }
      return null;
    }
    return item.user;
  };

  useEffect(() => {
    const initialUserInfo = getItemWithExpiry();
    if (initialUserInfo) {
      setUserInfo(initialUserInfo);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home userInfo={userInfo} />}></Route>
            <Route path="/register" element={<Register userInfo={userInfo} />} />
            <Route path="/login" element={<Login parentCallback={handleCallbackUser} userInfo={userInfo} />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/betoftheweek" element={<BetOfTheWeek />} />
            <Route path="/admin" element={<Admin userInfo={userInfo} />} />
            <Route path="/readme.html" element={<ReadMe />}></Route>
            <Route path="/dashboard" element={<Dashboard userInfo={userInfo} />}>
              <Route index element={<Navigate to="feed" />} />
              <Route path="feed" element={<Feed userInfo={userInfo} />} />
              <Route path="friends" element={<Friends userInfo={userInfo} />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
