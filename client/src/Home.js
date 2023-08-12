import GradientBtn from "./GradientBtn";
const Home = () => {
  return (
    <div className="home" style={{ position: "relative", height: "100vh" }}>
      <div
        className="buttons"
        style={{
          position: "absolute",
          bottom: "25%",
          width: "100%",
          textAlign: "center",
        }}
      >
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
      <h1
        className="welcome"
        style={{
          fontFamily: "georgia",
          fontSize: "32px", // Increased font size
          color: "white", // Changed font color to white
          textAlign: "center",
          position: "absolute",
          top: "40%", // Adjusted top position
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        Welcome to BET-A. Click to continue...
      </h1>
    </div>
  );
};

export default Home;
