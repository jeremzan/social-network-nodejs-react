import GradientBtn from "./GradientBtn";
const Home = () => {
  return (
    <div className="home">
      <h1 className="welcome">Welcome to BET-A. Click to continue...</h1>
      <div className="buttons">
        <GradientBtn name={"Login"} path={"/login"}></GradientBtn>
        <GradientBtn name={"Register"} path={"/register"}></GradientBtn>
        <GradientBtn name={"README"} path={"/readme.html"}></GradientBtn>
      </div>
    </div>
  );
};

export default Home;
