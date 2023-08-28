import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = ({ userInfo }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (userInfo.email === "admin") {
      navigate("/admin");
    }
  }, [userInfo, navigate]);

  if (!userInfo || userInfo.email === "admin") {
    return null;
  }
  return (
    <div className="dashboard">
      <Navbar userID={userInfo.id} />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

// return <Link to="/login">{"Go back to Login Cabron !"} </Link>;
// } else if (userInfo.email !== "admin") {
//   navigate("/dashboard"); // When wnating to access /dahboard/friends redirect to dashboard/feed
// }
