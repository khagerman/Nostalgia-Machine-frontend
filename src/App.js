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
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [likedIds, setLikedIds] = useState(new Set([]));
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage("token");
  const [likes, setLikes] = useState([]);
  useEffect(() => {
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

  async function signup(data) {
    let token = await NostalgiaApi.signup(data);
    setToken(token);
  }

  async function login(data) {
    let token = await NostalgiaApi.login(data);
    setToken(token);
  }

  useEffect(() => {
    async function getUserLikes(username) {
      try {
        setLikes(await NostalgiaApi.userLikes(username));
      } catch (errors) {
        console.error("likes failed", errors);
        return { success: false, errors };
      }
    }
    console.log("this ran!");
    if (currentUser) {
      getUserLikes(currentUser.username);
    }
  }, [likedIds]);

  async function getLoggedInUserLikesIds(username) {
    let likes = await NostalgiaApi.userLikes(username);
    let liked = [];
    for (let obj of likes.favorites) {
      liked.push(obj.id);
    }
    setLikedIds(new Set(liked));
  }
  async function logout() {
    setCurrentUser(null);
    setToken(null);
    localStorage.clear();
  }
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
  async function unlike(id) {
    try {
      await NostalgiaApi.unlike(currentUser.username, id);
    } catch (e) {
      console.log(e);
    }
  }

  async function like(id) {
    try {
      await NostalgiaApi.like(currentUser.username, id);
    } catch (e) {
      console.log(e);
    }
  }
  const notify = () =>
    toast.warn("Please login to like or save posts!", {
      position: toast.POSITION.TOP_CENTER,
    });
  function handleLike(id) {
    console.log("this is working");
    if (!currentUser) {
      notify();
    } else if (likedIds.has(id)) {
      unlike(id);
      setLikedIds(new Set(Array.from(likedIds).filter((l) => l !== id)));
    } else {
      like(id);
      setLikedIds(new Set([...likedIds, id]));
    }
  }
  return (
    <BrowserRouter>
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
        <div className="App">
          <Navigation logout={logout} />
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
