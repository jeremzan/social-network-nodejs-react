import GradientBtn from "./GradientBtn";
const Home = () => {
  return (
    <div className="home">
      <h1 className="welcome">
        Welcome to BET-A. Click one of the buttons to start your journey !
      </h1>
      <div className="buttons">
        <GradientBtn name={"Login"} path={"/login"}></GradientBtn>
        <GradientBtn name={"Register"} path={"/register"}></GradientBtn>
      </div>
    </div>
  );
};

export default Home;
