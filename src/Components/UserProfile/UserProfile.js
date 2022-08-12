import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import './UserProfile.css'
import firebase from "firebase/app";
import Loading from '../Loading/Loading';
import { useLocation } from 'react-router-dom';

const UserProfile = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext)

    const location = useLocation();
    const { from } = location.state || { from: {pathname: "/"} };


    const handleLogOut = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            window.location.replace("/login")
        }).catch((error) => {
            // An error happened.
          });
    }
    return (
        <div className="userProfile">
            <h1>{currentUser.displayName}</h1> <br />
            <img src={currentUser.photoURL} alt="" /> <br />
            <button onClick={() => handleLogOut()}>Log Out</button>
        </div>
    );
};

export default UserProfile;