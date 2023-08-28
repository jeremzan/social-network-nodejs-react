import LogOutButton from "./LogOutButton";
import Button from "@mui/material/Button";
import Logo from "./Logo.png"
import { useNavigate } from "react-router-dom";

const Navbar = ({ userID }) => {
  const navigate = useNavigate();
  const handleFeedClick = () => {
    navigate("feed")
  }
  const handleFriendsClick = () => {
    navigate("friends")
  }
  return (
    <div
      className="navbar"
      style={{
        display: "flex",
        justifyContent: "space-between", // Align items to the left and right edges
        alignItems: "center", // Vertically center items
        padding: "10px", // Add some padding for spacing
      }}
    >
      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          onClick={handleFeedClick}
          name="feed"
          variant="contained"
          sx={{ mt: 3, mb: 2, borderRadius: "20px" }}
        >
          Feed
        </Button>
        <Button
          onClick={handleFriendsClick}
          name="friends"
          variant="contained"
          sx={{ mt: 3, mb: 2, borderRadius: "20px" }}
        >
          Friends
        </Button>
      </div>

      <img
        src={Logo}
        alt="Logo"
        style={{ width: "200px", marginBottom: "20px", marginLeft: "-74px" }}
      />

      <LogOutButton userID={userID} />
    </div>
  );
};

export default Navbar;
