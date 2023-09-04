import { Link } from "react-router-dom";
import React from "react";

const ReadMe = () => {
  return (
    <div className="readme-container">
      <Link to="/" className="back-link">{"Go back to home page"}</Link>
      <div className="readme-content">
        <h1>Social Network README</h1>
        <p>
          <strong>Social Network Name:</strong> Bet-A
        </p>
        <p>
          <strong>Additional Pages Added:</strong> Contact Us, Bets of the Week
        </p>
        <p>
          <strong>Additional Features Added:</strong> Enabling suffix search, Deleting posts
        </p>
        <p>
          <strong>Challenges Faced:</strong> Cookies and protected routes, Handling multiple requests
        </p>
        <p>
          <strong>Partners Information:<br></br>
          </strong> Jeremy Zanna (ID: 330544529)<br></br>
          Alon Silberstein (ID: 207439753)<br></br><br></br>
          Tasks: We did everything together
        </p>
        <p>
          <strong>Server Routes:</strong>
        </p>
        <ul>
          <li>/admin</li>
          <li>/register</li>
          <li>/login</li>
          <li>/feed/:id</li>
          <li>/feed/liked</li>
          <li>/feed/delete/:postid</li>
          <li>/feed/newpost</li>
          <li>/friends</li>
          <li>/friends/display/:id</li>
          <li>/friends/follow</li>
          <li>/logout</li>
          <li>/features</li>
          <li>/updatefeatures</li>
          <li>/pages</li>
          <li>/updatepages</li>
        </ul>
      </div>
    </div>
  );
};

export default ReadMe;
