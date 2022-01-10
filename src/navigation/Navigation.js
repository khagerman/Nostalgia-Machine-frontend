import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import UserContext from "../auth/UserContext";

import {
  AppBar,
  Button,
  Menu,
  MenuItem,
  Box,
  Typography,
  Toolbar,
  Container,
  Link as MULink,
} from "@mui/material";
/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */
//todo add mobile view
function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //dacade choice dropdown
  function decadeDropDown() {
    return (
      <>
        <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          color="inherit"
        >
          Decades
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MULink
            underline="none"
            color="inherit"
            component={Link}
            to="/decade/1"
          >
            <MenuItem onClick={handleClose}>1960s</MenuItem>
          </MULink>
          <MULink
            underline="none"
            color="inherit"
            component={NavLink}
            to="/decade/2"
          >
            <MenuItem onClick={handleClose}>1970s</MenuItem>
          </MULink>
          <MULink
            underline="none"
            color="inherit"
            component={NavLink}
            to="/decade/3"
          >
            <MenuItem onClick={handleClose}>1980s</MenuItem>
          </MULink>

          <MULink
            underline="none"
            color="inherit"
            component={NavLink}
            to="/decade/4"
          >
            <MenuItem onClick={handleClose}>1990s</MenuItem>
          </MULink>
          <MULink
            underline="none"
            color="inherit"
            component={NavLink}
            to="/decade/5"
          >
            <MenuItem onClick={handleClose}>2000s</MenuItem>
          </MULink>
        </Menu>
      </>
    );
  }
  //navigation when user logged in
  function loggedInNav() {
    return (
      <>
        <MULink underline="none" color="inherit" component={Link} to="/profile">
          <Button color="inherit">Profile</Button>
        </MULink>
        <MULink
          underline="none"
          color="inherit"
          to="/"
          component={Link}
          onClick={logout}
        >
          <Button color="inherit">Logout {currentUser.username}</Button>
        </MULink>
      </>
    );
  }
  //navigation when user logged out
  function loggedOutNav() {
    return (
      <>
        <MULink
          component={Link}
          underline="none"
          color="inherit"
          sx={{ mr: 3 }}
          to="/login"
        >
          <Button color="inherit">Login</Button>
        </MULink>

        <MULink underline="none" color="inherit" component={Link} to="/signup">
          <Button color="inherit">Signup</Button>
        </MULink>
      </>
    );
  }

  return (
    <nav>
      <AppBar elevation={0} position="static" className="AppBar">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <Box sx={{ display: "flex" }}>
              
            </Box> */}
            <Link to="/">
              <div className="logo m-2">
                <b>
                  n<span>os</span>tal<span>gi</span>a
                </b>
                &nbsp;
                <b>
                  m<span>a</span>ch<span>i</span>ne
                </b>
              </div>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"></Typography>
                </MenuItem>
              </Menu>
            </Box>
            {/* <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              Nostalgia Machine
            </Typography> */}
            <Box sx={{ flexGrow: 1, display: { md: "flex" } }}>
              {decadeDropDown()}

              {currentUser ? (
                <>
                  <MULink
                    underline="none"
                    color="inherit"
                    component={NavLink}
                    to="/post/new"
                  >
                    <Button color="inherit">New Post</Button>
                  </MULink>
                </>
              ) : (
                ""
              )}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {currentUser ? loggedInNav() : loggedOutNav()}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </nav>
  );
}

export default Navigation;
