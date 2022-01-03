import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import UserContext from "../auth/UserContext";
import TextLoop from "react-text-loop";
import { Typography, Box } from "@mui/material";
/**
   *Home page
   changes based on wether user is logged in 
   */
function Homepage() {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="HomePage">
      <div className="Greeting">
        <Box sx={{ m: 2 }}>
          {" "}
          <Typography variant="h3">Travel the past...</Typography>
        </Box>
        <Typography variant="body1">
          {currentUser ? `Hey, ${currentUser.username}!` : ""}
        </Typography>
        <Typography variant="body1">
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
        </Typography>
      </div>
    </div>
  );
}
export default Homepage;
