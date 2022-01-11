import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./navigation/Routes";
import NostalgiaApi from "./api";
import Navigation from "./navigation/Navigation";
import UserContext from "./auth/UserContext";
import useLocalStorage from "./hooks/useLocalStorage";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "@mui/material";
import LoadingSpinner from "./common/LoadingSpinner";
import "./common/ScrollToTop";
import ScrollToTop from "./common/ScrollToTop";
/** Nostalgia Machine application.
 *
 *
 * - currentUser: user obj from API. This is how to check 
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *

 */
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [likedIds, setLikedIds] = useState(new Set([]));
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage("token");
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    //check if current user saved, if so decode token
    async function currentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          NostalgiaApi.token = token;
          let currentUser = await NostalgiaApi.getUser(username);
          setCurrentUser(currentUser);
          if (currentUser) {
            getLoggedInUserLikesIds(currentUser.username);
          }
        } catch (err) {
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    currentUser();
  }, [token]);

  //get list of user likes everytime new like added to array of liked post ids
  useEffect(() => {
    async function getUserLikes(username) {
      try {
        setLikes(await NostalgiaApi.userLikes(username));
      } catch (errors) {
        console.error("likes failed", errors);
        return { success: false, errors };
      }
    }

    if (currentUser) {
      getUserLikes(currentUser.username);
    }
  }, [likedIds]);

  // create set of liked post ids so hearts can match wether a user has liked them or not
  async function getLoggedInUserLikesIds(username) {
    let likes = await NostalgiaApi.userLikes(username);
    let liked = [];
    for (let obj of likes.favorites) {
      liked.push(obj.id);
    }
    setLikedIds(new Set(liked));
  }
  // log out user, remove current user info, token, and clear data from local storage
  async function logout() {
    setCurrentUser(null);
    setToken(null);
    localStorage.clear();
  }
  //signup user and set token
  async function signup(signupData) {
    try {
      let token = await NostalgiaApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  //login user and set token
  async function login(loginData) {
    try {
      let token = await NostalgiaApi.login(loginData);
      setToken(token);

      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }
  //unlike a post logic
  async function unlike(id) {
    try {
      await NostalgiaApi.unlike(currentUser.username, id);
    } catch (e) {
      console.error(e);
    }
  }
  //like a post logic
  async function like(id) {
    try {
      await NostalgiaApi.like(currentUser.username, id);
    } catch (e) {
      console.error(e);
    }
  }
  //notify user they must login if they try to like a post and login
  const notify = () =>
    toast.warn("Please login to like or save posts!", {
      position: toast.POSITION.TOP_CENTER,
    });
  //when user clicks on the heart, notify user to login or check if it is already liked
  function handleLike(id) {
    if (!currentUser) {
      notify();
    } else if (likedIds.has(id)) {
      //if already liked, remove from api
      unlike(id);
      //remove from set of liked ids
      setLikedIds(new Set(Array.from(likedIds).filter((l) => l !== id)));
    } else {
      //otherwise add like to the api and reset likedids with new data
      like(id);
      setLikedIds(new Set([...likedIds, id]));
    }
  }
  if (!infoLoaded) return <LoadingSpinner />;
  return (
    <BrowserRouter>
      <ScrollToTop>
        <UserContext.Provider
          value={{
            currentUser,
            setCurrentUser,
            likedIds,
            setLikedIds,
            likes,
            setLikes,
            like,
            unlike,
            handleLike,
          }}
        >
          <Container className="App">
            {/* container for toast alerts */}
            <ToastContainer autoClose={4000} hideProgressBar={true} />
            <Navigation logout={logout} />
            <Routes login={login} signup={signup} />
          </Container>
        </UserContext.Provider>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
