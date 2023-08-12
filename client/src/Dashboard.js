import Navbar from "./Navbar";
import Feed from "./Feed";

const Dashboard = () => {
  let flag = false;
  return (
    <div className="dashboard">
      <Navbar />
      <div className="content">
        {!flag && <Feed />}
        {flag && <p>Not the feed</p>}
      </div>
    </div>
  );
};

export default Dashboard;
