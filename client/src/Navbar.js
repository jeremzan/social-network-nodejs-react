import LogOutButton from "./LogOutButton";
import Button from "@mui/material/Button";
import Logo from "./Logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = ({ userID }) => {
  const navigate = useNavigate();

  const handleFeedClick = () => {
    navigate("feed");
  };

  const handleFriendsClick = () => {
    navigate("friends");
  };

  return (
    <div
      className="navbar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <div style={{ display: "flex", gap: "10px" }}>
        <div>
          <Button
            onClick={handleFeedClick}
            name="feed"
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: "20px" }}
          >
            Feed
          </Button>
        </div>
        <div>
          <Button
            onClick={handleFriendsClick}
            name="friends"
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: "20px" }}
          >
            Friends
          </Button>
        </div>
      </div>

      <img
        src={Logo}
        alt="Logo"
        style={{ width: "200px", marginBottom: "20px", marginRight: "80px" }}
      />

      <div>
        <LogOutButton userID={userID} />
      </div>
    </div>
  );
};

export default Navbar;
