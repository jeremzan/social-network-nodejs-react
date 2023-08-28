import GradientBtn from "./GradientBtn";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo.png";

const Home = ({ userInfo }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      if (userInfo.email === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [userInfo, navigate]);

  if (userInfo) {
    return null;
  } else {
    return (
      <div
        className="home"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{
            width: "500px",
            maxWidth: "100%", // Ensure the logo scales down for smaller screens
            marginBottom: "20px",
          }}
        />
        <div className="buttons" style={{ width: "100%", textAlign: "center" }}>
          <GradientBtn name={"Login"} path={"/login"}></GradientBtn>
          <GradientBtn
            name={"Register"}
            path={"/register"}
            style={{ marginTop: "10px" }}
          ></GradientBtn>
          <GradientBtn
            name={"README"}
            path={"/readme.html"}
            style={{ marginTop: "10px" }}
          ></GradientBtn>
        </div>
      </div>
    );
  }
};

export default Home;
