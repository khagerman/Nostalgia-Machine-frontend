import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import UserContext from "../auth/UserContext";
import logogif from "../imgs/logogif.gif";

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

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <MenuItem onClick={handleClose}>
            <MULink
              underline="none"
              color="inherit"
              component={Link}
              to="/decade/1"
            >
              1960s
            </MULink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <MULink
              underline="none"
              color="inherit"
              component={NavLink}
              to="/decade/2"
            >
              1970s
            </MULink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <MULink
              underline="none"
              color="inherit"
              component={NavLink}
              to="/decade/3"
            >
              1980s
            </MULink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <MULink
              underline="none"
              color="inherit"
              component={NavLink}
              to="/decade/4"
            >
              1990s
            </MULink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <MULink
              underline="none"
              color="inherit"
              component={NavLink}
              to="/decade/5"
            >
              2000s
            </MULink>
          </MenuItem>
        </Menu>
      </>
    );
  }
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
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <div sx={{ display: "flex" }}>
              <Link to="/">
                <img src={logogif}></img>
              </Link>
            </div>
            {/* <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              NOSTALGIA MACHINE
            </Typography> */}
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
