import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./navigation/Routes";
import NostalgiaApi from "./api";
import Navigation from "./navigation/Navigation";
import UserContext from "./auth/UserContext";
import useLocalStorage from "./hooks/useLocalStorage";
import jwt from "jsonwebtoken";
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage("token");

  useEffect(() => {
    async function currentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          NostalgiaApi.token = token;
          let currentUser = await NostalgiaApi.getUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    currentUser();
  }, [token]);

  async function signUp(data) {
    let token = await NostalgiaApi.signup(data);
    setToken(token);
  }

  async function login(data) {
    let token = await NostalgiaApi.login(data);
    setToken(token);
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
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="App">
          <Navigation logout={logout} />
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
