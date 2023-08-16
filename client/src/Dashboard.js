import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = ({ userInfo }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (userInfo.email !== "admin") {
      navigate("/dashboard/feed"); // When wnating to access /dahboard/friends redirect to dashboard/feed
    } else if (userInfo.email === "admin") {
      navigate("/admin");
    }
  }, [userInfo, navigate]);

  if (!userInfo) {
    return null;
  }
  return (
    <div className="dashboard">
      <Navbar />
      <p>{JSON.stringify(userInfo)}</p>
      <div className="content">
        <Outlet userInfo={userInfo} />
      </div>
    </div>
  );
};

export default Dashboard;

// return <Link to="/login">{"Go back to Login Cabron !"} </Link>;
