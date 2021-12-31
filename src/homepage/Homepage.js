import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import "./Homepage.css";
import UserContext from "../auth/UserContext";
import TextLoop from "react-text-loop";
/**
   *Home page
   changes based on wether user is logged in 
   */
function Homepage() {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="Homepage">
      <h1>Nostalgia Machine</h1>

      <div>
        {currentUser ? `Hey, ${currentUser.username}!` : ""}
        <br></br>
        Welcome to the{" "}
        <TextLoop>
          <span color="secondary">groovy </span>
          <span color="primary">fly</span>
          <span>far out</span>
          <span>chillin’</span>
          <span>sweet</span>
        </TextLoop>{" "}
        Nostalgia Machine. A place to share and enjoy memories from times of
        yore.
      </div>
    </div>
  );
}
export default Homepage;
