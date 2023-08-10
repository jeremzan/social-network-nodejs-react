import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GradientBtn = ({ name, path }) => {
  const naviguate = useNavigate();
  const handleClick = () => {
    naviguate(path);
  };
  return (
    <Box m={1} display="flex" justifyContent="center" alignItems="justify-end">
      <Button
        onClick={handleClick}
        variant="contained"
        sx={{
          background: "linear-gradient(45deg, #FF3366 30%, #FF9933 90%)",
          borderRadius: "3px",
          border: 0,
          color: "white",
          height: "48px",
          width: "200px",
          padding: "0 30px",
          boxShadow: "0 3px 5px 2px rgba(255, 51, 102, 0.3)",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 6px 10px 4px rgba(255, 51, 102, 0.3)",
          },
        }}
      >
        {name}
      </Button>
    </Box>
  );
};
export default GradientBtn;
