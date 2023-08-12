import Navbar from "./Navbar";
import Feed from "./Feed";

const UserInterface = () => {
  let flag = false;
  return (
    <div className="user-interface">
      <Navbar />
      <div className="content">
        {flag && <Feed />}
        {!flag && <p>Not the feed</p>}
      </div>
    </div>
  );
};

export default UserInterface;
