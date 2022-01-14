import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import UserContext from "../auth/UserContext";

import {
  AppBar,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Toolbar,
  Container,
  Link as MULink,
  SwipeableDrawer,
  List,
  ListItem,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";

//mobile nav bar with drawer
export default function MobileMenu({ logout }) {
  const { currentUser } = useContext(UserContext);
  const [state, setState] = useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      <IconButton
        size="large"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={toggleDrawer("right", true)}
        // color="secondary"
        className="hamburgerMenu"
      >
        <i className="fas fa-bars"></i>
      </IconButton>

      <SwipeableDrawer
        anchor={"right"}
        variant="temporary"
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        <Accordion elevation={0}>
          <AccordionSummary>
            <Typography variant="button"> Decades </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MULink
              underline="none"
              color="inherit"
              component={Link}
              to="/decade/1"
            >
              <ListItem onClick={toggleDrawer("right", false)}>1960s</ListItem>
            </MULink>
            <MULink
              underline="none"
              color="inherit"
              component={NavLink}
              to="/decade/2"
            >
              <ListItem onClick={toggleDrawer("right", false)}>1970s</ListItem>
            </MULink>
            <MULink
              underline="none"
              color="inherit"
              component={NavLink}
              to="/decade/3"
            >
              <ListItem onClick={toggleDrawer("right", false)}>1980s</ListItem>
            </MULink>
            <MULink
              underline="none"
              color="inherit"
              component={NavLink}
              to="/decade/4"
            >
              <ListItem onClick={toggleDrawer("right", false)}>1990s</ListItem>
            </MULink>
            <MULink
              underline="none"
              color="inherit"
              component={NavLink}
              to="/decade/5"
            >
              <ListItem onClick={toggleDrawer("right", false)}>2000s</ListItem>
            </MULink>
            {/* </List> */}
          </AccordionDetails>
        </Accordion>

        {currentUser ? (
          <ListItem onClick={toggleDrawer("right", false)}>
            <MULink
              underline="none"
              color="inherit"
              component={NavLink}
              to="/post/new"
            >
              <Typography variant="button">New Post</Typography>
            </MULink>
          </ListItem>
        ) : (
          ""
        )}
        {currentUser ? (
          <>
            <ListItem onClick={toggleDrawer("right", false)}>
              <MULink
                underline="none"
                color="inherit"
                component={Link}
                to="/profile"
              >
                <Typography variant="button">Profile</Typography>
              </MULink>
            </ListItem>
            <ListItem onClick={toggleDrawer("right", false)}>
              <MULink
                underline="none"
                color="inherit"
                to="/"
                component={Link}
                onClick={logout}
              >
                <Typography variant="button">
                  Logout {currentUser.username}
                </Typography>
              </MULink>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem onClick={toggleDrawer("right", false)}>
              <MULink
                component={Link}
                underline="none"
                color="inherit"
                sx={{ mr: 3 }}
                to="/login"
              >
                <Typography variant="button">Login</Typography>
              </MULink>
            </ListItem>
            <ListItem onClick={toggleDrawer("right", false)}>
              <MULink
                underline="none"
                color="inherit"
                component={Link}
                to="/signup"
              >
                <Typography variant="button">Signup</Typography>
              </MULink>
            </ListItem>
          </>
        )}
      </SwipeableDrawer>
    </>
  );
}
