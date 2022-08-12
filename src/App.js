import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Home from './Components/Home/Home';
import Login from "./Components/Login/Login";
import Search from "./Components/Search/Search";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import ComingSoon from "./Components/ComingSoon/ComingSoon";
import HeaderNavbar from "./Components/HeaderNavbar/HeaderNavbar";
import UserProfile from "./Components/UserProfile/UserProfile";
import { useState } from 'react';
import firebase from "firebase/app";
import { useEffect } from "react";

export const UserContext = React.createContext();

function App() {
  const [currentUser, setCurrentUser] = useState([]);
  const [displayNameDidUpdate, setDisplayNameDidUpdate] = useState(false);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user)
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  useEffect(()=> {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.displayName) {
        setCurrentUser(user)
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  },[displayNameDidUpdate])

  return (
    <UserContext.Provider value={[currentUser, setCurrentUser]}>
      <Router>
        <HeaderNavbar></HeaderNavbar>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login displayNameStatus ={[displayNameDidUpdate, setDisplayNameDidUpdate]}></Login>
          </Route>
          <Route path="/profile">
            <UserProfile></UserProfile>
          </Route>
          <PrivateRoute path="/search/:category">
            <Search></Search>
          </PrivateRoute>
          <Route path="*">
            <ComingSoon></ComingSoon>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
