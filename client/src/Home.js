import GradientBtn from "./GradientBtn";
const Home = () => {
  return (
    <div className="home">
      <h1 className="Welcome">
        Welcome to BET-A. Click one of the buttons to start your journey !
      </h1>
      <div className="buttons">
        <GradientBtn name={"Sign In"} path={"/signIn"}></GradientBtn>
        <GradientBtn name={"Sign Up"} path={"/signUp"}></GradientBtn>
      </div>
    </div>
  );
};

export default Home;
