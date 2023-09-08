import Button from "@mui/material/Button";
import axios from "axios";

const LogOutButton = ({ userID }) => {
  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    setTimeout(() => {
      axios
        .post("/logout", { id: userID })
        .then((response) => console.log(response))
        .catch((error) => console.error(error));
    }, 200);
    window.location.reload();
  };

  return (
    <Button
      onClick={handleLogOut}
      variant="contained"
      sx={{ mt: 3, mb: 2, borderRadius: "20px" }}
    >
      Logout
    </Button>
  );
};

export default LogOutButton;
