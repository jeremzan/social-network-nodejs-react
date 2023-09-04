import GradientBtn from "./GradientBtn";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo.png";
import axios from "axios";

const Home = ({ userInfo }) => {
  const navigate = useNavigate();
  const [additionalPages, setAdditionalPages] = useState({
    contactPage: true,
    betsPage: true
  })

  useEffect(() => {
    axios
      .get("/pages")
      .then((response) => {
        setAdditionalPages(response.data)
      })
      .catch((error) => console.error(error));

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
            maxWidth: "100%",
            marginBottom: "20px",
          }}
        />
        <div className="buttons" style={{ width: "100%", textAlign: "center" }}>
          <GradientBtn name={"Login"} path={"/login"} />
          <GradientBtn
            name={"Register"}
            path={"/register"}
            style={{ marginTop: "10px" }}
          />
          <GradientBtn
            name={"README"}
            path={"/readme.html"}
            style={{ marginTop: "10px" }}
          />
          {additionalPages.contactPage && <GradientBtn
            name={"Contact us"}
            path={"/contactus"}
            style={{ marginTop: "10px" }}
          />}
          {additionalPages.betsPage && <GradientBtn
            name={"Bet of the week"}
            path={"/betoftheweek"}
            style={{ marginTop: "10px" }}
          />}
        </div>
      </div>
    );
  }
};

export default Home;
