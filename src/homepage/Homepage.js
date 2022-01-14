import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import UserContext from "../auth/UserContext";
import TextLoop from "react-text-loop";
import { Typography, Box } from "@mui/material";
import { toast } from "react-toastify";
import useLocalStorage from "../hooks/useLocalStorage";
/**
   *Home page
   changes based on wether user is logged in 
   */

//
function Homepage() {
  const { currentUser } = useContext(UserContext);
  const [visited, setVisited] = useLocalStorage("visited");
  function welcomeMessage() {
    if (!visited) {
      toast(
        <div>
          <br></br>
          <h5>Welcome to the Nostalgia Machine!</h5> <br></br>{" "}
          <p>
            Pick a decade from the <span>DECADE</span> dropdown to get started
            down memory lane.
          </p>
          <p>
            Click <span>LOGIN</span> or <span>SIGNUP</span> to add your own
            nostalgia, save a memory, or comment on an individual memory/post!{" "}
          </p>
          <br></br>
          Hope you have a <span>nostalgic</span> time!
        </div>,
        {
          toastId: 1238884,
          // className: "toast",
          position: "top-center",
          toastClassName: "dark-toast",
          autoClose: 20000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      setVisited(true);
    }
  }
  return (
    <div className="HomePage">
      <div className="Toastify">{welcomeMessage()}</div>
      <div className="Greeting containers">
        <Box sx={{ m: 2 }}>
          {" "}
          <h1 className="display-3">Feel the power of nostalgia</h1>
        </Box>
        <div className="blockquote">
          {currentUser ? `Hey, ${currentUser.username}!` : ""}
        </div>
        <div className="lead">
          Welcome to the{" "}
          <TextLoop>
            <Box sx={{ color: "secondary.main" }}>groovy </Box>
            <Box sx={{ color: "secondary.main" }}>fly </Box>
            <Box sx={{ color: "secondary.main" }}>far out</Box>
            <Box sx={{ color: "secondary.main" }}>chillin’</Box>
            <Box sx={{ color: "secondary.main" }}>sweet</Box>
          </TextLoop>{" "}
          Nostalgia Machine. A place to share and enjoy memories from times of
          yore.
        </div>
      </div>
    </div>
  );
}
export default Homepage;
