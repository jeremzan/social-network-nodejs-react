import { Link } from "react-router-dom";
const ReadMe = () => {
  return (
    <div className="readme">
      <Link to="/">{"Go back to home page."}</Link>
      <h1>This will be the README !</h1>
    </div>
  );
};

export default ReadMe;
